import { Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

// Modelo de datos para cada salida que aparece en la lista
export interface Salida {
  id: number;
  label: string;
  description: string;
  fecha?: string;
}

/**
 * Componente visual (Dumb Component) que renderiza la lista de salidas activas.
 * 
 * Recibe la lista de salidas y un estado booleano `isEmpty` para mostrar
 * ya sea la lista renderizada o un mensaje de estado vacío.
 * Aplica estilos especiales a la primera salida (activa) de la lista.
 */
@Component({
  selector: 'app-active-salidas-list',
  standalone: true,
  imports: [MatListModule, MatRippleModule],
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
}
