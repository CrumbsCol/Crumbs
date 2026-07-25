import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { BalancePage } from './balance-page';
import { SalidaService } from '../../../../core/services/salida.service';
import { signal } from '@angular/core';

describe('BalancePage', () => {
  let component: BalancePage;
  let fixture: ComponentFixture<BalancePage>;

  beforeEach(async () => {
    // Mock for SalidaService
    const mockSalidaService = {
      balanceGlobal: signal({ totalAdelantado: 500, totalCorrespondiente: 300, balanceNeto: 200, debo: 0, meDeben: 200 })
    };

    await TestBed.configureTestingModule({
      imports: [BalancePage],
      providers: [
        { provide: SalidaService, useValue: mockSalidaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the balance global amounts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Check if the mock amounts are rendered
    expect(compiled.textContent).toContain('200'); // me deben
    expect(compiled.textContent).toContain('0'); // debo
  });
});
