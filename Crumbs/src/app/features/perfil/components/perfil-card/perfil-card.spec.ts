import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
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
    nombre: 'Test User',
    userName: 'testuser',
    fechaNacimiento: '01/01/2000',
    email: 'test@example.com',
    avatarUrl: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCard],
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

  it('should display the user name in readonly input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('.user-info input');
    const nombreInput = inputs[0] as HTMLInputElement;
    expect(nombreInput.value).toBe('Test User');
  });

  it('should display the userName in readonly input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('.user-info input');
    const userNameInput = inputs[1] as HTMLInputElement;
    expect(userNameInput.value).toBe('testuser');
  });

  it('should display the birth date in readonly input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('.user-info input');
    const fechaInput = inputs[2] as HTMLInputElement;
    expect(fechaInput.value).toBe('01/01/2000');
  });

  it('should display password field as masked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('.user-info input');
    const passwordInput = inputs[3] as HTMLInputElement;
    expect(passwordInput.type).toBe('password');
    expect(passwordInput.value).toBe('••••••••');
  });

  it('should show avatar placeholder when no avatarUrl', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const svg = compiled.querySelector('.avatar-container svg');
    expect(svg).toBeTruthy();
  });
});
