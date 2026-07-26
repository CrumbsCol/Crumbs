import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';

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
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
      ],
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

  it('debería tener el método onRegister definido', () => {
    expect(component.onRegister).toBeDefined();
  });
});
