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

  // ─── Rutas CON header (dentro del MainLayout) ───────────────────────────────
  {
    // Shell vacío que inyecta el header y el <router-outlet> para las rutas hijas
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
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
          import('./features/dashboard/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        // Formulario para crear una nueva salida (nombre, descripción, fecha/hora, integrantes)
        path: 'salidas/crear',
        loadComponent: () =>
          import('./features/dashboard/components/interfaz/crear-salida/crear-salida.component').then(
            (m) => m.CrearSalidaComponent
          ),
      },
      {
        // Formulario para unirse a una salida existente mediante un código alfanumérico
        path: 'salidas/agregar',
        loadComponent: () =>
          import('./features/dashboard/components/interfaz/agregar-salida/agregar-salida.component').then(
            (m) => m.AgregarSalidaComponent
          ),
      },

      // Redirige la raíz vacía al perfil por defecto
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
    ],
  },
];
