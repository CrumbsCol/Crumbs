import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { GastosCard } from './gastos-card';
import { Gasto, Miembro } from '../../../../core/interfaces/salida.interface';

const MOCK_MIEMBRO: Miembro = {
  id: '1',
  nombre: 'Juan López',
  userName: 'juanlopez',
  email: 'juan@example.com',
  avatarUrl: null,
};

const MOCK_GASTOS: Gasto[] = [
  {
    id: 'g1',
    nombre: 'Boletos cine',
    descripcion: '3 boletos sala IMAX',
    monto: 450,
    fecha: '2026-07-20T16:00:00',
    metodoDivision: 'equitativo',
    pagadoPor: MOCK_MIEMBRO,
    miembrosParticipantes: [MOCK_MIEMBRO],
  },
  {
    id: 'g2',
    nombre: 'Palomitas',
    descripcion: 'Combo grande',
    monto: 280,
    fecha: '2026-07-20T16:30:00',
    metodoDivision: 'equitativo',
    pagadoPor: MOCK_MIEMBRO,
    miembrosParticipantes: [MOCK_MIEMBRO],
  },
];

/**
 * Tests unitarios para el componente GastosCard.
 */
describe('GastosCard', () => {
  let component: GastosCard;
  let fixture: ComponentFixture<GastosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosCard],
    }).compileComponents();

    fixture = TestBed.createComponent(GastosCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('gastos', MOCK_GASTOS);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive gastos input', () => {
    expect(component.gastos()).toEqual(MOCK_GASTOS);
    expect(component.gastos().length).toBe(2);
  });

  it('should show empty state when no gastos', () => {
    fixture.componentRef.setInput('gastos', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[role="status"]')).toBeTruthy();
  });

  it('should render gasto names in the list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent;
    expect(text).toContain('Boletos cine');
    expect(text).toContain('Palomitas');
  });
});
