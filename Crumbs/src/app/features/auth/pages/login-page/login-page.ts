import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

/**
 * Página de inicio de sesión (placeholder).
 *
 * Actualmente muestra una interfaz básica de login sin funcionalidad real.
 * Se renderiza fuera del MainLayout, por lo que NO muestra el header.
 *
 * Cuando se integre autenticación real, este componente deberá:
 * - Incluir un formulario reactivo con email/usuario y contraseña.
 * - Validar credenciales contra el backend.
 * - Redirigir al perfil o dashboard tras login exitoso.
 * - Mostrar errores de autenticación.
 *
 * @example
 * ```typescript
 * // En app.routes.ts:
 * { path: 'login', loadComponent: () => import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage) }
 * ```
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
