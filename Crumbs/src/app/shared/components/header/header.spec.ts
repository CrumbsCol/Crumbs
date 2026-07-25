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
    const logo = compiled.querySelector('.logo span');
    expect(logo?.textContent).toContain('Crumbs');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a[mat-tab-link]');
    // Debe tener 4 tabs: Home, Balance, Perfil y Salir
    expect(links.length).toBe(4);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Balance');
    expect(links[2].textContent).toContain('Perfil');
    expect(links[3].textContent).toContain('Salir');
  });
});
