import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { DesgloseGastosCard } from './desglose-gastos-card';
import { DesgloseGasto } from '../../../../core/services/salida.service';
import { Miembro } from '../../../../core/interfaces/salida.interface';

const MOCK_MIEMBROS: Miembro[] = [
  { id: '1', nombre: 'Juan López', userName: 'juanlopez', email: 'juan@example.com', avatarUrl: null },
  { id: '2', nombre: 'María García', userName: 'mariagarcia', email: 'maria@example.com', avatarUrl: null },
  { id: '3', nombre: 'Carlos Rdz', userName: 'carlosrodriguez', email: 'carlos@example.com', avatarUrl: null },
];

const MOCK_DESGLOSE: DesgloseGasto[] = [
  {
    gasto: {
      id: 'g1',
      nombre: 'Boletos cine',
      descripcion: '3 boletos IMAX',
      monto: 450,
      fecha: '2026-07-20T16:00:00',
      metodoDivision: 'equitativo',
      pagadoPor: MOCK_MIEMBROS[0],
      miembrosParticipantes: MOCK_MIEMBROS,
    },
    pagador: MOCK_MIEMBROS[0],
    participaciones: [
      { miembro: MOCK_MIEMBROS[0], monto: 150 },
      { miembro: MOCK_MIEMBROS[1], monto: 150 },
      { miembro: MOCK_MIEMBROS[2], monto: 150 },
    ],
  },
  {
    gasto: {
      id: 'g2',
      nombre: 'Palomitas',
      descripcion: 'Combo grande',
      monto: 280,
      fecha: '2026-07-20T16:30:00',
      metodoDivision: 'equitativo',
      pagadoPor: MOCK_MIEMBROS[1],
      miembrosParticipantes: MOCK_MIEMBROS,
    },
    pagador: MOCK_MIEMBROS[1],
    participaciones: [
      { miembro: MOCK_MIEMBROS[0], monto: 93 },
      { miembro: MOCK_MIEMBROS[1], monto: 93 },
      { miembro: MOCK_MIEMBROS[2], monto: 93 },
    ],
  },
];

/**
 * Tests unitarios para el componente DesgloseGastosCard.
 */
describe('DesgloseGastosCard', () => {
  let component: DesgloseGastosCard;
  let fixture: ComponentFixture<DesgloseGastosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesgloseGastosCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DesgloseGastosCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('desgloseGastos', MOCK_DESGLOSE);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive desgloseGastos input', () => {
    expect(component.desgloseGastos()).toEqual(MOCK_DESGLOSE);
    expect(component.desgloseGastos().length).toBe(2);
  });

  it('should show empty state when no desglose', () => {
    fixture.componentRef.setInput('desgloseGastos', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
  });

  it('should render gasto names in desglose list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.desglose-titulo');
    expect(items.length).toBe(2);
    expect(items[0].textContent?.trim()).toBe('Boletos cine');
    expect(items[1].textContent?.trim()).toBe('Palomitas');
  });

  it('should render participacion chips', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('.participacion-chip');
    // 3 participantes por el primer gasto + 3 por el segundo = 6
    expect(chips.length).toBe(6);
  });
});
