import { Component, input, output } from '@angular/core';
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
  imports: [TableComponent],
  templateUrl: './active-salidas-list.html',
  styleUrl: './active-salidas-list.css'
})
export class ActiveSalidasListComponent {
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

  /** Evento emitido al hacer clic en una salida. Envía la salida seleccionada. */
  salidaClick = output<Salida>();

  /** Configuración de columnas para la tabla */
  tableColumns: TableColumn[] = [
    { key: 'label', header: 'Salida', type: 'text' },
    { key: 'description', header: 'Descripción', type: 'text' },
    { key: 'fecha', header: 'Fecha', type: 'text' }
  ];
}
