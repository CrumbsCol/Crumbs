import { Test } from '@nestjs/testing';
import { GastosService } from './gastos.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('GastosService', () => {
  let service: GastosService;
  let prisma: any;

  beforeEach(async () => {
    const mockPrisma = {
      salidaMiembro: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
      gasto: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      gastoParticipante: {
        createMany: jest.fn(),
      },
      $transaction: jest.fn((fn) => fn(mockPrisma)),
    };

    const module = await Test.createTestingModule({
      providers: [
        GastosService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(GastosService);
    prisma = module.get(PrismaService);
  });

  // Helper para pasar las validaciones base
  function setupValidMocks(participanteIds: string[]) {
    // userId es miembro
    prisma.salidaMiembro.findFirst.mockResolvedValue({ id: 'miembro-1' });
    // Todos los participantes pertenecen a la salida
    prisma.salidaMiembro.findMany.mockResolvedValue(
      participanteIds.map((id) => ({ id })),
    );
    // Gasto creado
    prisma.gasto.create.mockResolvedValue({ id: 'gasto-1' });
    prisma.gastoParticipante.createMany.mockResolvedValue({ count: participanteIds.length });
    prisma.gasto.findUnique.mockResolvedValue({ id: 'gasto-1', participantes: [] });
  }

  describe('División equitativa', () => {
    it('debe crear gasto con división equitativa: 1000 / 2 = 500 cada uno', async () => {
      const participanteIds = ['miembro-1', 'miembro-2'];
      setupValidMocks(participanteIds);

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'equitativo' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false },
          { salidaMiembroId: 'miembro-2', esInvitado: false },
        ],
      };

      await service.create('salida-1', dto, 'user-1');

      expect(prisma.gastoParticipante.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({ salidaMiembroId: 'miembro-1', montoManual: 500 }),
          expect.objectContaining({ salidaMiembroId: 'miembro-2', montoManual: 500 }),
        ]),
      });
    });

    it('debe crear gasto con división equitativa con invitados: 1000 entre 3, 1 invitado → solo 2 pagan 500 c/u', async () => {
      const participanteIds = ['miembro-1', 'miembro-2', 'miembro-3'];
      setupValidMocks(participanteIds);

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'equitativo' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false },
          { salidaMiembroId: 'miembro-2', esInvitado: false },
          { salidaMiembroId: 'miembro-3', esInvitado: true },
        ],
      };

      await service.create('salida-1', dto, 'user-1');

      expect(prisma.gastoParticipante.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({ salidaMiembroId: 'miembro-1', montoManual: 500 }),
          expect.objectContaining({ salidaMiembroId: 'miembro-2', montoManual: 500 }),
          expect.objectContaining({ salidaMiembroId: 'miembro-3', montoManual: 0, esInvitado: true }),
        ]),
      });
    });

    it('debe aplicar redondeo: 100 / 3 = 33+33+34 (residuo al pagador)', async () => {
      const participanteIds = ['miembro-1', 'miembro-2', 'miembro-3'];
      setupValidMocks(participanteIds);

      const dto = {
        nombre: 'Cena',
        monto: 100,
        fecha: '2026-01-15',
        metodoDivision: 'equitativo' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false },
          { salidaMiembroId: 'miembro-2', esInvitado: false },
          { salidaMiembroId: 'miembro-3', esInvitado: false },
        ],
      };

      await service.create('salida-1', dto, 'user-1');

      expect(prisma.gastoParticipante.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({ salidaMiembroId: 'miembro-1', montoManual: 34 }),
          expect.objectContaining({ salidaMiembroId: 'miembro-2', montoManual: 33 }),
          expect.objectContaining({ salidaMiembroId: 'miembro-3', montoManual: 33 }),
        ]),
      });
    });
  });

  describe('División manual', () => {
    it('debe crear gasto con división manual válida: montos suman exacto al total', async () => {
      const participanteIds = ['miembro-1', 'miembro-2'];
      setupValidMocks(participanteIds);

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'manual' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false, montoManual: 600 },
          { salidaMiembroId: 'miembro-2', esInvitado: false, montoManual: 400 },
        ],
      };

      await service.create('salida-1', dto, 'user-1');

      expect(prisma.gastoParticipante.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({ salidaMiembroId: 'miembro-1', montoManual: 600 }),
          expect.objectContaining({ salidaMiembroId: 'miembro-2', montoManual: 400 }),
        ]),
      });
    });

    it('debe lanzar BadRequestException si los montos manuales no suman el total', async () => {
      const participanteIds = ['miembro-1', 'miembro-2'];
      setupValidMocks(participanteIds);

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'manual' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false, montoManual: 300 },
          { salidaMiembroId: 'miembro-2', esInvitado: false, montoManual: 400 },
        ],
      };

      await expect(service.create('salida-1', dto, 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('Validaciones de negocio', () => {
    it('debe lanzar BadRequestException si todos los participantes son invitados', async () => {
      const participanteIds = ['miembro-1', 'miembro-2'];
      setupValidMocks(participanteIds);

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'equitativo' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: true },
          { salidaMiembroId: 'miembro-2', esInvitado: true },
        ],
      };

      await expect(service.create('salida-1', dto, 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('debe lanzar BadRequestException si el pagador no pertenece a la salida', async () => {
      // userId es miembro (primera llamada)
      prisma.salidaMiembro.findFirst
        .mockResolvedValueOnce({ id: 'miembro-1' }) // currentMember OK
        .mockResolvedValueOnce(null); // pagador NOT found

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'equitativo' as const,
        pagadoPorMiembroId: 'miembro-inexistente',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false },
        ],
      };

      await expect(service.create('salida-1', dto, 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('debe lanzar BadRequestException si un participante no pertenece a la salida', async () => {
      // userId es miembro y pagador es válido
      prisma.salidaMiembro.findFirst.mockResolvedValue({ id: 'miembro-1' });
      // Pero findMany retorna menos participantes de los enviados
      prisma.salidaMiembro.findMany.mockResolvedValue([{ id: 'miembro-1' }]);

      const dto = {
        nombre: 'Cena',
        monto: 1000,
        fecha: '2026-01-15',
        metodoDivision: 'equitativo' as const,
        pagadoPorMiembroId: 'miembro-1',
        participantes: [
          { salidaMiembroId: 'miembro-1', esInvitado: false },
          { salidaMiembroId: 'miembro-fake', esInvitado: false },
        ],
      };

      await expect(service.create('salida-1', dto, 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
