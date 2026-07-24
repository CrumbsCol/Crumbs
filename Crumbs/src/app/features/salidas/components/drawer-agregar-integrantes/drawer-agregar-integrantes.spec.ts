import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentRef } from '@angular/core';

import { DrawerAgregarIntegrantes } from './drawer-agregar-integrantes';
import { Miembro } from '../../../../core/interfaces/salida.interface';

/**
 * Tests unitarios para el componente DrawerAgregarIntegrantes.
 * Verifica la creación, búsqueda de miembros, selección, fantasmas y agregación en lote.
 */
describe('DrawerAgregarIntegrantes', () => {
  let component: DrawerAgregarIntegrantes;
  let componentRef: ComponentRef<DrawerAgregarIntegrantes>;
  let fixture: ComponentFixture<DrawerAgregarIntegrantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerAgregarIntegrantes],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerAgregarIntegrantes);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('abierto', false);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have frequent members loaded', () => {
    expect(component.miembrosFrecuentes().length).toBeGreaterThan(0);
  });

  it('should find a member by userName', () => {
    component.busqueda.set('juanlopez');
    component.buscar();
    expect(component.seleccionados().length).toBe(1);
    expect(component.seleccionados()[0].userName).toBe('juanlopez');
    expect(component.errorBusqueda()).toBe('');
  });

  it('should find a member by email', () => {
    component.busquedaEmail.set('maria@example.com');
    component.buscarPorEmail();
    expect(component.seleccionados().length).toBe(1);
    expect(component.seleccionados()[0].email).toBe('maria@example.com');
  });

  it('should show error when member not found', () => {
    component.busqueda.set('noexiste');
    component.buscar();
    expect(component.seleccionados().length).toBe(0);
    expect(component.errorBusqueda()).toContain('noexiste');
  });

  it('should show error when search is empty', () => {
    component.busqueda.set('');
    component.buscar();
    expect(component.errorBusqueda()).toBeTruthy();
  });

  it('should add ghost member (integrante fantasma)', () => {
    component.nombreFantasma.set('Pepito');
    component.agregarFantasma();
    expect(component.seleccionados().length).toBe(1);
    expect(component.seleccionados()[0].nombre).toBe('Pepito');
    expect(component.seleccionados()[0].userName).toBe('');
    expect(component.seleccionados()[0].email).toBe('');
    expect(component.seleccionados()[0].avatarUrl).toBeNull();
    expect(component.nombreFantasma()).toBe('');
  });

  it('should not add ghost member with empty name', () => {
    component.nombreFantasma.set('   ');
    component.agregarFantasma();
    expect(component.seleccionados().length).toBe(0);
  });

  it('should add member to selection', () => {
    const miembro: Miembro = {
      id: '1',
      nombre: 'Juan López',
      userName: 'juanlopez',
      email: 'juan@example.com',
      avatarUrl: null,
    };
    component.agregarASeleccion(miembro);
    expect(component.seleccionados().length).toBe(1);
    expect(component.yaSeleccionado('1')).toBe(true);
  });

  it('should not add duplicate members', () => {
    const miembro: Miembro = {
      id: '1',
      nombre: 'Juan López',
      userName: 'juanlopez',
      email: 'juan@example.com',
      avatarUrl: null,
    };
    component.agregarASeleccion(miembro);
    component.agregarASeleccion(miembro);
    expect(component.seleccionados().length).toBe(1);
  });

  it('should remove member from selection', () => {
    const miembro: Miembro = {
      id: '1',
      nombre: 'Juan López',
      userName: 'juanlopez',
      email: 'juan@example.com',
      avatarUrl: null,
    };
    component.agregarASeleccion(miembro);
    component.removerDeSeleccion('1');
    expect(component.seleccionados().length).toBe(0);
    expect(component.yaSeleccionado('1')).toBe(false);
  });

  it('should not emit when no members selected', () => {
    let emitted = false;
    component.integrantesAgregados.subscribe(() => (emitted = true));
    component.confirmarAgregacion();
    expect(emitted).toBe(false);
  });
});
