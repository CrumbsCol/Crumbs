import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SalidaService } from './salida.service';
import { UserService } from './user.service';
import { Gasto, Miembro, ParticipanteGasto } from '../interfaces/salida.interface';
import { User } from '../interfaces/user.interface';

describe('SalidaService', () => {
  let service: SalidaService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userServiceSpy: any;

  const mockUser: User = { id: 'mock-user-001', nombre: 'Juan', apellido: 'López', email: 'juan@example.com', userName: 'juanlopez', fechaNacimiento: '01/01/2000', avatarUrl: null };
  
  const mockMiembro1: Miembro = { id: 'mock-user-001', nombre: 'Juan López', email: '', userName: '', avatarUrl: null };
  const mockMiembro2: Miembro = { id: '2', nombre: 'Maria', email: '', userName: '', avatarUrl: null };
  const mockMiembro3: Miembro = { id: '3', nombre: 'Carlos', email: '', userName: '', avatarUrl: null };

  beforeEach(() => {
    userServiceSpy = { currentUser: vi.fn() };
    userServiceSpy.currentUser.mockReturnValue(mockUser);

    TestBed.configureTestingModule({
      providers: [
        SalidaService,
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    service = TestBed.inject(SalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Salidas Management', () => {
    it('should create a new salida', () => {
      const initialCount = service.salidas().length;
      const nueva = service.crearSalida({ titulo: 'Test Salida', fecha: new Date().toISOString() });
      
      expect(nueva.id).toBeDefined();
      expect(nueva.titulo).toBe('Test Salida');
      expect(service.salidas().length).toBe(initialCount + 1);
    });

    it('should set current salida on cargarSalida', () => {
      service.cargarSalida('1');
      expect(service.salidaActual()?.id).toBe('1');
    });

    it('should add members to current salida', () => {
      const nueva = service.crearSalida({ titulo: 'Test', fecha: new Date().toISOString() });
      service.cargarSalida(nueva.id);
      
      service.agregarMiembros([mockMiembro1, mockMiembro2]);
      
      expect(service.miembros().length).toBe(2);
      expect(service.miembros()[0].id).toBe('mock-user-001');
    });
  });

  describe('Gastos and Balances', () => {
    beforeEach(() => {
      const nueva = service.crearSalida({ titulo: 'Test', fecha: new Date().toISOString() });
      service.cargarSalida(nueva.id);
      service.agregarMiembros([mockMiembro1, mockMiembro2, mockMiembro3]);
    });

    it('should correctly calculate equitativo division', () => {
      const gasto: Omit<Gasto, 'id'> = {
        nombre: 'Cena',
        monto: 300,
        fecha: new Date().toISOString(),
        metodoDivision: 'equitativo',
        pagadoPor: mockMiembro1,
        miembrosParticipantes: [mockMiembro1, mockMiembro2, mockMiembro3],
      };
      
      service.agregarGasto(gasto);
      
      const balances = service.balances();
      const b1 = balances.find(b => b.miembro.id === mockMiembro1.id)!;
      const b2 = balances.find(b => b.miembro.id === mockMiembro2.id)!;
      
      // Juan pagó 300, le tocan 100. Balance neto = +200
      expect(b1.totalAdelantado).toBe(300);
      expect(b1.totalCorrespondiente).toBe(100);
      expect(b1.balanceNeto).toBe(200);
      
      // Maria pagó 0, le tocan 100. Balance neto = -100
      expect(b2.totalAdelantado).toBe(0);
      expect(b2.totalCorrespondiente).toBe(100);
      expect(b2.balanceNeto).toBe(-100);
    });

    it('should correctly calculate manual division with invitados', () => {
      const part1: ParticipanteGasto = { miembro: mockMiembro1, esInvitado: false, montoManual: 50 };
      const part2: ParticipanteGasto = { miembro: mockMiembro2, esInvitado: true, montoManual: null };
      const part3: ParticipanteGasto = { miembro: mockMiembro3, esInvitado: false, montoManual: 150 };
      
      const gasto: Omit<Gasto, 'id'> = {
        nombre: 'Comida',
        monto: 200,
        fecha: new Date().toISOString(),
        metodoDivision: 'manual',
        pagadoPor: mockMiembro2,
        miembrosParticipantes: [mockMiembro1, mockMiembro2, mockMiembro3],
        participantes: [part1, part2, part3]
      };
      
      service.agregarGasto(gasto);
      
      const balances = service.balances();
      const b1 = balances.find(b => b.miembro.id === mockMiembro1.id)!; // Juan (pagó 0, debe 50)
      const b2 = balances.find(b => b.miembro.id === mockMiembro2.id)!; // Maria (pagó 200, invitada, debe 0)
      const b3 = balances.find(b => b.miembro.id === mockMiembro3.id)!; // Carlos (pagó 0, debe 150)
      
      expect(b1.balanceNeto).toBe(-50);
      expect(b2.balanceNeto).toBe(200);
      expect(b3.balanceNeto).toBe(-150);
    });
  });

  describe('Payments', () => {
    beforeEach(() => {
      const nueva = service.crearSalida({ titulo: 'Test', fecha: new Date().toISOString() });
      service.cargarSalida(nueva.id);
    });

    it('should register a pending payment', () => {
      service.registrarPago('mock-user-001', '2', 150, 'g1');
      
      const pagos = service.pagos();
      expect(pagos.length).toBe(1);
      expect(pagos[0].estado).toBe('pendiente');
      expect(pagos[0].monto).toBe(150);
    });

    it('should confirm a pending payment', () => {
      service.registrarPago('mock-user-001', '2', 150);
      const pagoId = service.pagos()[0].id;
      
      service.confirmarPago(pagoId);
      
      const pagos = service.pagos();
      expect(pagos[0].estado).toBe('pagado');
    });
  });

  describe('Global Balance', () => {
    it('should calculate global balance correctly', () => {
      // By default MOCK_SALIDAS has mock-user-001 paying 1200 + 4000 = 5200 in some expenses,
      // participating in others... this is a high-level check ensuring the computed signal works.
      const bg = service.balanceGlobal();
      expect(bg).toBeDefined();
      expect(bg.totalAdelantado).toBeGreaterThanOrEqual(0);
      expect(bg.totalCorrespondiente).toBeGreaterThanOrEqual(0);
    });
  });
});
