import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Gasto, Miembro, Pago } from '../../../../../core/interfaces/salida.interface';
import { RegistrarPagoModal } from '../registrar-pago-modal/registrar-pago-modal';
import { PagoInfoModal } from '../pago-info-modal/pago-info-modal';

/**
 * Datos requeridos por el modal de desglose de gasto.
 */
export interface DesgloseGastoModalData {
  gasto: Gasto;
  usuarioActual: Miembro;
  pagos: Pago[];
  participaciones: { miembro: Miembro; monto: number }[];
}

/**
 * Modal que muestra el desglose de participantes de un gasto específico.
 * 
 * Si el usuario no fue el pagador del gasto, le muestra su monto a pagar y 
 * la opción de registrar un pago.
 * Si el usuario fue el pagador, le muestra quiénes le deben y el estado de sus pagos.
 */

@Component({
  selector: 'app-desglose-gasto-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './desglose-gasto-modal.html',
  styleUrl: './desglose-gasto-modal.css',
})
export class DesgloseGastoModal {
  readonly dialogRef = inject(MatDialogRef<DesgloseGastoModal>);
  readonly data = inject<DesgloseGastoModalData>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);

  /** Retorna verdadero si el usuario actual es quien pagó el gasto */
  get esPagador(): boolean {
    return this.data.gasto.pagadoPor?.id === this.data.usuarioActual?.id;
  }

  /** Retorna el monto que le toca pagar al usuario actual */
  get miParticipacion(): number {
    if (!this.data.usuarioActual) return 0;
    return this.data.participaciones.find(p => p.miembro?.id === this.data.usuarioActual.id)?.monto || 0;
  }

  /** Retorna verdadero si el usuario actual ya tiene un pago registrado para este gasto */
  get yaPague(): boolean {
    if (!this.data.usuarioActual) return false;
    // Buscar pago específico o general
    return this.data.pagos.some(p => 
      p.deudorId === this.data.usuarioActual.id && 
      p.pagadorId === this.data.gasto.pagadoPor?.id && 
      (p.gastoId === this.data.gasto.id || (!p.gastoId && p.estado === 'pagado'))
    );
  }

  /** Obtiene el pago registrado de un miembro específico hacia el pagador original */
  getPago(miembroId: string): Pago | undefined {
    // Primero buscar pago específico para este gasto
    const pagoEspecifico = this.data.pagos.find(
      p => p.deudorId === miembroId && p.pagadorId === this.data.gasto.pagadoPor?.id && p.gastoId === this.data.gasto.id
    );
    if (pagoEspecifico) return pagoEspecifico;
    
    // Si no hay pago específico, buscar pago general (sin gastoId) que cubra la deuda
    return this.data.pagos.find(
      p => p.deudorId === miembroId && p.pagadorId === this.data.gasto.pagadoPor?.id && !p.gastoId && p.estado === 'pagado'
    );
  }

  /** Retorna verdadero si el miembro específico ya registró un pago */
  haPagado(miembroId: string): boolean {
    return !!this.getPago(miembroId);
  }

  /** 
   * Abre el modal de Registrar Pago para saldar la deuda actual.
   * Si se confirma, cierra este modal y pasa la información al componente padre.
   */
  abrirRegistrarPago(): void {
    const dialogRef = this.dialog.open(RegistrarPagoModal, {
      width: '400px',
      data: {
        deudor: this.data.usuarioActual,
        pagador: this.data.gasto.pagadoPor,
        monto: this.miParticipacion,
        gastoId: this.data.gasto.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ action: 'registrar_pago', payload: result });
      }
    });
  }

  /**
   * Abre un pequeño modal con la información de un pago registrado por otro miembro.
   * Útil para que el pagador revise fechas y estados.
   */
  verInfoPago(miembroId: string): void {
    const pago = this.getPago(miembroId);
    if (!pago) return;

    this.dialog.open(PagoInfoModal, {
      width: '350px',
      data: { pago }
    });
  }
}
