import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Location } from '@angular/common';
import * as fc from 'fast-check';

import { AgregarSalidaComponent } from './agregar-salida.component';

describe('AgregarSalidaComponent', () => {
  let fixture: ComponentFixture<AgregarSalidaComponent>;
  let component: AgregarSalidaComponent;
  let locationSpy: { back: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    locationSpy = { back: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AgregarSalidaComponent],
      providers: [{ provide: Location, useValue: locationSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Standalone ─────────────────────────────────────────────────────────────
  it('debe ser un componente standalone', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = (AgregarSalidaComponent as any)['ɵcmp'];
    expect(metadata?.standalone).toBe(true);
  });

  // ─── Formulario ─────────────────────────────────────────────────────────────
  it('debe crear el formulario con el campo codigo', () => {
    expect(component.form.contains('codigo')).toBe(true);
  });

  it('codigo vacío es inválido (campo obligatorio)', () => {
    component.form.get('codigo')?.setValue('');
    expect(component.form.get('codigo')?.hasError('required')).toBe(true);
  });

  it('codigo alfanumérico es válido', () => {
    component.form.get('codigo')?.setValue('ABC123');
    expect(component.form.get('codigo')?.valid).toBe(true);
  });

  it('codigo con caracteres especiales es inválido', () => {
    component.form.get('codigo')?.setValue('ABC-123');
    expect(component.form.get('codigo')?.hasError('pattern')).toBe(true);
  });

  it('codigo con espacios es inválido', () => {
    component.form.get('codigo')?.setValue('ABC 123');
    expect(component.form.get('codigo')?.hasError('pattern')).toBe(true);
  });

  // ─── Property test: solo alfanuméricos son válidos ──────────────────────────
  it('Property: cualquier string alfanumérico no vacío es un código válido', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')), { minLength: 1, maxLength: 20 }),
        (code) => {
          component.form.get('codigo')?.setValue(code);
          expect(component.form.get('codigo')?.valid).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('Property: cualquier string con al menos un caracter no-alfanumérico es inválido', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 20 }).filter((s) => /[^a-zA-Z0-9]/.test(s)),
        (code) => {
          component.form.get('codigo')?.setValue(code);
          expect(component.form.get('codigo')?.valid).toBe(false);
        },
      ),
      { numRuns: 100 },
    );
  });

  // ─── Navegación ─────────────────────────────────────────────────────────────
  it('onCancelar llama a location.back()', () => {
    component.onCancelar();
    expect(locationSpy.back).toHaveBeenCalled();
  });

  it('onUnirme no lanza error (no-op por ahora)', () => {
    expect(() => component.onUnirme()).not.toThrow();
  });

  // ─── Template ───────────────────────────────────────────────────────────────
  it('muestra el título "Agregar Salida"', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Agregar Salida');
  });

  it('muestra dos botones en la action bar: "Cancelar" y "Unirme"', () => {
    const actionBar: HTMLElement = fixture.nativeElement.querySelector('.action-bar');
    const buttons = actionBar?.querySelectorAll('button');
    expect(buttons?.length).toBe(2);
    const labels = Array.from(buttons ?? []).map((b) => b.textContent?.trim());
    expect(labels).toContain('Cancelar');
    expect(labels).toContain('Unirme');
  });

  it('muestra el icono de búsqueda en el campo de código', () => {
    const icon = fixture.nativeElement.querySelector('mat-icon');
    expect(icon?.textContent?.trim()).toBe('search');
  });

  it('el campo de código tiene placeholder "Ej: ABC123"', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[formControlName="codigo"]');
    expect(input?.placeholder).toBe('Ej: ABC123');
  });
});
