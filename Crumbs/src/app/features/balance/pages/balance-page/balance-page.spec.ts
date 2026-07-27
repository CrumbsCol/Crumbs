import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach } from 'vitest';
import { signal } from '@angular/core';
import { BalancePage } from './balance-page';
import { SalidaService } from '../../../../core/services/salida.service';

describe('BalancePage', () => {
  let component: BalancePage;
  let fixture: ComponentFixture<BalancePage>;

  const mockBalanceDetallado = signal({
    totalMeDeben: 200,
    totalDebo: 50,
    balanceNeto: 150,
    creditos: [{ persona: 'Juan', monto: 200, salida: 'Cine', salidaId: '1' }],
    deudas: [{ persona: 'Maria', monto: 50, salida: 'Cena', salidaId: '2' }],
  });

  beforeEach(async () => {
    const mockSalidaService = {
      balanceDetallado: mockBalanceDetallado.asReadonly(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      cargarBalanceDetallado: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [BalancePage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: SalidaService, useValue: mockSalidaService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have balanceDetallado signal', () => {
    expect(component.balanceDetallado()).toBeTruthy();
    expect(component.balanceDetallado()?.totalMeDeben).toBe(200);
    expect(component.balanceDetallado()?.totalDebo).toBe(50);
    expect(component.balanceDetallado()?.balanceNeto).toBe(150);
  });
});
