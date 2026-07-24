import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Interceptor funcional de autenticación HTTP.
 *
 * Responsabilidades:
 * 1. Adjunta el header `Authorization: Bearer <token>` a cada petición saliente
 *    si existe un token JWT almacenado en localStorage.
 * 2. Intercepta respuestas con código 401 (Unauthorized) y ejecuta logout
 *    automático, redirigiendo al usuario a la página de login.
 *
 * Se registra en `app.config.ts` usando `provideHttpClient(withInterceptors([authInterceptor]))`.
 *
 * Flujo:
 * ```
 * Petición HTTP → ¿Hay token? → SÍ: agrega header Authorization
 *                              → NO: envía sin header
 *       ↓
 * Respuesta ← ¿Es 401? → SÍ: logout() + redirect /login
 *                        → NO: pasa la respuesta al consumidor
 * ```
 *
 * @example
 * ```typescript
 * // En app.config.ts:
 * provideHttpClient(withInterceptors([authInterceptor]))
 * ```
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectar AuthService para acceder al token y al método logout
  const authService = inject(AuthService);

  // Obtener el token actual de localStorage
  const token = authService.getToken();

  // Si hay token, clonar la petición y agregar el header Authorization
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  // Enviar la petición (con o sin token) y manejar errores de respuesta
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el backend responde 401, el token es inválido o expiró
      // → Ejecutar logout para limpiar estado y redirigir a login
      if (error.status === 401) {
        authService.logout();
      }

      // Re-emitir el error para que el consumidor pueda manejarlo también
      return throwError(() => error);
    })
  );
};
