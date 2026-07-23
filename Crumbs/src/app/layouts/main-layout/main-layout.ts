import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../shared/components/header/header';

/**
 * Layout principal de la aplicación.
 *
 * Este componente envuelve las páginas que requieren el header de navegación.
 * Se usa como ruta padre (layout route) en `app.routes.ts`.
 * Las rutas hijas se renderizan dentro del `<router-outlet>` de este layout.
 *
 * Páginas que usan este layout: Perfil, Dashboard, Salidas, etc.
 * Páginas que NO usan este layout: Login, Registro (rutas de auth).
 *
 * @example
 * ```typescript
 * // En app.routes.ts:
 * {
 *   path: '',
 *   loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
 *   children: [
 *     { path: 'perfil', loadComponent: () => ... },
 *   ],
 * }
 * ```
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
