import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { PerfilPage } from './perfil-page';
import { UserService } from '../../../../core/services/user.service';

/**
 * Tests unitarios para el componente PerfilPage.
 * Verifica la creación del componente, la presencia del botón de editar
 * y que la tarjeta de perfil se renderiza con datos del usuario.
 */
describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPage],
      providers: [provideRouter([])],
    }).compileComponents();

    // Configurar usuario antes de crear el componente
    userService = TestBed.inject(UserService);
    userService.setUser({
      id: 'test-1',
      nombre: 'Test User',
      userName: 'testuser',
      fechaNacimiento: '01/01/2000',
      email: 'test@example.com',
      avatarUrl: null,
    });

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the edit button when user is present', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = compiled.querySelector('button[aria-label="Editar perfil"]');
    expect(editButton).toBeTruthy();
  });

  it('should render the perfil card component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-perfil-card')).toBeTruthy();
  });
});
