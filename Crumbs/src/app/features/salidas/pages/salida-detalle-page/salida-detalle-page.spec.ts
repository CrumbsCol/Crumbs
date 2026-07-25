import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { SalidaDetallePage } from './salida-detalle-page';

/**
 * Tests unitarios para el componente SalidaDetallePage.
 * Verifica la creación del componente, la carga de la salida,
 * balances, pagos, y la apertura/cierre de los drawers.
 */
describe('SalidaDetallePage', () => {
  let component: SalidaDetallePage;
  let fixture: ComponentFixture<SalidaDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaDetallePage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalidaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load salida on init', () => {
    expect(component.salida()).toBeTruthy();
    expect(component.salida()?.titulo).toBe('Viaje a la Playa');
  });

  it('should display the invitation code', () => {
    expect(component.salida()?.codigoInvitacion).toBe('A3B9X2');
  });

  it('should have gastos ordered chronologically', () => {
    const gastos = component.gastos();
    expect(gastos.length).toBeGreaterThan(0);
    for (let i = 1; i < gastos.length; i++) {
      expect(new Date(gastos[i - 1].fecha).getTime()).toBeGreaterThanOrEqual(
        new Date(gastos[i].fecha).getTime()
      );
    }
  });

  it('should calculate balances for all members', () => {
    const balances = component.balances();
    expect(balances.length).toBe(5); // 5 miembros in salida 1
    // Each member should have balance data
    for (const b of balances) {
      expect(b.miembro).toBeDefined();
      expect(typeof b.totalAdelantado).toBe('number');
      expect(typeof b.totalCorrespondiente).toBe('number');
      expect(typeof b.balanceNeto).toBe('number');
    }
  });

  it('should have desglose for each gasto', () => {
    const desglose = component.desgloseGastos();
    expect(desglose.length).toBeGreaterThan(0);
    for (const d of desglose) {
      expect(d.pagador).toBeDefined();
      expect(d.participaciones.length).toBeGreaterThan(0);
    }
  });

  it('should register and confirm a payment', () => {
    const initialCount = component.pagos().length;
    component.registrarPago('2', '1', 100);
    const pagos = component.pagos();
    expect(pagos.length).toBe(initialCount + 1);

    const newPago = pagos[pagos.length - 1];
    expect(newPago.estado).toBe('pendiente');

    component.confirmarPago(newPago.id);
    const pagosActualizados = component.pagos();
    const confirmedPago = pagosActualizados.find(p => p.id === newPago.id);
    expect(confirmedPago?.estado).toBe('pagado');
  });

  it('should open and close the gasto drawer', () => {
    expect(component.drawerGastoAbierto()).toBe(false);
    component.abrirDrawerGasto();
    expect(component.drawerGastoAbierto()).toBe(true);
    component.cerrarDrawerGasto();
    expect(component.drawerGastoAbierto()).toBe(false);
  });

  it('should open and close the integrantes drawer', () => {
    expect(component.drawerIntegrantesAbierto()).toBe(false);
    component.abrirDrawerIntegrantes();
    expect(component.drawerIntegrantesAbierto()).toBe(true);
    component.cerrarDrawerIntegrantes();
    expect(component.drawerIntegrantesAbierto()).toBe(false);
  });

  it('should get member name by id', () => {
    expect(component.getNombreMiembro('mock-user-001')).toBe('Juan López');
    expect(component.getNombreMiembro('999')).toBe('Desconocido');
  });
});
