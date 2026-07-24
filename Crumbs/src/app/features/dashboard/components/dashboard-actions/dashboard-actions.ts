import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente visual (Dumb Component) que muestra los botones de acción principales.
 * 
 * Permite al usuario "Crear Salida" o "Agregar Salida" y emite eventos hacia el componente padre
 * (Smart Component) para que este maneje la lógica de navegación o apertura de modales.
 */
@Component({
  selector: 'app-dashboard-actions',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="actions-column flex flex-col gap-4" role="group" aria-label="Acciones principales">
      <!-- Botón primario: abre el formulario para crear una nueva salida -->
      <button
        mat-flat-button
        class="action-btn"
        aria-label="Crear una nueva salida"
        (click)="crearSalida.emit()"
      >
        Crear Salida
      </button>

      <!-- Botón secundario (outlined): abre el formulario para unirse a una salida existente por código -->
      <button
        mat-flat-button
        class="action-btn action-btn--secondary"
        aria-label="Agregar una salida existente"
        (click)="agregarSalida.emit()"
      >
        Agregar Salida
      </button>
    </div>
  `,
  styleUrl: './dashboard-actions.css'
})
export class DashboardActionsComponent {
  /** Evento emitido cuando el usuario hace clic en "Crear Salida" */
  crearSalida = output<void>();
  /** Evento emitido cuando el usuario hace clic en "Agregar Salida" */
  agregarSalida = output<void>();
}
