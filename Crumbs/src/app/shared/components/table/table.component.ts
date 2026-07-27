import { Component, TemplateRef, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface TableColumn {
  key: string;
  header: string;
  type?: 'text' | 'date' | 'currency' | 'custom';
  format?: string; // Ej: 'dd/MM/yyyy HH:mm' para fechas o 'MXN' para monedas
  align?: 'left' | 'center' | 'right'; // Para alineación de la columna
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> {
  data = input.required<T[]>();
  columns = input.required<TableColumn[]>();
  showHeaders = input<boolean>(true);
  customTemplates = input<Record<string, TemplateRef<unknown>>>({});
  rowClick = output<T>();

  displayedColumns = computed(() => this.columns().map(c => c.key));

  constructor() {
    effect(() => {
      console.log('[TableComponent] Columns:', this.columns());
      console.log('[TableComponent] Custom Templates:', this.customTemplates());
    });
  }
}
