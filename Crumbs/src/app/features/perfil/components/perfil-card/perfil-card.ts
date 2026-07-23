import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { User } from '../../../../core/interfaces/user.interface';

/**
 * Componente presentacional que muestra la tarjeta de perfil del usuario.
 *
 * Soporta dos modos:
 * - **Visualización** (editMode = false): Muestra los datos como texto.
 * - **Edición** (editMode = true): Muestra inputs editables para modificar los datos.
 *
 * Este componente es presentacional: recibe datos vía input y emite los cambios
 * vía output. No inyecta servicios ni decide cuándo guardar.
 *
 * @example
 * ```html
 * <!-- Modo visualización -->
 * <app-perfil-card [user]="currentUser()!" [editMode]="false" />
 *
 * <!-- Modo edición -->
 * <app-perfil-card [user]="currentUser()!" [editMode]="true" (userChanged)="onSave($event)" />
 * ```
 */
@Component({
  selector: 'app-perfil-card',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './perfil-card.html',
  styleUrl: './perfil-card.css',
})
export class PerfilCard {
  /**
   * Datos del usuario a mostrar/editar en la tarjeta.
   * Es un input requerido: el componente padre debe proporcionarlo.
   */
  readonly user = input.required<User>();

  /**
   * Controla si la tarjeta está en modo edición o visualización.
   * Por defecto es false (solo lectura).
   */
  readonly editMode = input<boolean>(false);

  /**
   * Evento emitido cuando el usuario modifica sus datos en modo edición.
   * El padre decide si guardar o descartar los cambios.
   */
  readonly userChanged = output<Partial<User>>();

  /** Modelo local para binding bidireccional en modo edición */
  editNombre = '';
  editUserName = '';
  editFechaNacimiento = '';
  editPassword = '';

  /**
   * Inicializa los campos editables con los valores actuales del usuario.
   * Se llama desde el padre cuando se activa el modo edición.
   */
  initEditFields(): void {
    const u = this.user();
    this.editNombre = u.nombre;
    this.editUserName = u.userName;
    this.editFechaNacimiento = u.fechaNacimiento;
    this.editPassword = '';
  }

  /**
   * Emite los datos editados al componente padre para que los persista.
   * Solo emite campos que hayan cambiado respecto al original.
   */
  emitChanges(): void {
    const updates: Partial<User> = {};
    const u = this.user();

    if (this.editNombre !== u.nombre) {
      updates.nombre = this.editNombre;
    }
    if (this.editUserName !== u.userName) {
      updates.userName = this.editUserName;
    }
    if (this.editFechaNacimiento !== u.fechaNacimiento) {
      updates.fechaNacimiento = this.editFechaNacimiento;
    }
    // Password se emite solo si se escribió algo nuevo
    // (en futuro se manejaría aparte con endpoint dedicado)

    this.userChanged.emit(updates);
  }
}
