import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Location } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import * as fc from 'fast-check';

import { CrearSalidaComponent } from './crear-salida.component';

describe('CrearSalidaComponent', () => {
  let fixture: ComponentFixture<CrearSalidaComponent>;
  let component: CrearSalidaComponent;
  let locationSpy: { back: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    locationSpy = { back: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CrearSalidaComponent],
      providers: [
        provideNativeDateAdapter(),
        { provide: Location, useValue: locationSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Standalone ─────────────────────────────────────────────────────────────
  it('debe ser un componente standalone', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = (CrearSalidaComponent as any)['ɵcmp'];
    expect(metadata?.standalone).toBe(true);
  });

  // ─── Formulario ─────────────────────────────────────────────────────────────
  it('debe crear el formulario con los campos nombre, descripcion, fecha, hora y horaPeriodo', () => {
    expect(component.form.contains('nombre')).toBe(true);
    expect(component.form.contains('descripcion')).toBe(true);
    expect(component.form.contains('fecha')).toBe(true);
    expect(component.form.contains('hora')).toBe(true);
    expect(component.form.contains('horaPeriodo')).toBe(true);
  });

  it('nombre debe ser obligatorio', () => {
    const nombre = component.form.get('nombre');
    nombre?.setValue('');
    expect(nombre?.hasError('required')).toBe(true);
    nombre?.setValue('Mi Salida');
    expect(nombre?.valid).toBe(true);
  });

  it('horaPeriodo debe tener valor por defecto "AM"', () => {
    expect(component.form.get('horaPeriodo')?.value).toBe('AM');
  });

  it('fecha debe tener valor por defecto de hoy', () => {
    const fecha = component.form.get('fecha')?.value;
    expect(fecha).toBeInstanceOf(Date);
  });

  // ─── Validador de hora ──────────────────────────────────────────────────────
  it('hora vacía es válida (campo opcional)', () => {
    component.form.get('hora')?.setValue('');
    expect(component.form.get('hora')?.valid).toBe(true);
  });

  it('hora "12:30" es válida', () => {
    component.form.get('hora')?.setValue('12:30');
    expect(component.form.get('hora')?.valid).toBe(true);
  });

  it('hora "13:00" es inválida (fuera de rango 1–12)', () => {
    component.form.get('hora')?.setValue('13:00');
    expect(component.form.get('hora')?.hasError('horaRango')).toBe(true);
  });

  it('hora "0:00" es inválida (fuera de rango 1–12)', () => {
    component.form.get('hora')?.setValue('0:00');
    expect(component.form.get('hora')?.hasError('horaRango')).toBe(true);
  });

  it('hora "12:60" es inválida (minutos fuera de rango)', () => {
    component.form.get('hora')?.setValue('12:60');
    expect(component.form.get('hora')?.hasError('minutosRango')).toBe(true);
  });

  it('hora "abc" es inválida (formato incorrecto)', () => {
    component.form.get('hora')?.setValue('abc');
    expect(component.form.get('hora')?.hasError('horaFormato')).toBe(true);
  });

  // ─── Property test: horaValidator ───────────────────────────────────────────
  it('Property: cualquier hora HH:MM con H en [1,12] y M en [0,59] es válida', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 12 }),
        fc.integer({ min: 0, max: 59 }),
        (h, m) => {
          const value = `${h}:${m.toString().padStart(2, '0')}`;
          component.form.get('hora')?.setValue(value);
          expect(component.form.get('hora')?.valid).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  // ─── Integrantes ────────────────────────────────────────────────────────────
  it('debe iniciar con un integrante de ejemplo', () => {
    expect(component.integrantes().length).toBe(1);
    expect(component.integrantes()[0].nombre).toBe('Ana García');
  });

  it('removeIntegrante elimina el integrante por id', () => {
    component.removeIntegrante(1);
    expect(component.integrantes().length).toBe(0);
  });

  // ─── Navegación ─────────────────────────────────────────────────────────────
  it('onCancelar llama a location.back()', () => {
    component.onCancelar();
    expect(locationSpy.back).toHaveBeenCalled();
  });

  it('onAgregar no lanza error (no-op por ahora)', () => {
    expect(() => component.onAgregar()).not.toThrow();
  });

  // ─── onFechaKeydown ─────────────────────────────────────────────────────────
  it('onFechaKeydown permite dígitos y "/"', () => {
    const event = new KeyboardEvent('keydown', { key: '5' });
    const spy = vi.spyOn(event, 'preventDefault');
    component.onFechaKeydown(event);
    expect(spy).not.toHaveBeenCalled();

    const slashEvent = new KeyboardEvent('keydown', { key: '/' });
    const slashSpy = vi.spyOn(slashEvent, 'preventDefault');
    component.onFechaKeydown(slashEvent);
    expect(slashSpy).not.toHaveBeenCalled();
  });

  it('onFechaKeydown bloquea letras', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    const spy = vi.spyOn(event, 'preventDefault');
    component.onFechaKeydown(event);
    expect(spy).toHaveBeenCalled();
  });

  it('onFechaKeydown permite teclas de control (Backspace, Tab, etc.)', () => {
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    const spy = vi.spyOn(event, 'preventDefault');
    component.onFechaKeydown(event);
    expect(spy).not.toHaveBeenCalled();
  });

  // ─── Template ───────────────────────────────────────────────────────────────
  it('muestra el título "Crear Salida"', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Crear Salida');
  });

  it('muestra dos botones en la action bar: "Cancelar" y "Agregar"', () => {
    const actionBar: HTMLElement = fixture.nativeElement.querySelector('.action-bar');
    const buttons = actionBar?.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
    const labels = Array.from(buttons ?? []).map((b) => b.textContent?.trim());
    expect(labels).toContain('Cancelar');
    expect(labels).toContain('Agregar');
  });

  it('muestra la sección de integrantes con título "Integrantes"', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('.integrantes-header h2');
    expect(h2?.textContent?.trim()).toBe('Integrantes');
  });

  it('muestra el botón de agregar integrante (person_add) sin funcionalidad', () => {
    const addBtn = fixture.nativeElement.querySelector('.integrantes-header button[mat-icon-button]');
    expect(addBtn).not.toBeNull();
  });

  it('muestra el integrante de ejemplo con botón de eliminar', () => {
    const items = fixture.nativeElement.querySelectorAll('.integrante-item');
    expect(items.length).toBe(1);
    const deleteBtn = items[0].querySelector('.integrante-delete');
    expect(deleteBtn).not.toBeNull();
  });
});
