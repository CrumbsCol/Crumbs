import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Pago } from '../../../../../core/interfaces/salida.interface';

export interface PagoInfoModalData {
  pago: Pago;
}

@Component({
  selector: 'app-pago-info-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './pago-info-modal.html',
  styleUrl: './pago-info-modal.css',
})
export class PagoInfoModal {
  readonly dialogRef = inject(MatDialogRef<PagoInfoModal>);
  readonly data = inject<PagoInfoModalData>(MAT_DIALOG_DATA);
}
