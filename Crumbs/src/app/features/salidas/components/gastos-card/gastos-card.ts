import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TableComponent, TableColumn, TableColumnDefDirective } from '../../../../shared/components/table/table.component';

import { Gasto, Miembro } from '../../../../core/interfaces/salida.interface';

/**
 * Componente que muestra la card de Gastos de una salida.
 *
 * Presenta la lista de gastos registrados con su monto y fecha,
 * ordenados cronológicamente (más reciente primero) usando la tabla compartida.
 */
@Component({
  selector: 'app-gastos-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    TableComponent,
    TableColumnDefDirective
  ],
  templateUrl: './gastos-card.html',
  styleUrl: './gastos-card.css',
})
export class GastosCard {
  /** Lista de gastos ordenados cronológicamente */
  readonly gastos = input.required<Gasto[]>();

  /** Usuario actual para determinar si "Yo pagué" */
  readonly usuarioActual = input<Miembro | null>(null);

  /** Evento emitido al hacer clic en un gasto */
  readonly gastoClick = output<Gasto>();

  /** Configuración de las columnas para la tabla de gastos */
  tableColumns: TableColumn[] = [
    { key: 'nombre', header: 'Concepto' },
    { key: 'monto', header: 'Monto', type: 'currency', format: 'MXN' },
    { key: 'fecha', header: 'Fecha', type: 'date', format: 'dd/MM/yyyy HH:mm' }
  ];
}
