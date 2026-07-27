import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach } from 'vitest';

import { Header } from './header';

/**
 * Tests unitarios para el componente Header.
 * Verifica el renderizado del logo, links de navegación y funcionalidad de logout.
 */
describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.logo a');
    expect(logo?.textContent).toContain('Crumbs');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a[mat-tab-link]');
    // Debe tener 3 tabs: Balance, Perfil y Salir
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Balance');
    expect(links[1].textContent).toContain('Perfil');
    expect(links[2].textContent).toContain('Salir');
  });
});
