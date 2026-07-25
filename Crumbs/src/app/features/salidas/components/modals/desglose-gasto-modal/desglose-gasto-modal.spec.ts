import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DesgloseGastoModal, DesgloseGastoModalData } from './desglose-gasto-modal';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Gasto, Miembro } from '../../../../../core/interfaces/salida.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DesgloseGastoModal', () => {
  let component: DesgloseGastoModal;
  let fixture: ComponentFixture<DesgloseGastoModal>;

  const mockUsuarioActual: Miembro = { id: '1', nombre: 'Juan López', userName: 'juanlopez', email: 'juan@test.com', avatarUrl: null };
  const mockMiembro2: Miembro = { id: '2', nombre: 'María García', userName: 'mariagarcia', email: 'maria@test.com', avatarUrl: null };

  const mockGasto: Gasto = {
    id: 'g1', nombre: 'Test', monto: 100, fecha: '2026-07-25', metodoDivision: 'equitativo',
    pagadoPor: mockUsuarioActual,
    miembrosParticipantes: [mockUsuarioActual, mockMiembro2]
  };

  const mockData: DesgloseGastoModalData = {
    gasto: mockGasto,
    usuarioActual: mockUsuarioActual,
    pagos: [],
    participaciones: [
      { miembro: mockUsuarioActual, monto: 50 },
      { miembro: mockMiembro2, monto: 50 }
    ]
  };

  beforeEach(async () => {
    const mockDialogRef = { close: vi.fn() };
    const mockDialog = { open: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [DesgloseGastoModal, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DesgloseGastoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should identify if current user is pagador', () => {
    expect(component.esPagador).toBe(true);
  });
});
