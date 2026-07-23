import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { UserService } from '../../../core/services/user.service';

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
 * - Ejecuta logout al hacer clic en "Salir".
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
  /** Servicio de usuario para acceder al estado de autenticación */
  private readonly userService = inject(UserService);

  /** Router de Angular para navegación programática */
  private readonly router = inject(Router);

  /**
   * Cierra la sesión del usuario y navega a la página de login.
   * Limpia el estado del usuario y redirige fuera del layout protegido.
   */
  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
