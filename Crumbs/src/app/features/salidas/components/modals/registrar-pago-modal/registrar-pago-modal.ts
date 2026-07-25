import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Miembro } from '../../../../../core/interfaces/salida.interface';

/**
 * Datos requeridos por el modal de registrar pago.
 */
export interface RegistrarPagoModalData {
  deudor: Miembro;
  pagador: Miembro;
  monto: number;
  gastoId: string;
}

/**
 * Modal que permite a un usuario registrar un pago hacia otro miembro.
 * 
 * Muestra el nombre del acreedor, el monto, y opcionalmente los datos de la 
 * cuenta bancaria o método de pago del acreedor para facilitar la transferencia.
 */

@Component({
  selector: 'app-registrar-pago-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatDividerModule],
  templateUrl: './registrar-pago-modal.html',
  styleUrl: './registrar-pago-modal.css',
})
export class RegistrarPagoModal {
  readonly dialogRef = inject(MatDialogRef<RegistrarPagoModal>);
  readonly data = inject<RegistrarPagoModalData>(MAT_DIALOG_DATA);

  /**
   * Cierra el modal y retorna el payload del pago para que 
   * el componente padre lo envíe al servicio.
   */
  confirmar(): void {
    this.dialogRef.close({
      deudorId: this.data.deudor.id,
      pagadorId: this.data.pagador.id,
      monto: this.data.monto,
      gastoId: this.data.gastoId
    });
  }
}
