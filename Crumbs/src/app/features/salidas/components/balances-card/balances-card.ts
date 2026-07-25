import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { BalanceMiembro } from '../../../../core/services/salida.service';
import { Pago, Miembro } from '../../../../core/interfaces/salida.interface';

/**
 * Componente que muestra la card de Balances de una salida.
 *
 * Presenta el balance neto por miembro, botones para registrar pagos
 * en deudores, y la lista de pagos registrados con opción de confirmarlos.
 */
@Component({
  selector: 'app-balances-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './balances-card.html',
  styleUrl: './balances-card.css',
})
export class BalancesCard {
  /** Lista de balances netos por miembro */
  readonly balances = input.required<BalanceMiembro[]>();

  /** Lista de pagos registrados */
  readonly pagos = input.required<Pago[]>();

  /** Lista de miembros para resolver nombres */
  readonly miembros = input.required<Miembro[]>();

  /** Evento emitido al registrar un pago */
  readonly registrarPago = output<{ deudorId: string; pagadorId: string; monto: number }>();

  /** Evento emitido al confirmar un pago */
  readonly confirmarPago = output<string>();

  /** Obtiene el nombre de un miembro por su ID */
  getNombreMiembro(id: string): string {
    const miembro = this.miembros().find((m) => m.id === id);
    return miembro?.nombre ?? 'Desconocido';
  }

  /** Emite evento para registrar un pago */
  onRegistrarPago(deudorId: string, pagadorId: string, monto: number): void {
    this.registrarPago.emit({ deudorId, pagadorId, monto });
  }

  /** Emite evento para confirmar un pago */
  onConfirmarPago(pagoId: string): void {
    this.confirmarPago.emit(pagoId);
  }
}
