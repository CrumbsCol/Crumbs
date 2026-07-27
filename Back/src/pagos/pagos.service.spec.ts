import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  salidaMiembro: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  pago: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  gasto: {
    findMany: jest.fn(),
  },
};

describe('PagosService', () => {
  let service: PagosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagosService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PagosService>(PagosService);
    jest.clearAllMocks();
  });

  describe('getBalances', () => {
    it('balance simple equitativo: A adelanta 1000, 2 participantes → A +500, B -500', async () => {
      const salidaId = 'salida-1';
      const userId = 'user-a';

      // miembro actual
      mockPrisma.salidaMiembro.findFirst.mockResolvedValue({
        id: 'miembro-a',
        salidaId,
        userId: 'user-a',
      });

      // todos los miembros
      mockPrisma.salidaMiembro.findMany.mockResolvedValue([
        {
          id: 'miembro-a',
          salidaId,
          userId: 'user-a',
          esFantasma: false,
          rol: 'admin',
          user: { nombre: 'Ana', apellido: 'A', userName: 'ana', email: 'ana@test.com', avatarUrl: null },
        },
        {
          id: 'miembro-b',
          salidaId,
          userId: 'user-b',
          esFantasma: false,
          rol: 'miembro',
          user: { nombre: 'Bruno', apellido: 'B', userName: 'bruno', email: 'bruno@test.com', avatarUrl: null },
        },
      ]);

      // un gasto de 1000 pagado por miembro-a, equitativo, 2 participantes
      mockPrisma.gasto.findMany.mockResolvedValue([
        {
          id: 'gasto-1',
          salidaId,
          monto: 1000,
          pagadoPorId: 'miembro-a',
          metodoDivision: 'equitativo',
          participantes: [
            { salidaMiembroId: 'miembro-a', esInvitado: false, montoManual: null },
            { salidaMiembroId: 'miembro-b', esInvitado: false, montoManual: null },
          ],
        },
      ]);

      // sin pagos confirmados
      mockPrisma.pago.findMany.mockResolvedValue([]);

      const result = await service.getBalances(salidaId, userId);

      const balA = result.find((r) => r.miembro.id === 'miembro-a');
      const balB = result.find((r) => r.miembro.id === 'miembro-b');

      expect(balA!.totalAdelantado).toBe(1000);
      expect(balA!.totalCorrespondiente).toBe(500);
      expect(balA!.balanceNeto).toBe(500);

      expect(balB!.totalAdelantado).toBe(0);
      expect(balB!.totalCorrespondiente).toBe(500);
      expect(balB!.balanceNeto).toBe(-500);
    });

    it('balance con invitados: gasto 900, 3 participantes, 1 invitado → 2 pagan 450 c/u', async () => {
      const salidaId = 'salida-1';
      const userId = 'user-a';

      mockPrisma.salidaMiembro.findFirst.mockResolvedValue({
        id: 'miembro-a',
        salidaId,
        userId: 'user-a',
      });

      mockPrisma.salidaMiembro.findMany.mockResolvedValue([
        {
          id: 'miembro-a',
          salidaId,
          userId: 'user-a',
          esFantasma: false,
          rol: 'admin',
          user: { nombre: 'Ana', apellido: 'A', userName: 'ana', email: 'ana@test.com', avatarUrl: null },
        },
        {
          id: 'miembro-b',
          salidaId,
          userId: 'user-b',
          esFantasma: false,
          rol: 'miembro',
          user: { nombre: 'Bruno', apellido: 'B', userName: 'bruno', email: 'bruno@test.com', avatarUrl: null },
        },
        {
          id: 'miembro-c',
          salidaId,
          userId: 'user-c',
          esFantasma: true,
          nombreFantasma: 'Invitado',
          rol: 'miembro',
          user: null,
        },
      ]);

      // gasto 900, 3 participantes, miembro-c es invitado
      mockPrisma.gasto.findMany.mockResolvedValue([
        {
          id: 'gasto-1',
          salidaId,
          monto: 900,
          pagadoPorId: 'miembro-a',
          metodoDivision: 'equitativo',
          participantes: [
            { salidaMiembroId: 'miembro-a', esInvitado: false, montoManual: null },
            { salidaMiembroId: 'miembro-b', esInvitado: false, montoManual: null },
            { salidaMiembroId: 'miembro-c', esInvitado: true, montoManual: null },
          ],
        },
      ]);

      mockPrisma.pago.findMany.mockResolvedValue([]);

      const result = await service.getBalances(salidaId, userId);

      const balA = result.find((r) => r.miembro.id === 'miembro-a');
      const balB = result.find((r) => r.miembro.id === 'miembro-b');
      const balC = result.find((r) => r.miembro.id === 'miembro-c');

      // Solo 2 no-invitados pagan: 900 / 2 = 450
      expect(balA!.totalAdelantado).toBe(900);
      expect(balA!.totalCorrespondiente).toBe(450);
      expect(balA!.balanceNeto).toBe(450);

      expect(balB!.totalAdelantado).toBe(0);
      expect(balB!.totalCorrespondiente).toBe(450);
      expect(balB!.balanceNeto).toBe(-450);

      // Invitado no tiene correspondiente
      expect(balC!.totalCorrespondiente).toBe(0);
      expect(balC!.balanceNeto).toBe(0);
    });

    it('balance con pagos confirmados: pago de 500 ajusta los balances', async () => {
      const salidaId = 'salida-1';
      const userId = 'user-a';

      mockPrisma.salidaMiembro.findFirst.mockResolvedValue({
        id: 'miembro-a',
        salidaId,
        userId: 'user-a',
      });

      mockPrisma.salidaMiembro.findMany.mockResolvedValue([
        {
          id: 'miembro-a',
          salidaId,
          userId: 'user-a',
          esFantasma: false,
          rol: 'admin',
          user: { nombre: 'Ana', apellido: 'A', userName: 'ana', email: 'ana@test.com', avatarUrl: null },
        },
        {
          id: 'miembro-b',
          salidaId,
          userId: 'user-b',
          esFantasma: false,
          rol: 'miembro',
          user: { nombre: 'Bruno', apellido: 'B', userName: 'bruno', email: 'bruno@test.com', avatarUrl: null },
        },
      ]);

      // gasto de 1000 pagado por A, 2 participantes
      mockPrisma.gasto.findMany.mockResolvedValue([
        {
          id: 'gasto-1',
          salidaId,
          monto: 1000,
          pagadoPorId: 'miembro-a',
          metodoDivision: 'equitativo',
          participantes: [
            { salidaMiembroId: 'miembro-a', esInvitado: false, montoManual: null },
            { salidaMiembroId: 'miembro-b', esInvitado: false, montoManual: null },
          ],
        },
      ]);

      // pago confirmado: B pagó 500 a A
      mockPrisma.pago.findMany.mockResolvedValue([
        {
          id: 'pago-1',
          salidaId,
          deudorId: 'miembro-b',
          pagadorId: 'miembro-a',
          monto: 500,
          estado: 'pagado',
        },
      ]);

      const result = await service.getBalances(salidaId, userId);

      const balA = result.find((r) => r.miembro.id === 'miembro-a');
      const balB = result.find((r) => r.miembro.id === 'miembro-b');

      // A: adelantado 1000 - 500(pago recibido) = 500, correspondiente 500 → balance 0
      expect(balA!.totalAdelantado).toBe(500);
      expect(balA!.totalCorrespondiente).toBe(500);
      expect(balA!.balanceNeto).toBe(0);

      // B: adelantado 0, correspondiente 500 - 500(pago hecho) = 0 → balance 0
      expect(balB!.totalAdelantado).toBe(0);
      expect(balB!.totalCorrespondiente).toBe(0);
      expect(balB!.balanceNeto).toBe(0);
    });
  });

  describe('confirm', () => {
    it('solo el acreedor puede confirmar: otro usuario lanza ForbiddenException', async () => {
      const salidaId = 'salida-1';
      const pagoId = 'pago-1';
      const userId = 'user-impostor';

      mockPrisma.pago.findUnique.mockResolvedValue({
        id: pagoId,
        salidaId,
        deudorId: 'miembro-b',
        pagadorId: 'miembro-a',
        monto: 500,
        estado: 'pendiente',
      });

      // El acreedor (pagadorId) es miembro-a con userId 'user-a'
      mockPrisma.salidaMiembro.findUnique.mockResolvedValue({
        id: 'miembro-a',
        salidaId,
        userId: 'user-a',
      });

      await expect(service.confirm(salidaId, pagoId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('pago no encontrado lanza NotFoundException', async () => {
      const salidaId = 'salida-1';
      const pagoId = 'pago-inexistente';
      const userId = 'user-a';

      mockPrisma.pago.findUnique.mockResolvedValue(null);

      await expect(service.confirm(salidaId, pagoId, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
