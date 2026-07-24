import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { RegistroForm } from './registro-form';

/**
 * Tests unitarios para RegistroForm (componente presentacional).
 * Verifica validaciones de los 5 campos, coincidencia de contraseñas,
 * estado del botón y emisión del evento registroSubmit.
 */
describe('RegistroForm', () => {
  let component: RegistroForm;
  let fixture: ComponentFixture<RegistroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroForm],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Creación ─────────────────────────────────────────────────────────
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // ─── Estado inicial ───────────────────────────────────────────────────
  it('debería tener el formulario inválido cuando los campos están vacíos', () => {
    expect(component.registroForm.valid).toBe(false);
  });

  it('debería tener los 5 controles del formulario', () => {
    expect(component.registroForm.contains('email')).toBe(true);
    expect(component.registroForm.contains('userName')).toBe(true);
    expect(component.registroForm.contains('password')).toBe(true);
    expect(component.registroForm.contains('confirmPassword')).toBe(true);
    expect(component.registroForm.contains('fechaNacimiento')).toBe(true);
  });

  // ─── Validaciones: email ──────────────────────────────────────────────
  it('debería marcar email como inválido cuando está vacío', () => {
    const control = component.registroForm.controls.email;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería marcar email como inválido con formato incorrecto', () => {
    const control = component.registroForm.controls.email;
    control.setValue('correo-malo');
    expect(control.hasError('email')).toBe(true);
  });

  it('debería marcar email como válido con formato correcto', () => {
    const control = component.registroForm.controls.email;
    control.setValue('usuario@ejemplo.com');
    expect(control.valid).toBe(true);
  });

  // ─── Validaciones: userName ───────────────────────────────────────────
  it('debería marcar userName como inválido cuando está vacío', () => {
    const control = component.registroForm.controls.userName;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería marcar userName como válido con valor', () => {
    const control = component.registroForm.controls.userName;
    control.setValue('juanlopez');
    expect(control.valid).toBe(true);
  });

  // ─── Validaciones: password ───────────────────────────────────────────
  it('debería marcar password como inválido cuando está vacío', () => {
    const control = component.registroForm.controls.password;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería marcar password como inválido cuando tiene menos de 6 caracteres', () => {
    const control = component.registroForm.controls.password;
    control.setValue('Ab1!');
    expect(control.hasError('minlength')).toBe(true);
  });

  it('debería marcar password como inválido cuando falta una mayúscula', () => {
    const control = component.registroForm.controls.password;
    control.setValue('abcdef1!');
    expect(control.hasError('missingUppercase')).toBe(true);
  });

  it('debería marcar password como inválido cuando falta un número', () => {
    const control = component.registroForm.controls.password;
    control.setValue('Abcdef!');
    expect(control.hasError('missingNumber')).toBe(true);
  });

  it('debería marcar password como inválido cuando falta un carácter especial', () => {
    const control = component.registroForm.controls.password;
    control.setValue('Abcdef1');
    expect(control.hasError('missingSpecial')).toBe(true);
  });

  it('debería marcar password como válido cuando cumple todos los requisitos', () => {
    const control = component.registroForm.controls.password;
    control.setValue('Abcdef1!');
    expect(control.valid).toBe(true);
  });

  // ─── Validaciones: confirmPassword ────────────────────────────────────
  it('debería marcar confirmPassword como inválido cuando está vacío', () => {
    const control = component.registroForm.controls.confirmPassword;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería tener error passwordMismatch cuando las contraseñas no coinciden', () => {
    component.registroForm.controls.password.setValue('Abcdef1!');
    component.registroForm.controls.confirmPassword.setValue('OtraPass1!');
    expect(component.registroForm.hasError('passwordMismatch')).toBe(true);
  });

  it('NO debería tener error passwordMismatch cuando las contraseñas coinciden', () => {
    component.registroForm.controls.password.setValue('Abcdef1!');
    component.registroForm.controls.confirmPassword.setValue('Abcdef1!');
    expect(component.registroForm.hasError('passwordMismatch')).toBe(false);
  });

  // ─── Validaciones: fechaNacimiento ────────────────────────────────────
  it('debería marcar fechaNacimiento como inválido cuando está vacío', () => {
    const control = component.registroForm.controls.fechaNacimiento;
    control.setValue('');
    expect(control.hasError('required')).toBe(true);
  });

  it('debería marcar fechaNacimiento como válido con fecha', () => {
    const control = component.registroForm.controls.fechaNacimiento;
    control.setValue('1995-03-15');
    expect(control.valid).toBe(true);
  });

  // ─── Formulario completo válido ───────────────────────────────────────
  it('debería tener el formulario válido con todos los datos correctos', () => {
    component.registroForm.controls.email.setValue('usuario@ejemplo.com');
    component.registroForm.controls.userName.setValue('juanlopez');
    component.registroForm.controls.password.setValue('Abcdef1!');
    component.registroForm.controls.confirmPassword.setValue('Abcdef1!');
    component.registroForm.controls.fechaNacimiento.setValue('1995-03-15');
    expect(component.registroForm.valid).toBe(true);
  });

  // ─── Botón de submit ──────────────────────────────────────────────────
  it('debería deshabilitar el botón cuando el formulario es inválido', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('debería habilitar el botón cuando el formulario es válido', () => {
    component.registroForm.controls.email.setValue('usuario@ejemplo.com');
    component.registroForm.controls.userName.setValue('juanlopez');
    component.registroForm.controls.password.setValue('Abcdef1!');
    component.registroForm.controls.confirmPassword.setValue('Abcdef1!');
    component.registroForm.controls.fechaNacimiento.setValue('1995-03-15');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });

  // ─── Emisión del evento registroSubmit ─────────────────────────────────
  it('debería emitir registroSubmit con los datos al hacer submit válido', () => {
    const emitSpy = vi.spyOn(component.registroSubmit, 'emit');
    component.registroForm.controls.email.setValue('usuario@ejemplo.com');
    component.registroForm.controls.userName.setValue('juanlopez');
    component.registroForm.controls.password.setValue('Abcdef1!');
    component.registroForm.controls.confirmPassword.setValue('Abcdef1!');
    component.registroForm.controls.fechaNacimiento.setValue('1995-03-15');

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith({
      email: 'usuario@ejemplo.com',
      userName: 'juanlopez',
      password: 'Abcdef1!',
      fechaNacimiento: '1995-03-15',
    });
  });

  it('NO debería emitir registroSubmit cuando el formulario es inválido', () => {
    const emitSpy = vi.spyOn(component.registroSubmit, 'emit');
    component.onSubmit();
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
