import { Component, input, output, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Gasto, Miembro } from '../../../../core/interfaces/salida.interface';
import { TableComponent, TableColumn } from '../../../../shared/components/table/table.component';

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
    CurrencyPipe,
    MatCardModule,
    TableComponent,
  ],
  templateUrl: './gastos-card.html',
  styleUrl: './gastos-card.css',
})
export class GastosCard implements OnInit {
  /** Lista de gastos ordenados cronológicamente */
  readonly gastos = input.required<Gasto[]>();

  /** Usuario actual para determinar si "Yo pagué" */
  readonly usuarioActual = input<Miembro | null>(null);

  /** Evento emitido al hacer clic en un gasto */
  readonly gastoClick = output<Gasto>();

  @ViewChild('infoTemplate', { static: true }) infoTemplate!: TemplateRef<unknown>;

  customTemplates: Record<string, TemplateRef<unknown>> = {};

  ngOnInit() {
    this.customTemplates = { 'info': this.infoTemplate };
  }

  /** Configuración de columnas para la tabla */
  tableColumns: TableColumn[] = [
    { key: 'info', header: '' },
  ];
}
