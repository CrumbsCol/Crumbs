import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGastoDto } from './dto/create-gasto.dto';

@Injectable()
export class GastosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un gasto dentro de una salida, con validaciones de negocio
   * y creación atómica de Gasto + GastoParticipantes.
   */
  async create(salidaId: string, dto: CreateGastoDto, userId: string) {
    // a. Verificar que el userId es miembro de la salida
    const currentMember = await this.prisma.salidaMiembro.findFirst({
      where: { salidaId, userId },
    });

    if (!currentMember) {
      throw new ForbiddenException(
        'No eres miembro de esta salida',
      );
    }

    // b. Verificar que pagadoPorMiembroId pertenece a la salida
    const pagador = await this.prisma.salidaMiembro.findFirst({
      where: { id: dto.pagadoPorMiembroId, salidaId },
    });

    if (!pagador) {
      throw new BadRequestException(
        'El pagador no pertenece a esta salida',
      );
    }

    // c. Verificar que todos los participantes pertenecen a la salida
    const participanteIds = dto.participantes.map((p) => p.salidaMiembroId);
    const miembrosValidos = await this.prisma.salidaMiembro.findMany({
      where: { id: { in: participanteIds }, salidaId },
      select: { id: true },
    });

    if (miembrosValidos.length !== participanteIds.length) {
      throw new BadRequestException(
        'Uno o más participantes no pertenecen a esta salida',
      );
    }

    // d. Verificar que hay al menos 1 participante no-invitado
    const noInvitados = dto.participantes.filter((p) => !p.esInvitado);
    if (noInvitados.length === 0) {
      throw new BadRequestException(
        'Debe haber al menos un participante que no sea invitado',
      );
    }

    // e. Si metodoDivision == 'manual': verificar suma de montos manuales
    if (dto.metodoDivision === 'manual') {
      const sumaManual = noInvitados.reduce(
        (acc, p) => acc + (p.montoManual ?? 0),
        0,
      );
      if (sumaManual !== dto.monto) {
        throw new BadRequestException(
          'La suma de los montos manuales debe ser igual al monto total',
        );
      }
    }

    // f. Crear Gasto + GastoParticipantes en una transacción
    return this.prisma.$transaction(async (tx) => {
      const gasto = await tx.gasto.create({
        data: {
          salidaId,
          pagadoPorId: dto.pagadoPorMiembroId,
          nombre: dto.nombre,
          descripcion: dto.descripcion,
          monto: dto.monto,
          fecha: new Date(dto.fecha),
          metodoDivision: dto.metodoDivision,
        },
      });

      // Calcular montos según método de división
      const participantesData = dto.participantes.map((p) => {
        let montoManual: number | null = null;

        if (p.esInvitado) {
          // g. Invitados siempre montoManual = 0
          montoManual = 0;
        } else if (dto.metodoDivision === 'manual') {
          montoManual = p.montoManual ?? 0;
        } else {
          // Equitativo: calcular cuota
          const cuota = Math.floor(dto.monto / noInvitados.length);
          const residuo = dto.monto - cuota * noInvitados.length;
          // El residuo va al pagador
          const esPagador = p.salidaMiembroId === dto.pagadoPorMiembroId;
          montoManual = esPagador ? cuota + residuo : cuota;
        }

        return {
          gastoId: gasto.id,
          salidaMiembroId: p.salidaMiembroId,
          esInvitado: p.esInvitado,
          montoManual,
        };
      });

      await tx.gastoParticipante.createMany({
        data: participantesData,
      });

      // h. Retornar el gasto creado con sus participantes
      return tx.gasto.findUnique({
        where: { id: gasto.id },
        include: {
          participantes: {
            include: {
              salidaMiembro: { include: { user: true } },
            },
          },
          pagadoPor: { include: { user: true } },
        },
      });
    });
  }
}
