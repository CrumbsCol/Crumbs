import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RegistrarPagoModal, RegistrarPagoModalData } from './registrar-pago-modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Miembro } from '../../../../../core/interfaces/salida.interface';

describe('RegistrarPagoModal', () => {
  let component: RegistrarPagoModal;
  let fixture: ComponentFixture<RegistrarPagoModal>;
  let dialogRefMock: { close: ReturnType<typeof vi.fn> };

  const mockDeudor: Miembro = { id: '1', nombre: 'Juan López', userName: 'juanlopez', email: 'juan@test.com', avatarUrl: null };
  const mockPagador: Miembro = { id: '2', nombre: 'María García', userName: 'mariagarcia', email: 'maria@test.com', avatarUrl: null };

  const mockData: RegistrarPagoModalData = {
    deudor: mockDeudor,
    pagador: mockPagador,
    monto: 150,
    gastoId: 'g1'
  };

  beforeEach(async () => {
    dialogRefMock = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [RegistrarPagoModal, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarPagoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with payment data when confirmed', () => {
    component.confirmar();
    expect(dialogRefMock.close).toHaveBeenCalledWith({
      deudorId: '1',
      pagadorId: '2',
      monto: 150,
      gastoId: 'g1'
    });
  });
});
