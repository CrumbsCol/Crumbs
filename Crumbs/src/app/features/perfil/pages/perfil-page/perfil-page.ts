import { Component, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user.interface';
import { PerfilCard } from '../../components/perfil-card/perfil-card';
import { environment } from '../../../../../environments/environment';

/**
 * Página principal del perfil de usuario.
 *
 * Este componente actúa como orquestador: inyecta el `UserService`
 * para obtener los datos del usuario y los pasa al componente
 * presentacional `PerfilCard`. Gestiona el toggle entre modo
 * visualización y modo edición.
 *
 * Flujo de edición:
 * 1. Usuario presiona el botón de editar (lápiz).
 * 2. Se activa `editMode` y se inicializan los campos editables en PerfilCard.
 * 3. El usuario modifica los datos en los inputs.
 * 4. Al presionar "Guardar", se invoca emitChanges() en PerfilCard → emite userChanged → onSave().
 * 5. Al presionar "Cancelar", se descarta todo y se vuelve a modo vista.
 *
 * @example
 * ```typescript
 * // En app.routes.ts:
 * { path: 'perfil', loadComponent: () => import('./features/perfil/pages/perfil-page/perfil-page').then(m => m.PerfilPage) }
 * ```
 */
@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [PerfilCard, MatButtonModule, MatIconModule],
  templateUrl: './perfil-page.html',
  styleUrl: './perfil-page.css',
})
export class PerfilPage {
  /** Servicio de usuario para acceder y actualizar los datos del perfil */
  private readonly userService = inject(UserService);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /** Signal con los datos del usuario actual (null si no hay sesión) */
  readonly currentUser = this.userService.currentUser;

  /** Controla si la tarjeta está en modo edición */
  readonly editMode = signal(false);

  /** Referencia al componente hijo PerfilCard para invocar sus métodos */
  protected readonly perfilCard = viewChild(PerfilCard);

  /**
   * Activa el modo edición.
   * Los campos editables se inicializan automáticamente en PerfilCard
   * mediante un effect que observa el cambio de editMode.
   */
  onEdit(): void {
    this.editMode.set(true);
  }

  /**
   * Invoca emitChanges() en el PerfilCard hijo para emitir los datos editados.
   * Esto dispara el evento (userChanged) que llama a onSave().
   */
  saveFromCard(): void {
    this.perfilCard()?.emitChanges();
  }

  /**
   * Cancela la edición y vuelve al modo visualización.
   * Los cambios no guardados se descartan.
   */
  onCancel(): void {
    this.editMode.set(false);
  }

  /**
   * Guarda los cambios emitidos por PerfilCard en el backend.
   * Desactiva el modo edición tras guardar exitosamente.
   *
   * @param updates - Campos parciales modificados por el usuario.
   */
  onSave(updates: Partial<User>): void {
    if (Object.keys(updates).length === 0) {
      this.editMode.set(false);
      return;
    }

    this.http.patch<User>(`${this.apiUrl}/me`, updates).subscribe({
      next: (updatedUser) => {
        this.userService.setUser(updatedUser as User);
        this.editMode.set(false);
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        // TODO: Mostrar error en UI
      },
    });
  }
}
