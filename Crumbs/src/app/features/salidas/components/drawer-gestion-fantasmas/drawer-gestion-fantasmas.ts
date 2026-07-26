import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FantasmaResumen } from '../../../../core/services/salida.service';

/**
 * Evento emitido al saldar la deuda de un fantasma.
 */
export interface SaldarDeudaEvent {
  fantasmaMiembroId: string;
  monto: number;
}

@Component({
  selector: 'app-drawer-gestion-fantasmas',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './drawer-gestion-fantasmas.html',
  styleUrl: './drawer-gestion-fantasmas.css',
})
export class DrawerGestionFantasmas {
  readonly abierto = input<boolean>(false);
  readonly fantasmas = input<FantasmaResumen[]>([]);
  readonly cerrar = output<void>();
  readonly confirmarPago = output<string>(); // emite pagoId
  readonly saldarDeuda = output<SaldarDeudaEvent>(); // emite cuando el fantasma paga su deuda

  onCerrar(): void {
    this.cerrar.emit();
  }

  onConfirmarPago(pagoId: string): void {
    this.confirmarPago.emit(pagoId);
  }

  /**
   * Registra que el fantasma pagó su deuda completa.
   * El creador confirma en nombre del fantasma.
   */
  onSaldarDeuda(fantasmaMiembroId: string, monto: number): void {
    this.saldarDeuda.emit({ fantasmaMiembroId, monto });
  }
}
