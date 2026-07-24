import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

/**
 * Guard funcional de autenticación para proteger rutas.
 *
 * Verifica si el usuario está autenticado consultando el signal
 * `isAuthenticated` del `AuthService`. Si no hay sesión activa,
 * redirige al usuario a la página de login.
 *
 * Se aplica a las rutas hijas del `MainLayout` en `app.routes.ts`
 * para proteger páginas como perfil, dashboard, salidas, etc.
 *
 * Flujo:
 * ```
 * Usuario navega a /perfil
 *       │
 *       ▼
 * ┌─────────────┐   ¿isAuthenticated()?
 * │  authGuard  │──────────────────────────┐
 * └─────────────┘   SÍ → permite acceso   │ NO
 *                                          ▼
 *                                    redirect /login
 * ```
 *
 * @example
 * ```typescript
 * // En app.routes.ts:
 * {
 *   path: '',
 *   loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
 *   canActivate: [authGuard],
 *   children: [...]
 * }
 * ```
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si hay un usuario autenticado en el estado de la app
  if (authService.isAuthenticated()) {
    return true;
  }

  // No hay sesión activa — redirigir a login
  return router.createUrlTree(['/login']);
};
