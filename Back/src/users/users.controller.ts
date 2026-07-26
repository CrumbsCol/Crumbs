/**
 * Controlador de usuario actual.
 * Expone el endpoint GET /me para obtener el perfil autenticado.
 */
import {
  Controller,
  Get,
  Patch,
  Req,
  Body,
  UseGuards,
  Query,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  /** GET /api/me — Retorna el perfil del usuario autenticado */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    const { userId } = req.user as { userId: string };
    return this.authService.getProfile(userId);
  }

  /** PATCH /api/me — Actualiza el perfil del usuario autenticado */
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Req() req: any, @Body() body: any) {
    const userId = req.user.userId;

    // Campos permitidos para actualizar
    const allowedFields = ['nombre', 'apellido', 'userName', 'fechaNacimiento', 'avatarUrl', 'tipoMetodoPago', 'metodoPago'];
    const data: any = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    // Si se quiere cambiar userName, verificar unicidad
    if (data.userName) {
      const existing = await this.prisma.user.findFirst({
        where: { userName: data.userName, NOT: { id: userId } },
      });
      if (existing) {
        throw new ConflictException('El userName ya está en uso');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    const { password, ...result } = user;
    return result;
  }

  /** GET /api/balance-detallado — Balance detallado del usuario autenticado */
  @UseGuards(JwtAuthGuard)
  @Get('balance-detallado')
  async getBalanceDetallado(@Req() req: any) {
    const userId = req.user.userId;

    // Obtener todas las salidas del usuario
    const miembros = await this.prisma.salidaMiembro.findMany({
      where: { userId },
      include: {
        salida: {
          include: {
            miembros: { include: { user: true } },
            gastos: { include: { participantes: true } },
            pagos: true,
          },
        },
      },
    });

    const deudas: any[] = []; // Lo que yo debo a otros
    const creditos: any[] = []; // Lo que otros me deben

    for (const miembro of miembros) {
      const salida = miembro.salida;
      const miMiembroId = miembro.id;

      // Mapa de balance por persona en esta salida
      const balancePorPersona: Record<string, number> = {};

      for (const m of salida.miembros) {
        balancePorPersona[m.id] = 0;
      }

      // Calcular cuotas por gasto
      for (const gasto of salida.gastos) {
        const noInvitados = gasto.participantes.filter((p) => !p.esInvitado);
        if (noInvitados.length === 0) continue;

        for (const p of noInvitados) {
          let cuota: number;
          if (gasto.metodoDivision === 'manual') {
            cuota = p.montoManual ?? 0;
          } else {
            const base = Math.floor(gasto.monto / noInvitados.length);
            const residuo = gasto.monto - base * noInvitados.length;
            const esPagador = p.salidaMiembroId === gasto.pagadoPorId;
            cuota = esPagador ? base + residuo : base;
          }

          // Si yo participo en un gasto que pagó otro, le debo esa cuota
          if (p.salidaMiembroId === miMiembroId && gasto.pagadoPorId !== miMiembroId) {
            balancePorPersona[gasto.pagadoPorId] = (balancePorPersona[gasto.pagadoPorId] ?? 0) - cuota;
          }
          // Si otro participa en un gasto que yo pagué, me debe esa cuota
          if (p.salidaMiembroId !== miMiembroId && gasto.pagadoPorId === miMiembroId) {
            balancePorPersona[p.salidaMiembroId] = (balancePorPersona[p.salidaMiembroId] ?? 0) + cuota;
          }
        }
      }

      // Ajustar con pagos confirmados
      for (const pago of salida.pagos) {
        if (pago.estado !== 'pagado') continue;
        if (pago.deudorId === miMiembroId) {
          // Yo pagué → reduce mi deuda con el acreedor
          balancePorPersona[pago.pagadorId] = (balancePorPersona[pago.pagadorId] ?? 0) + pago.monto;
        }
        if (pago.pagadorId === miMiembroId) {
          // Me pagaron → reduce lo que me deben
          balancePorPersona[pago.deudorId] = (balancePorPersona[pago.deudorId] ?? 0) - pago.monto;
        }
      }

      // Transformar en deudas y créditos
      for (const otroMiembroId of Object.keys(balancePorPersona)) {
        if (otroMiembroId === miMiembroId) continue;
        const balance = balancePorPersona[otroMiembroId];
        if (balance === 0) continue;

        const otroMiembro = salida.miembros.find((m) => m.id === otroMiembroId);
        const nombreOtro = otroMiembro?.user
          ? `${otroMiembro.user.nombre} ${otroMiembro.user.apellido}`
          : otroMiembro?.nombreFantasma || 'Desconocido';

        if (balance > 0) {
          // Me deben
          creditos.push({
            persona: nombreOtro,
            monto: balance,
            salida: salida.titulo,
            salidaId: salida.id,
          });
        } else {
          // Debo
          deudas.push({
            persona: nombreOtro,
            monto: Math.abs(balance),
            salida: salida.titulo,
            salidaId: salida.id,
          });
        }
      }
    }

    const totalMeDeben = creditos.reduce((acc, c) => acc + c.monto, 0);
    const totalDebo = deudas.reduce((acc, d) => acc + d.monto, 0);

    return {
      totalMeDeben,
      totalDebo,
      balanceNeto: totalMeDeben - totalDebo,
      creditos, // detalle de quién me debe
      deudas,   // detalle de a quién debo
    };
  }

  /** GET /api/users/search/frecuentes — Miembros frecuentes (con quienes he compartido salidas) */
  @Get('users/search/frecuentes')
  @UseGuards(JwtAuthGuard)
  async getFrecuentes(@Req() req: any) {
    const userId = req.user.userId;

    // Obtener usuarios con quienes he compartido salidas (excluyéndome)
    const misSalidas = await this.prisma.salidaMiembro.findMany({
      where: { userId },
      select: { salidaId: true },
    });

    const salidaIds = misSalidas.map((m) => m.salidaId);

    if (salidaIds.length === 0) return [];

    // Obtener otros miembros de esas salidas (registrados, no fantasmas, no yo)
    const otrosMiembros = await this.prisma.salidaMiembro.findMany({
      where: {
        salidaId: { in: salidaIds },
        userId: { not: userId },
        esFantasma: false,
      },
      include: { user: true },
      distinct: ['userId'],
    });

    // Transformar y retornar sin password
    return otrosMiembros
      .filter((m) => m.user)
      .map((m) => {
        const { password, ...user } = m.user!;
        return user;
      });
  }

  /** GET /api/users/search?q=... — Busca usuario por userName o email */
  @Get('users/search')
  @UseGuards(JwtAuthGuard)
  async search(@Query('q') query: string) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('El parámetro de búsqueda es requerido');
    }
    // Buscar por userName (case-insensitive) o email exacto
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { userName: { equals: query.trim(), mode: 'insensitive' } },
          { email: query.trim() },
        ],
      },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const { password, ...result } = user;
    return result;
  }
}
