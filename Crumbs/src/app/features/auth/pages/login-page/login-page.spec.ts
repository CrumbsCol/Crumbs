import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { LoginPage } from './login-page';

/**
 * Tests unitarios para LoginPage (componente orquestador).
 * Verifica que ensambla correctamente los componentes hijos
 * (LoginBranding y LoginForm) y maneja el evento de login.
 */
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el componente de branding', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-login-branding')).toBeTruthy();
  });

  it('debería renderizar el componente de formulario', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-login-form')).toBeTruthy();
  });

  it('debería renderizar el layout split con ambos paneles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.login-layout')).toBeTruthy();
    expect(compiled.querySelector('.branding-panel-bg')).toBeTruthy();
    expect(compiled.querySelector('.form-panel')).toBeTruthy();
  });

});
