import { Component, input, output, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TableComponent, TableColumn } from '../../../../shared/components/table/table.component';

import { Gasto, Miembro } from '../../../../core/interfaces/salida.interface';

import { CommonModule } from '@angular/common';

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
    CommonModule,
    MatCardModule,
    MatDividerModule,
    TableComponent
  ],
  templateUrl: './gastos-card.html',
  styleUrl: './gastos-card.css',
})
export class GastosCard implements OnInit {
  /** Lista de gastos ordenados cronológicamente */
  gastos = input<Gasto[]>([]);

  /** Usuario actual para determinar si "Yo pagué" */
  usuarioActual = input<Miembro | null>(null);

  /** Evento emitido al hacer clic en un gasto */
  gastoClick = output<Gasto>();

  tableColumns: TableColumn[] = [
    { key: 'info', header: '' },
    { key: 'fecha', header: '', type: 'date', format: 'dd/MM/yyyy HH:mm', align: 'right' }
  ];

  @ViewChild('infoTemplate', { static: true }) infoTemplate!: TemplateRef<unknown>;

  customTemplates: Record<string, TemplateRef<unknown>> = {};

  ngOnInit() {
    this.customTemplates = { 'info': this.infoTemplate };
  }
}
