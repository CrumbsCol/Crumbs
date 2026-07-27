import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';

import { SalidaDetallePage } from './salida-detalle-page';

describe('SalidaDetallePage', () => {
  let component: SalidaDetallePage;
  let fixture: ComponentFixture<SalidaDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaDetallePage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalidaDetallePage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener signals inicializados', () => {
    expect(component.salida()).toBeNull();
    expect(component.gastos()).toEqual([]);
    expect(component.miembros()).toEqual([]);
  });

  it('debería tener drawers cerrados por defecto', () => {
    expect(component.drawerGastoAbierto()).toBe(false);
    expect(component.drawerIntegrantesAbierto()).toBe(false);
    expect(component.drawerFantasmasAbierto()).toBe(false);
  });

  it('debería abrir y cerrar el drawer de gasto', () => {
    component.abrirDrawerGasto();
    expect(component.drawerGastoAbierto()).toBe(true);
    component.cerrarDrawerGasto();
    expect(component.drawerGastoAbierto()).toBe(false);
  });

  it('debería abrir y cerrar el drawer de integrantes', () => {
    component.abrirDrawerIntegrantes();
    expect(component.drawerIntegrantesAbierto()).toBe(true);
    component.cerrarDrawerIntegrantes();
    expect(component.drawerIntegrantesAbierto()).toBe(false);
  });

  it('debería retornar Desconocido para miembro no existente', () => {
    expect(component.getNombreMiembro('999')).toBe('Desconocido');
  });
});
