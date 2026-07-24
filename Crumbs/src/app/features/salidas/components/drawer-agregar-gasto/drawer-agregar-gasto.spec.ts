import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentRef } from '@angular/core';

import { DrawerAgregarGasto } from './drawer-agregar-gasto';
import { Miembro } from '../../../../core/interfaces/salida.interface';

const MOCK_MIEMBROS: Miembro[] = [
  { id: '1', nombre: 'Juan López', userName: 'juanlopez', email: 'juan@example.com', avatarUrl: null },
  { id: '2', nombre: 'María García', userName: 'mariagarcia', email: 'maria@example.com', avatarUrl: null },
];

/**
 * Tests unitarios para el componente DrawerAgregarGasto.
 * Verifica la creación, validación del formulario y selección de miembros.
 */
describe('DrawerAgregarGasto', () => {
  let component: DrawerAgregarGasto;
  let componentRef: ComponentRef<DrawerAgregarGasto>;
  let fixture: ComponentFixture<DrawerAgregarGasto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerAgregarGasto],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerAgregarGasto);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('miembros', MOCK_MIEMBROS);
    componentRef.setInput('abierto', false);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should validate required fields', () => {
    component.form.markAllAsTouched();
    expect(component.form.get('nombre')?.hasError('required')).toBe(true);
    expect(component.form.get('monto')?.hasError('required')).toBe(true);
    expect(component.form.get('fecha')?.hasError('required')).toBe(true);
    expect(component.form.get('pagador')?.hasError('required')).toBe(true);
  });

  it('should toggle member selection', () => {
    expect(component.estaSeleccionado('1')).toBe(false);
    component.toggleMiembro('1');
    expect(component.estaSeleccionado('1')).toBe(true);
    component.toggleMiembro('1');
    expect(component.estaSeleccionado('1')).toBe(false);
  });

  it('should toggle division method', () => {
    expect(component.esManual()).toBe(false);
    component.toggleMetodoDivision();
    expect(component.esManual()).toBe(true);
  });

  it('should toggle invitado status', () => {
    expect(component.esInvitado('1')).toBe(false);
    component.toggleInvitado('1');
    expect(component.esInvitado('1')).toBe(true);
    component.toggleInvitado('1');
    expect(component.esInvitado('1')).toBe(false);
  });

  it('should track manual amounts', () => {
    component.setMontoManual('1', 100);
    component.setMontoManual('2', 200);
    expect(component.getMontoManual('1')).toBe(100);
    expect(component.totalManual()).toBe(300);
  });

  it('should not submit when form is invalid', () => {
    let emitted = false;
    component.gastoAgregado.subscribe(() => (emitted = true));
    component.onSubmit();
    expect(emitted).toBe(false);
  });

  it('should block submit in manual mode when totals do not match', () => {
    component.form.patchValue({
      nombre: 'Test Gasto',
      monto: 300,
      fecha: new Date(),
      pagador: '1',
    });
    component.toggleMiembro('1');
    component.toggleMiembro('2');
    component.toggleMetodoDivision(); // manual mode
    component.setMontoManual('1', 100);
    component.setMontoManual('2', 100); // total = 200 != 300

    expect(component.manualesValidos()).toBe(false);
  });
});
