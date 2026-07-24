import { Component } from '@angular/core';

/**
 * Página principal del dashboard.
 *
 * Se muestra tras el login exitoso. Actúa como landing page
 * de la aplicación para usuarios autenticados.
 *
 * TODO: Implementar contenido del dashboard (resumen de actividad,
 * salidas próximas, notificaciones, etc.)
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {}
