import { Component, input, output, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn } from '../../../../shared/components/table/table.component';

// Modelo de datos para cada salida que aparece en la lista
export interface Salida {
  id: string;
  label: string;
  description: string;
  fecha?: string;
}

/**
 * Componente visual (Dumb Component) que renderiza la lista de salidas activas
 * usando el componente tabla genérico.
 */
@Component({
  selector: 'app-active-salidas-list',
  standalone: true,
  imports: [TableComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './active-salidas-list.html',
  styleUrl: './active-salidas-list.css'
})
export class ActiveSalidasListComponent implements OnInit {
  /** 
   * Arreglo de salidas a mostrar en la lista. 
   * Es un input requerido (Signal Input).
   */
  salidas = input.required<Salida[]>();
  
  /** 
   * Indica si la lista está vacía o no. Controla la vista de 'estado vacío'.
   * Es un input requerido (Signal Input).
   */
  isEmpty = input.required<boolean>();

  salidaClick = output<Salida>();

  /** Evento emitido al hacer clic en el botón '+' para agregar con código */
  agregarSalida = output<void>();

  @ViewChild('infoTemplate', { static: true }) infoTemplate!: TemplateRef<unknown>;

  customTemplates: Record<string, TemplateRef<unknown>> = {};

  ngOnInit() {
    this.customTemplates = { 'info': this.infoTemplate };
  }

  /** Configuración de columnas para la tabla */
  tableColumns: TableColumn[] = [
    { key: 'info', header: '' },
    { key: 'fecha', header: '', type: 'date', format: 'dd/MM/yyyy', align: 'right' }
  ];
}
