import { Component, ContentChildren, Directive, Input, QueryList, TemplateRef, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface TableColumn {
  key: string;
  header: string;
  type?: 'text' | 'date' | 'currency' | 'custom';
  format?: string; // Ej: 'dd/MM/yyyy HH:mm' para fechas o 'MXN' para monedas
}

@Directive({
  selector: '[appTableColumnDef]',
  standalone: true
})
export class TableColumnDefDirective {
  @Input('appTableColumnDef') columnName!: string;
  template = inject<TemplateRef<unknown>>(TemplateRef);
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
  rowClick = output<T>();

  @ContentChildren(TableColumnDefDirective)
  customColumnDefs!: QueryList<TableColumnDefDirective>;

  displayedColumns = computed(() => this.columns().map(c => c.key));

  getCustomTemplate(columnKey: string): TemplateRef<unknown> | null {
    if (!this.customColumnDefs) return null;
    const dir = this.customColumnDefs.find(d => d.columnName === columnKey);
    return dir ? dir.template : null;
  }
}
