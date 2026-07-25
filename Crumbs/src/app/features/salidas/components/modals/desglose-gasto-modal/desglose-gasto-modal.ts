import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Gasto, Miembro, Pago } from '../../../../../core/interfaces/salida.interface';
import { RegistrarPagoModal } from '../registrar-pago-modal/registrar-pago-modal';
import { PagoInfoModal } from '../pago-info-modal/pago-info-modal';

export interface DesgloseGastoModalData {
  gasto: Gasto;
  usuarioActual: Miembro;
  pagos: Pago[];
  participaciones: { miembro: Miembro; monto: number }[];
}

@Component({
  selector: 'app-desglose-gasto-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './desglose-gasto-modal.html',
  styleUrl: './desglose-gasto-modal.css',
})
export class DesgloseGastoModal {
  readonly dialogRef = inject(MatDialogRef<DesgloseGastoModal>);
  readonly data = inject<DesgloseGastoModalData>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);

  get esPagador(): boolean {
    return this.data.gasto.pagadoPor.id === this.data.usuarioActual.id;
  }

  get miParticipacion(): number {
    return this.data.participaciones.find(p => p.miembro.id === this.data.usuarioActual.id)?.monto || 0;
  }

  get yaPague(): boolean {
    return this.data.pagos.some(p => p.deudorId === this.data.usuarioActual.id && p.pagadorId === this.data.gasto.pagadoPor.id && p.gastoId === this.data.gasto.id);
  }

  getPago(miembroId: string): Pago | undefined {
    return this.data.pagos.find(p => p.deudorId === miembroId && p.pagadorId === this.data.gasto.pagadoPor.id && p.gastoId === this.data.gasto.id);
  }

  haPagado(miembroId: string): boolean {
    return !!this.getPago(miembroId);
  }

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

  verInfoPago(miembroId: string): void {
    const pago = this.getPago(miembroId);
    if (!pago) return;

    this.dialog.open(PagoInfoModal, {
      width: '350px',
      data: { pago }
    });
  }
}
