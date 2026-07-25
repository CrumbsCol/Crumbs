import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor global para capturar errores HTTP.
 * 
 * Este interceptor atrapa las respuestas de error del backend (status >= 400)
 * y muestra un mensaje amigable al usuario utilizando MatSnackBar.
 * Además, deja pasar el error para que los componentes puedan manejar
 * lógicas específicas si lo necesitan.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        if (error.status === 401) {
          errorMessage = 'Sesión expirada o credenciales inválidas.';
        } else if (error.status === 403) {
          errorMessage = 'No tienes permisos para realizar esta acción.';
        } else if (error.status >= 500) {
          errorMessage = 'Error en el servidor. Estamos trabajando para solucionarlo.';
        } else if (error.error && typeof error.error.message === 'string') {
          // Error estructurado desde el backend
          errorMessage = error.error.message;
        }
      }

      snackBar.open(errorMessage, 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });

      return throwError(() => error);
    })
  );
};
