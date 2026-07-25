import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Miembro } from '../../../../../core/interfaces/salida.interface';

export interface RegistrarPagoModalData {
  deudor: Miembro;
  pagador: Miembro;
  monto: number;
  gastoId: string;
}

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

  confirmar(): void {
    // Return data to be processed by SalidaService
    this.dialogRef.close({
      deudorId: this.data.deudor.id,
      pagadorId: this.data.pagador.id,
      monto: this.data.monto,
      gastoId: this.data.gastoId
    });
  }
}
