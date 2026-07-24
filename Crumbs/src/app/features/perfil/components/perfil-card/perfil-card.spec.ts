import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';

import { PerfilCard } from './perfil-card';
import { User } from '../../../../core/interfaces/user.interface';

/**
 * Tests unitarios para el componente PerfilCard.
 * Verifica que los datos del usuario se renderizan correctamente
 * y que el avatar placeholder se muestra cuando no hay foto.
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

    // Establecer el input requerido
    componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userInfo = compiled.querySelector('.user-info');
    expect(userInfo?.textContent).toContain('Test User');
  });

  it('should display the userName', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userInfo = compiled.querySelector('.user-info');
    expect(userInfo?.textContent).toContain('testuser');
  });

  it('should display the birth date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userInfo = compiled.querySelector('.user-info');
    expect(userInfo?.textContent).toContain('01/01/2000');
  });

  it('should display the password label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userInfo = compiled.querySelector('.user-info');
    expect(userInfo?.textContent).toContain('Contraseña');
  });

  it('should show avatar placeholder when no avatarUrl', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const svg = compiled.querySelector('.avatar-container svg');
    expect(svg).toBeTruthy();
  });
});
