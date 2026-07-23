import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { PerfilPage } from './perfil-page';

/**
 * Tests unitarios para el componente PerfilPage.
 * Verifica la creación del componente, la presencia del botón de editar
 * y que la tarjeta de perfil se renderiza con datos del usuario.
 */
describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a current user from the service', () => {
    // El UserService devuelve MOCK_USER por defecto
    expect(component.currentUser()).toBeTruthy();
    expect(component.currentUser()?.nombre).toBe('Juan López');
  });

  it('should render the edit button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = compiled.querySelector('button[aria-label="Editar perfil"]');
    expect(editButton).toBeTruthy();
  });

  it('should render the perfil-card component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const perfilCard = compiled.querySelector('app-perfil-card');
    expect(perfilCard).toBeTruthy();
  });
});
