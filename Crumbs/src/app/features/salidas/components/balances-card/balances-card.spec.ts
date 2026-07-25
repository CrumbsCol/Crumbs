import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { BalancesCard } from './balances-card';
import { BalanceMiembro } from '../../../../core/services/salida.service';
import { Miembro, Pago } from '../../../../core/interfaces/salida.interface';

const MOCK_MIEMBROS: Miembro[] = [
  { id: '1', nombre: 'Juan López', userName: 'juanlopez', email: 'juan@example.com', avatarUrl: null },
  { id: '2', nombre: 'María García', userName: 'mariagarcia', email: 'maria@example.com', avatarUrl: null },
  { id: '3', nombre: 'Carlos Rdz', userName: 'carlosrodriguez', email: 'carlos@example.com', avatarUrl: null },
];

const MOCK_BALANCES: BalanceMiembro[] = [
  { miembro: MOCK_MIEMBROS[0], totalAdelantado: 450, totalCorrespondiente: 273, balanceNeto: 177 },
  { miembro: MOCK_MIEMBROS[1], totalAdelantado: 280, totalCorrespondiente: 243, balanceNeto: 37 },
  { miembro: MOCK_MIEMBROS[2], totalAdelantado: 60, totalCorrespondiente: 273, balanceNeto: -213 },
];

const MOCK_PAGOS: Pago[] = [
  { id: 'p1', deudorId: '3', pagadorId: '1', monto: 213, estado: 'pendiente', fecha: '2026-07-20T20:00:00' },
];

describe('BalancesCard', () => {
  let component: BalancesCard;
  let fixture: ComponentFixture<BalancesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalancesCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BalancesCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('balances', MOCK_BALANCES);
    fixture.componentRef.setInput('pagos', MOCK_PAGOS);
    fixture.componentRef.setInput('miembros', MOCK_MIEMBROS);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive balances input', () => {
    expect(component.balances()).toEqual(MOCK_BALANCES);
    expect(component.balances().length).toBe(3);
  });

  it('should receive pagos input', () => {
    expect(component.pagos()).toEqual(MOCK_PAGOS);
    expect(component.pagos().length).toBe(1);
  });

  it('should resolve member name by id', () => {
    expect(component.getNombreMiembro('1')).toBe('Juan López');
    expect(component.getNombreMiembro('999')).toBe('Desconocido');
  });

  it('should emit registrarPago event', () => {
    const spy = vi.fn();
    component.registrarPago.subscribe(spy);

    component.onRegistrarPago('3', '1', 213);

    expect(spy).toHaveBeenCalledWith({ deudorId: '3', pagadorId: '1', monto: 213 });
  });

  it('should emit confirmarPago event', () => {
    const spy = vi.fn();
    component.confirmarPago.subscribe(spy);

    component.onConfirmarPago('p1');

    expect(spy).toHaveBeenCalledWith('p1');
  });

  it('should show empty state when no balances', () => {
    fixture.componentRef.setInput('balances', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });
});
