import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

/**
 * Configuración global de providers de la aplicación Crumbs.
 *
 * Providers registrados:
 * - Router con lazy loading de rutas.
 * - HttpClient con interceptor de autenticación (agrega JWT a cada request).
 * - Client hydration para SSR con event replay.
 * - NativeDateAdapter para que MatDatepicker funcione en toda la app.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideClientHydration(withEventReplay()),
    provideNativeDateAdapter(),
  ],
};
