import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Miembro } from '../../../core/interfaces/salida.interface';

/**
 * Componente genérico para mostrar un grupo de avatares solapados.
 *
 * Muestra las iniciales de los miembros con un límite opcional.
 */
@Component({
  selector: 'app-avatar-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-group.html',
  styleUrl: './avatar-group.css',
})
export class AvatarGroupComponent {
  /** Lista de miembros a mostrar en el grupo de avatares */
  readonly miembros = input.required<Miembro[]>();

  /** Límite máximo de avatares a mostrar antes de truncar */
  readonly limite = input<number>(5);

  /** Retorna los miembros truncados según el límite */
  get miembrosVisibles(): Miembro[] {
    return this.miembros().slice(0, this.limite());
  }

  /** Retorna el número de miembros extra que no se muestran */
  get miembrosExtra(): number {
    const total = this.miembros().length;
    return total > this.limite() ? total - this.limite() : 0;
  }
}
