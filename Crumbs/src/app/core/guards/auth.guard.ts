import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Guard funcional de autenticación para proteger rutas.
 *
 * - En SSR: siempre permite acceso (no hay localStorage, no importa)
 * - En Browser: espera a que autoLogin complete, luego verifica isAuthenticated
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // En SSR, siempre permitir (no tiene sentido bloquear pre-render)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Si ya está inicializado, verificar inmediatamente
  if (authService.initialized()) {
    if (authService.isAuthenticated()) {
      return true;
    }
    return router.createUrlTree(['/login']);
  }

  // Si no está inicializado, esperar a que complete autoLogin
  return toObservable(authService.initialized).pipe(
    filter((initialized) => initialized === true),
    take(1),
    map(() => {
      if (authService.isAuthenticated()) {
        return true;
      }
      return router.createUrlTree(['/login']);
    }),
  );
};
