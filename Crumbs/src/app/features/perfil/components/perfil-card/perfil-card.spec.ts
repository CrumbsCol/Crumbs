import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';

import { PerfilCard } from './perfil-card';
import { User } from '../../../../core/interfaces/user.interface';

/**
 * Tests unitarios para el componente PerfilCard.
 * Verifica que los datos del usuario se renderizan correctamente
 * en modo visualización (readonly) y que el avatar placeholder
 * se muestra cuando no hay foto.
 */
describe('PerfilCard', () => {
  let component: PerfilCard;
  let componentRef: ComponentRef<PerfilCard>;
  let fixture: ComponentFixture<PerfilCard>;

  /** Datos mock para las pruebas */
  const mockUser: User = {
    id: '3120354',
    nombre: 'Test',
    apellido: 'User',
    userName: 'testuser',
    fechaNacimiento: '01/01/2000',
    email: 'test@example.com',
    avatarUrl: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCard],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilCard);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Establecer el input requerido (modo visualización por defecto)
    componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have readonly form controls with user data', () => {
    expect(component.readonlyNombre.value).toBe('Test');
    expect(component.readonlyApellido.value).toBe('User');
    expect(component.readonlyUserName.value).toBe('testuser');
    expect(component.readonlyFechaNacimiento.value).toBe('01/01/2000');
    expect(component.readonlyPassword.value).toBe('••••••••');
  });

  it('should show avatar placeholder when no avatarUrl', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const svg = compiled.querySelector('.avatar-container svg');
    expect(svg).toBeTruthy();
  });

  it('should have edit form with correct fields', () => {
    expect(component.editForm.contains('nombre')).toBe(true);
    expect(component.editForm.contains('apellido')).toBe(true);
    expect(component.editForm.contains('userName')).toBe(true);
    expect(component.editForm.contains('fechaNacimiento')).toBe(true);
    expect(component.editForm.contains('password')).toBe(true);
    expect(component.editForm.contains('confirmPassword')).toBe(true);
  });

  it('should initialize edit form when editMode changes to true', () => {
    componentRef.setInput('editMode', true);
    fixture.detectChanges();

    expect(component.editForm.controls.nombre.value).toBe('Test');
    expect(component.editForm.controls.apellido.value).toBe('User');
    expect(component.editForm.controls.userName.value).toBe('testuser');
  });

  it('should validate password strength', () => {
    const control = component.editForm.controls.password;

    control.setValue('weak');
    expect(control.hasError('missingUppercase')).toBe(true);

    control.setValue('Weak1');
    expect(control.hasError('missingSpecial')).toBe(true);

    control.setValue('Strong1!');
    expect(control.errors).toBeNull();
  });
});
