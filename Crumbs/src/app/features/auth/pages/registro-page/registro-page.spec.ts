import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { RegistroPage } from './registro-page';

/**
 * Tests unitarios para RegistroPage (componente orquestador).
 * Verifica que ensambla correctamente los componentes hijos
 * (RegistroHeader y RegistroForm) y maneja el evento de registro.
 */
describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPage],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el componente de header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-registro-header')).toBeTruthy();
  });

  it('debería renderizar el componente de formulario', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-registro-form')).toBeTruthy();
  });

  it('debería renderizar el layout con header y contenido', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.registro-layout')).toBeTruthy();
    expect(compiled.querySelector('.registro-content')).toBeTruthy();
  });

  it('debería loguear los datos cuando se llama onRegister', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const data = {
      email: 'usuario@ejemplo.com',
      userName: 'juanlopez',
      password: 'Abcdef1!',
      fechaNacimiento: '1995-03-15',
    };

    component.onRegister(data);

    expect(consoleSpy).toHaveBeenCalledWith('Registro:', data);
    consoleSpy.mockRestore();
  });
});
