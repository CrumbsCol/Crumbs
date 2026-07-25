import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PagoInfoModal, PagoInfoModalData } from './pago-info-modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Pago } from '../../../../../core/interfaces/salida.interface';

describe('PagoInfoModal', () => {
  let component: PagoInfoModal;
  let fixture: ComponentFixture<PagoInfoModal>;

  const mockPago: Pago = {
    id: 'p1',
    deudorId: '2',
    pagadorId: '1',
    monto: 150,
    estado: 'pagado',
    fecha: '2026-07-21T10:00:00',
    gastoId: 'g1'
  };

  const mockData: PagoInfoModalData = {
    pago: mockPago
  };

  beforeEach(async () => {
    const dialogRefMock = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [PagoInfoModal, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoInfoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the payment amount', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('150');
  });
});
