import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { LoginForm } from './login-form';

/**
 * Tests unitarios para LoginForm (componente presentacional).
 * Verifica validaciones del formulario, comportamiento del botón
 * y emisión del evento loginSubmit al padre.
 */
describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Creación del componente ──────────────────────────────────────────
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // ─── Estado inicial del formulario ───────────────────────────────────
  it('debería tener el formulario inválido cuando los campos están vacíos', () => {
    expect(component.loginForm.valid).toBe(false);
  });

  it('debería tener ambos controles del formulario', () => {
    expect(component.loginForm.contains('emailOrUsername')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  // ─── Validaciones: emailOrUsername ───────────────────────────────────
  it('debería marcar emailOrUsername como inválido cuando está vacío', () => {
    const control = component.loginForm.controls.emailOrUsername;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería marcar emailOrUsername como inválido con formato de email incorrecto', () => {
    const control = component.loginForm.controls.emailOrUsername;
    control.setValue('correo-invalido');
    expect(control.hasError('email')).toBe(true);
  });

  it('debería marcar emailOrUsername como válido con email correcto', () => {
    const control = component.loginForm.controls.emailOrUsername;
    control.setValue('usuario@ejemplo.com');
    expect(control.valid).toBe(true);
  });

  // ─── Validaciones: password ──────────────────────────────────────────
  it('debería marcar password como inválido cuando está vacío', () => {
    const control = component.loginForm.controls.password;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería marcar password como inválido cuando tiene menos de 6 caracteres', () => {
    const control = component.loginForm.controls.password;
    control.setValue('Ab1!');
    expect(control.hasError('minlength')).toBe(true);
  });

  it('debería marcar password como inválido cuando falta una mayúscula', () => {
    const control = component.loginForm.controls.password;
    control.setValue('abcdef1!');
    expect(control.hasError('missingUppercase')).toBe(true);
  });

  it('debería marcar password como inválido cuando falta un número', () => {
    const control = component.loginForm.controls.password;
    control.setValue('Abcdef!');
    expect(control.hasError('missingNumber')).toBe(true);
  });

  it('debería marcar password como inválido cuando falta un carácter especial', () => {
    const control = component.loginForm.controls.password;
    control.setValue('Abcdef1');
    expect(control.hasError('missingSpecial')).toBe(true);
  });

  it('debería marcar password como válido cuando cumple todos los requisitos', () => {
    const control = component.loginForm.controls.password;
    control.setValue('Abcdef1!');
    expect(control.valid).toBe(true);
  });

  // ─── Formulario completo válido ──────────────────────────────────────
  it('debería tener el formulario válido con datos correctos', () => {
    component.loginForm.controls.emailOrUsername.setValue('usuario@ejemplo.com');
    component.loginForm.controls.password.setValue('Abcdef1!');
    expect(component.loginForm.valid).toBe(true);
  });

  // ─── Botón de submit ─────────────────────────────────────────────────
  it('debería deshabilitar el botón cuando el formulario es inválido', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('debería habilitar el botón cuando el formulario es válido', () => {
    component.loginForm.controls.emailOrUsername.setValue('usuario@ejemplo.com');
    component.loginForm.controls.password.setValue('Abcdef1!');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });

  // ─── Emisión del evento loginSubmit ──────────────────────────────────
  it('debería emitir loginSubmit con las credenciales al hacer submit válido', () => {
    const emitSpy = vi.spyOn(component.loginSubmit, 'emit');
    component.loginForm.controls.emailOrUsername.setValue('usuario@ejemplo.com');
    component.loginForm.controls.password.setValue('Abcdef1!');

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith({
      emailOrUsername: 'usuario@ejemplo.com',
      password: 'Abcdef1!',
    });
  });

  it('NO debería emitir loginSubmit cuando el formulario es inválido', () => {
    const emitSpy = vi.spyOn(component.loginSubmit, 'emit');
    component.loginForm.controls.emailOrUsername.setValue('');
    component.loginForm.controls.password.setValue('');

    component.onSubmit();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  // ─── Enlace a registro ───────────────────────────────────────────────
  it('debería tener un enlace a /registro', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="/registro"]');
    expect(link).toBeTruthy();
    expect(link?.textContent?.trim()).toContain('Registrarse');
  });
});
