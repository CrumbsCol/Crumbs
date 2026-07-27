import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SalidaService } from './salida.service';
import { UserService } from './user.service';

describe('SalidaService', () => {
  let service: SalidaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SalidaService,
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SalidaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería cargar salidas desde el backend', () => {
    service.cargarSalidas();

    const req = httpMock.expectOne((r) => r.url.includes('/salidas'));
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', titulo: 'Test', _count: { miembros: 2, gastos: 1 } }]);

    expect(service.salidas().length).toBe(1);
  });

  it('debería cargar detalle de una salida', () => {
    const mockSalida = {
      id: '1',
      titulo: 'Test',
      descripcion: null,
      codigoInvitacion: 'ABC123',
      fechaCreacion: '2026-07-26T00:00:00Z',
      miembros: [],
      gastos: [],
      pagos: [],
    };

    service.cargarSalida('1');

    const req = httpMock.expectOne((r) => r.url.includes('/salidas/1'));
    expect(req.request.method).toBe('GET');
    req.flush(mockSalida);

    expect(service.salidaActual()).toBeTruthy();
    expect(service.salidaActual()?.titulo).toBe('Test');
  });

  it('debería crear una salida via HTTP', () => {
    service.crearSalida({ titulo: 'Nueva', fecha: '2026-07-26' });

    const req = httpMock.expectOne((r) => r.url.includes('/salidas') && r.method === 'POST');
    expect(req.request.body.titulo).toBe('Nueva');
    req.flush({ id: '2', titulo: 'Nueva', codigoInvitacion: 'XYZ789' });
  });

  it('debería agregar gasto via HTTP', () => {
    // Primero cargar una salida actual
    service.cargarSalida('1');
    const salReq = httpMock.expectOne((r) => r.url.includes('/salidas/1'));
    salReq.flush({ id: '1', titulo: 'T', miembros: [], gastos: [], pagos: [], codigoInvitacion: 'A', fechaCreacion: '', descripcion: null });

    service.agregarGasto({
      nombre: 'Test',
      monto: 1000,
      fecha: '2026-07-26',
      metodoDivision: 'equitativo',
      pagadoPorMiembroId: 'miembro-1',
      participantes: [{ salidaMiembroId: 'miembro-1', esInvitado: false, montoManual: null }],
    });

    const gastoReq = httpMock.expectOne((r) => r.url.includes('/gastos') && r.method === 'POST');
    expect(gastoReq.request.body.nombre).toBe('Test');
    expect(gastoReq.request.body.pagadoPorMiembroId).toBe('miembro-1');
    gastoReq.flush({});

    // Después de agregar, recarga la salida
    const reloadReq = httpMock.expectOne((r) => r.url.includes('/salidas/1'));
    reloadReq.flush({ id: '1', titulo: 'T', miembros: [], gastos: [], pagos: [], codigoInvitacion: 'A', fechaCreacion: '', descripcion: null });
  });

  it('debería registrar pago via HTTP', () => {
    service.cargarSalida('1');
    const salReq = httpMock.expectOne((r) => r.url.includes('/salidas/1'));
    salReq.flush({ id: '1', titulo: 'T', miembros: [{ id: 'm1', nombre: 'Test', userName: 'test', email: '', avatarUrl: null }], gastos: [], pagos: [], codigoInvitacion: 'A', fechaCreacion: '', descripcion: null });

    service.registrarPago('deudor-1', 'pagador-1', 500);

    const pagoReq = httpMock.expectOne((r) => r.url.includes('/pagos') && r.method === 'POST');
    expect(pagoReq.request.body.deudorId).toBe('deudor-1');
    expect(pagoReq.request.body.monto).toBe(500);
    pagoReq.flush({});

    const reloadReq = httpMock.expectOne((r) => r.url.includes('/salidas/1'));
    reloadReq.flush({ id: '1', titulo: 'T', miembros: [], gastos: [], pagos: [], codigoInvitacion: 'A', fechaCreacion: '', descripcion: null });
  });

  it('debería cargar balance detallado', () => {
    service.cargarBalanceDetallado();

    const req = httpMock.expectOne((r) => r.url.includes('/balance-detallado'));
    expect(req.request.method).toBe('GET');
    req.flush({ totalMeDeben: 1000, totalDebo: 500, balanceNeto: 500, creditos: [], deudas: [] });

    expect(service.balanceDetallado()?.totalMeDeben).toBe(1000);
  });
});
