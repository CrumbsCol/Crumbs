import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ------------------------------------------------------------------ //
  // Req 5.1 — standalone: true
  // ------------------------------------------------------------------ //
  it('Req 5.1 — DashboardComponent is declared with standalone: true', () => {
    // Angular stores component metadata on the class
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = (DashboardComponent as any)['ɵcmp'];
    expect(metadata).toBeTruthy();
    expect(metadata.standalone).toBe(true);
  });

  // ------------------------------------------------------------------ //
  // Req 1.2 — nickName Signal initialized
  // ------------------------------------------------------------------ //
  it('Req 1.2 — nickName is a Signal (callable) with default value "Viajero"', () => {
    // A Signal is a function
    expect(typeof component.nickName).toBe('function');
    expect(component.nickName()).toBe('Viajero');
  });

  // ------------------------------------------------------------------ //
  // Req 2.1–2.3 — Grid container classes
  // ------------------------------------------------------------------ //
  it('Req 2.1–2.3 — grid container has classes grid-cols-1, md:grid-cols-2 and gap-6', () => {
    const gridEl: HTMLElement = fixture.nativeElement.querySelector('.grid');
    expect(gridEl).not.toBeNull();
    expect(gridEl.classList.contains('grid-cols-1')).toBe(true);
    expect(gridEl.classList.contains('md:grid-cols-2')).toBe(true);
    expect(gridEl.classList.contains('gap-6')).toBe(true);
  });

  // ------------------------------------------------------------------ //
  // Req 3.1 — Exactly two buttons with correct labels
  // ------------------------------------------------------------------ //
  it('Req 3.1 — renders exactly two buttons: "Crear Salida" and "Agregar Salida"', () => {
    const buttons: NodeListOf<HTMLButtonElement> =
      fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    const labels = Array.from(buttons).map((b) => b.textContent?.trim());
    expect(labels).toContain('Crear Salida');
    expect(labels).toContain('Agregar Salida');
  });

  // ------------------------------------------------------------------ //
  // Req 3.2 — Buttons carry the mat-flat-button attribute
  // ------------------------------------------------------------------ //
  it('Req 3.2 — both action buttons have the mat-flat-button attribute', () => {
    const buttons: NodeListOf<HTMLButtonElement> =
      fixture.nativeElement.querySelectorAll('button[mat-flat-button]');
    expect(buttons.length).toBe(2);
  });

  // ------------------------------------------------------------------ //
  // Req 4.1 — Card title h2
  // ------------------------------------------------------------------ //
  it('Req 4.1 — card contains <h2> with text "Mis Salidas Activas"', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2).not.toBeNull();
    expect(h2.textContent?.trim()).toBe('Mis Salidas Activas');
  });

  // ------------------------------------------------------------------ //
  // Req 4.6 / 5.8 — Empty list shows p[role="status"]
  // ------------------------------------------------------------------ //
  it('Req 4.6 / 5.8 — empty list shows <p role="status"> with non-empty text', () => {
    component.salidasActivas.set([]);
    fixture.detectChanges();

    const statusEl: HTMLElement | null =
      fixture.nativeElement.querySelector('p[role="status"]');
    expect(statusEl).not.toBeNull();
    expect(statusEl!.textContent?.trim().length).toBeGreaterThan(0);
  });

  // ------------------------------------------------------------------ //
  // Req 5.5 — No header, nav or session-button elements
  // ------------------------------------------------------------------ //
  it('Req 5.5 — template contains no <header>, <nav> or session button elements', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('header')).toBeNull();
    expect(el.querySelector('nav')).toBeNull();
    // Session buttons would typically have text like Login/Logout/Sign in/Sign out
    const sessionButtonTexts = ['login', 'logout', 'sign in', 'sign out', 'cerrar sesión', 'iniciar sesión'];
    const buttons: HTMLButtonElement[] = Array.from(el.querySelectorAll('button'));
    buttons.forEach((btn) => {
      const text = (btn.textContent ?? '').toLowerCase().trim();
      sessionButtonTexts.forEach((sessionText) => {
        expect(text).not.toContain(sessionText);
      });
    });
  });

  // ------------------------------------------------------------------ //
  // Req 5.6 — No errors on init (no window/document access throws)
  // ------------------------------------------------------------------ //
  it('Req 5.6 — component initializes without errors in jsdom environment', () => {
    // If the component accessed window/document unsafely it would throw during
    // TestBed.createComponent / fixture.detectChanges above.
    // Reaching this point means no such errors occurred.
    expect(component).toBeTruthy();
  });

  // ------------------------------------------------------------------ //
  // Task 4.2 — Property 1: welcomeTitle es una función pura del nickName
  // ------------------------------------------------------------------ //
  it('Property 1: welcomeTitle es una función pura del nickName — Validates: Requirements 1.1, 1.3, 1.4', () => {
    // Feature: dashboard-view, Property 1: welcomeTitle es una función pura del nickName
    fc.assert(
      fc.property(fc.string(), (name) => {
        component.nickName.set(name);
        expect(component.welcomeTitle()).toBe(`¡Hola, ${name}!`);
      }),
      { numRuns: 100 },
    );
  });
});
