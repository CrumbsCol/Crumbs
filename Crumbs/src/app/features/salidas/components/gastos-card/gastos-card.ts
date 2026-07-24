import { Component, input } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { Gasto } from '../../../../core/interfaces/salida.interface';

/**
 * Componente que muestra la card de Gastos de una salida.
 *
 * Presenta la lista de gastos registrados con su monto y fecha,
 * ordenados cronológicamente (más reciente primero).
 */
@Component({
  selector: 'app-gastos-card',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './gastos-card.html',
  styleUrl: './gastos-card.css',
})
export class GastosCard {
  /** Lista de gastos ordenados cronológicamente */
  readonly gastos = input.required<Gasto[]>();
}
