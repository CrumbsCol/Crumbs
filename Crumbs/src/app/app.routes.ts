import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

/**
 * Configuración centralizada de rutas de la aplicación Crumbs.
 *
 * Estrategia de layout:
 * - Las rutas que requieren header se agrupan como hijas del `MainLayout`.
 * - Las rutas de autenticación (login, registro) se definen fuera del layout,
 *   por lo que NO muestran el header.
 *
 * Protección de rutas:
 * - Las rutas dentro del MainLayout están protegidas por `authGuard`.
 * - Si el usuario no está autenticado, se redirige a `/login`.
 * - Las rutas de auth (login, registro) son públicas.
 *
 * Lazy loading:
 * - Tanto el layout como las páginas se cargan con `loadComponent`
 *   para optimizar el bundle inicial.
 */
export const routes: Routes = [
  // ─── Rutas SIN header (autenticación) — públicas ────────────────────

  // ─── Rutas SIN header (autenticación) ───────────────────────────────────────
  {
    // Pantalla de inicio de sesión — no usa el MainLayout
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

  // ─── Rutas CON header (dentro del MainLayout) — protegidas ──────────
  // ─── Rutas CON header (dentro del MainLayout) ───────────────────────────────
  {
    // Shell vacío que inyecta el header y el <router-outlet> para las rutas hijas
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        // Perfil del usuario
        path: 'perfil',
        loadComponent: () =>
          import('./features/perfil/pages/perfil-page/perfil-page').then(
            (m) => m.PerfilPage
          ),
      },
      {
        // Panel principal: saludo, acciones rápidas y lista de salidas activas
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-page/dashboard-page').then(
            (m) => m.DashboardPage
          ),
      },

      // Redirige la raíz vacía al perfil por defecto
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
