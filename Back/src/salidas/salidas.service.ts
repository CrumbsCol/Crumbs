import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalidaDto } from './dto/create-salida.dto';
import { AddIntegranteDto } from './dto/add-integrante.dto';
import { transformMiembro } from '../shared/transform-miembro.helper';

@Injectable()
export class SalidasService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista todas las salidas donde el usuario es miembro.
   * Incluye conteo de miembros y gastos.
   */
  async findAllByUser(userId: string) {
    return this.prisma.salida.findMany({
      where: {
        miembros: {
          some: { userId },
        },
      },
      include: {
        _count: {
          select: {
            miembros: true,
            gastos: true,
          },
        },
      },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  /**
   * Crea una salida nueva y agrega al creador como miembro.
   */
  async create(userId: string, dto: CreateSalidaDto) {
    const codigoInvitacion = await this.generateCode();

    return this.prisma.$transaction(async (tx) => {
      const salida = await tx.salida.create({
        data: {
          titulo: dto.titulo,
          descripcion: dto.descripcion,
          codigoInvitacion,
        },
      });

      await tx.salidaMiembro.create({
        data: {
          salidaId: salida.id,
          userId,
          rol: 'creador',
          esFantasma: false,
        },
      });

      return salida;
    });
  }

  /**
   * Detalle completo de una salida: miembros, gastos y pagos.
   */
  async findOne(salidaId: string, userId: string) {
    // Verificar que el usuario es miembro de la salida
    const isMember = await this.prisma.salidaMiembro.findFirst({
      where: { salidaId, userId },
    });
    if (!isMember) {
      throw new ForbiddenException('No eres miembro de esta salida');
    }

    const salida = await this.prisma.salida.findUnique({
      where: { id: salidaId },
      include: {
        miembros: {
          include: { user: true },
        },
        gastos: {
          include: {
            pagadoPor: { include: { user: true } },
            participantes: {
              include: {
                salidaMiembro: { include: { user: true } },
              },
            },
          },
          orderBy: { fecha: 'desc' },
        },
        pagos: {
          orderBy: { fecha: 'desc' },
        },
      },
    });

    if (!salida) {
      throw new NotFoundException('Salida no encontrada');
    }

    // Transformar miembros a formato plano
    const miembros = salida.miembros.map((m) => transformMiembro(m));

    // Transformar gastos con pagadoPor y participantes
    const gastos = salida.gastos.map((g) => ({
      id: g.id,
      nombre: g.nombre,
      descripcion: g.descripcion,
      monto: g.monto,
      fecha: g.fecha,
      metodoDivision: g.metodoDivision,
      pagadoPor: transformMiembro(g.pagadoPor),
      miembrosParticipantes: g.participantes.map((p) =>
        transformMiembro(p.salidaMiembro),
      ),
      participantes: g.participantes.map((p) => ({
        miembro: transformMiembro(p.salidaMiembro),
        esInvitado: p.esInvitado,
        montoManual: p.montoManual,
      })),
    }));

    return {
      id: salida.id,
      titulo: salida.titulo,
      descripcion: salida.descripcion,
      codigoInvitacion: salida.codigoInvitacion,
      fechaCreacion: salida.fechaCreacion,
      miembros,
      gastos,
      pagos: salida.pagos,
    };
  }

  /**
   * Unirse a una salida por código de invitación.
   */
  async join(userId: string, codigoInvitacion: string) {
    const salida = await this.prisma.salida.findUnique({
      where: { codigoInvitacion },
    });

    if (!salida) {
      throw new NotFoundException('Código de invitación inválido');
    }

    // Verificar que el usuario no sea ya miembro
    const existingMember = await this.prisma.salidaMiembro.findUnique({
      where: {
        salidaId_userId: {
          salidaId: salida.id,
          userId,
        },
      },
    });

    if (existingMember) {
      throw new ConflictException('Ya eres miembro de esta salida');
    }

    await this.prisma.salidaMiembro.create({
      data: {
        salidaId: salida.id,
        userId,
        rol: 'integrante',
        esFantasma: false,
      },
    });

    return salida;
  }

  /**
   * Agregar un integrante (registrado o fantasma) a una salida.
   */
  async addIntegrante(salidaId: string, dto: AddIntegranteDto) {
    if (!dto.userName && !dto.nombreFantasma) {
      throw new BadRequestException(
        'Debe proporcionar userName o nombreFantasma',
      );
    }

    // Si es un usuario registrado
    if (dto.userName) {
      const user = await this.prisma.user.findUnique({
        where: { userName: dto.userName },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Verificar duplicado
      const existingMember = await this.prisma.salidaMiembro.findUnique({
        where: {
          salidaId_userId: {
            salidaId,
            userId: user.id,
          },
        },
      });

      if (existingMember) {
        throw new ConflictException('El usuario ya es miembro de esta salida');
      }

      return this.prisma.salidaMiembro.create({
        data: {
          salidaId,
          userId: user.id,
          rol: 'integrante',
          esFantasma: false,
        },
      });
    }

    // Si es un fantasma
    return this.prisma.salidaMiembro.create({
      data: {
        salidaId,
        nombreFantasma: dto.nombreFantasma,
        rol: 'integrante',
        esFantasma: true,
      },
    });
  }

  /**
   * Obtiene resumen de integrantes fantasma con balances y pagos pendientes.
   * Solo accesible por el creador de la salida.
   */
  async getFantasmas(salidaId: string, userId: string) {
    // Verificar que el usuario es el creador
    const creador = await this.prisma.salidaMiembro.findFirst({
      where: { salidaId, userId, rol: 'creador' },
    });
    if (!creador) {
      throw new ForbiddenException('Solo el creador puede ver la gestión de fantasmas');
    }

    // Obtener todos los miembros fantasma de la salida
    const fantasmas = await this.prisma.salidaMiembro.findMany({
      where: { salidaId, esFantasma: true },
    });

    if (fantasmas.length === 0) return [];

    // Obtener gastos de la salida con participantes
    const gastos = await this.prisma.gasto.findMany({
      where: { salidaId },
      include: { participantes: true },
    });

    // Obtener pagos pendientes donde el acreedor (pagadorId) es un fantasma
    const pagosPendientes = await this.prisma.pago.findMany({
      where: {
        salidaId,
        estado: 'pendiente',
        pagadorId: { in: fantasmas.map((f) => f.id) },
      },
      include: {
        deudor: { include: { user: true } },
      },
    });

    // Obtener pagos confirmados relacionados con fantasmas (como acreedor o deudor)
    const pagosConfirmados = await this.prisma.pago.findMany({
      where: {
        salidaId,
        estado: 'pagado',
        OR: [
          { pagadorId: { in: fantasmas.map((f) => f.id) } },
          { deudorId: { in: fantasmas.map((f) => f.id) } },
        ],
      },
    });

    // Calcular balance por cada fantasma
    return fantasmas.map((fantasma) => {
      let totalAdelantado = 0;
      let totalCorrespondiente = 0;

      for (const gasto of gastos) {
        // Si el fantasma pagó este gasto
        if (gasto.pagadoPorId === fantasma.id) {
          totalAdelantado += gasto.monto;
        }

        // Cuota del fantasma en este gasto
        const participacion = gasto.participantes.find(
          (p) => p.salidaMiembroId === fantasma.id && !p.esInvitado,
        );
        if (participacion) {
          if (gasto.metodoDivision === 'manual') {
            totalCorrespondiente += participacion.montoManual ?? 0;
          } else {
            const noInvitados = gasto.participantes.filter((p) => !p.esInvitado);
            const cuota = Math.floor(gasto.monto / noInvitados.length);
            const residuo = gasto.monto - cuota * noInvitados.length;
            const esPagador = fantasma.id === gasto.pagadoPorId;
            totalCorrespondiente += esPagador ? cuota + residuo : cuota;
          }
        }
      }

      // Ajustar por pagos confirmados
      for (const pago of pagosConfirmados) {
        if (pago.pagadorId === fantasma.id) {
          // Alguien le pagó al fantasma → reduce lo que le deben
          totalAdelantado -= pago.monto;
        }
        if (pago.deudorId === fantasma.id) {
          // El fantasma pagó su deuda → reduce lo que debe
          totalCorrespondiente -= pago.monto;
        }
      }

      // Pagos pendientes hacia este fantasma
      const pagosDeEsteFantasma = pagosPendientes
        .filter((p) => p.pagadorId === fantasma.id)
        .map((p) => ({
          id: p.id,
          monto: p.monto,
          deudorId: p.deudorId,
          deudorNombre: p.deudor.user
            ? `${p.deudor.user.nombre} ${p.deudor.user.apellido}`
            : p.deudor.nombreFantasma || 'Desconocido',
          fecha: p.fecha,
        }));

      return {
        miembro: {
          id: fantasma.id,
          nombre: fantasma.nombreFantasma || '',
          esFantasma: true,
          rol: fantasma.rol,
        },
        balance: {
          totalAdelantado,
          totalCorrespondiente,
          balanceNeto: totalAdelantado - totalCorrespondiente,
        },
        pagosPendientes: pagosDeEsteFantasma,
      };
    });
  }

  /**
   * Genera un código alfanumérico de 6 caracteres uppercase único.
   */
  private async generateCode(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code: string;
    let exists = true;

    while (exists) {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const existing = await this.prisma.salida.findUnique({
        where: { codigoInvitacion: code },
      });
      exists = !!existing;
    }

    return code!;
  }

}
