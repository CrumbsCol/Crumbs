import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { DesgloseGasto } from '../../../../core/services/salida.service';

/**
 * Componente que muestra la card de Desglose por Gasto de una salida.
 *
 * Por cada gasto, muestra quién pagó y cuánto le corresponde
 * a cada participante (chips con nombre y monto).
 */
@Component({
  selector: 'app-desglose-gastos-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './desglose-gastos-card.html',
  styleUrl: './desglose-gastos-card.css',
})
export class DesgloseGastosCard {
  /** Lista de desgloses por gasto */
  readonly desgloseGastos = input.required<DesgloseGasto[]>();
}
