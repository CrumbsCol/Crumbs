import { Routes } from '@angular/router';

/**
 * Configuración centralizada de rutas de la aplicación Crumbs.
 *
 * Estrategia de layout:
 * - Las rutas que requieren header se agrupan como hijas del `MainLayout`.
 * - Las rutas de autenticación (login, registro) se definen fuera del layout,
 *   por lo que NO muestran el header.
 *
 * Lazy loading:
 * - Tanto el layout como las páginas se cargan con `loadComponent`
 *   para optimizar el bundle inicial.
 */
export const routes: Routes = [
  // ─── Rutas SIN header (autenticación) ───────────────────────────────
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then(
        (m) => m.LoginPage
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./features/auth/pages/registro-page/registro-page').then(
        (m) => m.RegistroPage
      ),
  },

  // ─── Rutas CON header (dentro del MainLayout) ───────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/perfil/pages/perfil-page/perfil-page').then(
            (m) => m.PerfilPage
          ),
      },
      // Futuras rutas con header:
      // { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/...').then(m => m.DashboardPage) },
      // { path: 'salidas', loadComponent: () => import('./features/salidas/pages/...').then(m => m.SalidasPage) },

      // Redirect por defecto hacia perfil
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
    ],
  },
];
