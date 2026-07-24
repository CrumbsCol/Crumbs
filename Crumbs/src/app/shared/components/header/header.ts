import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente de header compartido para la aplicación Crumbs.
 *
 * Se utiliza dentro del `MainLayout` para que aparezca en todas las
 * páginas que lo requieran (excluye login y registro).
 *
 * Funcionalidades:
 * - Muestra el logo de la aplicación a la izquierda.
 * - Muestra pestañas de navegación a la derecha (Perfil, Salir).
 * - Detecta automáticamente la pestaña activa usando `routerLinkActive`.
 * - Ejecuta logout al hacer clic en "Salir" (limpia token + redirige a /login).
 *
 * @example
 * ```html
 * <app-header />
 * ```
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTabsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  /** Servicio de autenticación para manejar logout */
  private readonly authService = inject(AuthService);

  /**
   * Cierra la sesión del usuario.
   * El AuthService se encarga de:
   * - Eliminar el token de localStorage.
   * - Limpiar el estado del usuario.
   * - Redirigir a /login.
   */
  logout(): void {
    this.authService.logout();
  }
}
