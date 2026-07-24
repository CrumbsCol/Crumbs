import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';

import { RegistroHeader } from './registro-header';

/**
 * Tests unitarios para RegistroHeader (componente presentacional).
 * Verifica que renderiza el logo y el enlace de volver a login.
 */
describe('RegistroHeader', () => {
  let component: RegistroHeader;
  let fixture: ComponentFixture<RegistroHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el texto "Logo"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.logo');
    expect(logo?.textContent).toContain('Logo');
  });

  it('debería tener un enlace "Volver" que apunta a /login', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a[href="/login"]');
    expect(link).toBeTruthy();
    expect(link?.textContent?.trim()).toContain('Volver');
  });
});
