import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { transformMiembro } from '../shared/transform-miembro.helper';

@Injectable()
export class PagosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un pago con estado pendiente dentro de una salida.
   */
  async create(salidaId: string, dto: CreatePagoDto, userId: string) {
    // a. Verificar que userId es miembro de la salida
    const currentMember = await this.prisma.salidaMiembro.findFirst({
      where: { salidaId, userId },
    });

    if (!currentMember) {
      throw new ForbiddenException('No eres miembro de esta salida');
    }

    // b. Verificar que deudorId y pagadorId pertenecen a la salida
    const deudor = await this.prisma.salidaMiembro.findFirst({
      where: { id: dto.deudorId, salidaId },
    });

    if (!deudor) {
      throw new BadRequestException('El deudor no pertenece a esta salida');
    }

    // Validar que solo el deudor puede registrar su propio pago (excepto fantasmas)
    if (deudor.userId && deudor.userId !== userId) {
      throw new ForbiddenException('Solo el deudor puede registrar su propio pago');
    }

    const pagador = await this.prisma.salidaMiembro.findFirst({
      where: { id: dto.pagadorId, salidaId },
    });

    if (!pagador) {
      throw new BadRequestException('El pagador no pertenece a esta salida');
    }

    // c. Crear pago con estado 'pendiente'
    return this.prisma.pago.create({
      data: {
        salidaId,
        deudorId: dto.deudorId,
        pagadorId: dto.pagadorId,
        gastoId: dto.gastoId ?? null,
        monto: dto.monto,
        estado: 'pendiente',
        fecha: new Date(),
      },
    });
  }

  /**
   * Confirma un pago (solo el acreedor puede hacerlo).
   */
  async confirm(salidaId: string, pagoId: string, userId: string) {
    // a. Buscar el pago
    const pago = await this.prisma.pago.findUnique({
      where: { id: pagoId },
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    // b. Verificar que el pago pertenece a la salida
    if (pago.salidaId !== salidaId) {
      throw new NotFoundException('Pago no encontrado en esta salida');
    }

    // c. Buscar el SalidaMiembro del pagadorId (acreedor)
    const acreedorMiembro = await this.prisma.salidaMiembro.findUnique({
      where: { id: pago.pagadorId },
    });

    // d. Verificar que el usuario autenticado es el acreedor
    if (!acreedorMiembro) {
      throw new ForbiddenException('Solo el acreedor puede confirmar el pago');
    }

    // Si el acreedor es un usuario registrado, solo él puede confirmar
    if (acreedorMiembro.userId) {
      if (acreedorMiembro.userId !== userId) {
        throw new ForbiddenException('Solo el acreedor puede confirmar el pago');
      }
    } else {
      // El acreedor es un fantasma — solo el creador de la salida puede confirmar
      const creador = await this.prisma.salidaMiembro.findFirst({
        where: { salidaId, userId, rol: 'creador' },
      });
      if (!creador) {
        throw new ForbiddenException('Solo el creador de la salida puede confirmar pagos de fantasmas');
      }
    }

    // e. Actualizar estado a 'pagado'
    return this.prisma.pago.update({
      where: { id: pagoId },
      data: { estado: 'pagado' },
    });
  }

  /**
   * Calcula los balances netos por miembro de una salida.
   */
  async getBalances(salidaId: string, userId: string) {
    // a. Verificar que userId es miembro de la salida
    const currentMember = await this.prisma.salidaMiembro.findFirst({
      where: { salidaId, userId },
    });

    if (!currentMember) {
      throw new ForbiddenException('No eres miembro de esta salida');
    }

    // b. Obtener todos los miembros de la salida con User join
    const miembros = await this.prisma.salidaMiembro.findMany({
      where: { salidaId },
      include: { user: true },
    });

    // c. Obtener todos los gastos con sus participantes
    const gastos = await this.prisma.gasto.findMany({
      where: { salidaId },
      include: {
        participantes: true,
      },
    });

    // d. Obtener todos los pagos confirmados
    const pagosConfirmados = await this.prisma.pago.findMany({
      where: { salidaId, estado: 'pagado' },
    });

    // e. Calcular balances
    // Inicializar mapas de adelantado y correspondiente
    const totalAdelantado: Record<string, number> = {};
    const totalCorrespondiente: Record<string, number> = {};

    for (const m of miembros) {
      totalAdelantado[m.id] = 0;
      totalCorrespondiente[m.id] = 0;
    }

    // Para cada gasto
    for (const gasto of gastos) {
      // El pagador adelantó el monto total
      totalAdelantado[gasto.pagadoPorId] += gasto.monto;

      // Calcular cuotas de participantes no-invitados
      const noInvitados = gasto.participantes.filter((p) => !p.esInvitado);

      if (gasto.metodoDivision === 'equitativo') {
        const numNoInvitados = noInvitados.length;
        if (numNoInvitados > 0) {
          const cuota = Math.floor(gasto.monto / numNoInvitados);
          const residuo = gasto.monto - cuota * numNoInvitados;

          for (const p of noInvitados) {
            // El residuo se asigna al pagador del gasto
            const esElPagador = p.salidaMiembroId === gasto.pagadoPorId;
            totalCorrespondiente[p.salidaMiembroId] += esElPagador
              ? cuota + residuo
              : cuota;
          }
        }
      } else {
        // Manual: cuota = montoManual del GastoParticipante
        for (const p of noInvitados) {
          totalCorrespondiente[p.salidaMiembroId] += p.montoManual ?? 0;
        }
      }
    }

    // f. Ajustar con pagos confirmados
    for (const pago of pagosConfirmados) {
      // Al deudor se le suma (reduce su deuda / incrementa su balance)
      totalCorrespondiente[pago.deudorId] -= pago.monto;
      // Al acreedor se le resta (reduce lo que le deben / decrementa su balance)
      totalAdelantado[pago.pagadorId] -= pago.monto;
    }

    // g. Construir respuesta
    return miembros.map((m) => ({
      miembro: transformMiembro(m),
      totalAdelantado: totalAdelantado[m.id] ?? 0,
      totalCorrespondiente: totalCorrespondiente[m.id] ?? 0,
      balanceNeto: (totalAdelantado[m.id] ?? 0) - (totalCorrespondiente[m.id] ?? 0),
    }));
  }

}
