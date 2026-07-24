import { Component } from '@angular/core';

import { LoginBranding } from '../../components/login-branding/login-branding';
import { LoginForm } from '../../components/login-form/login-form';

/**
 * Página de inicio de sesión — componente orquestador.
 *
 * Responsabilidades:
 * - Define el layout split (branding izquierdo + formulario derecho).
 * - Ensambla los componentes presentacionales LoginBranding y LoginForm.
 * - Recibe el evento loginSubmit del formulario y ejecuta la acción de login.
 *
 * Se renderiza fuera del MainLayout (sin header) porque las rutas
 * de autenticación no necesitan el header compartido.
 *
 * Futuro: inyectar AuthService y redirigir al dashboard tras login exitoso.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginBranding, LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  /**
   * Maneja el evento de login emitido por LoginForm.
   * Recibe las credenciales validadas del formulario hijo.
   * Por ahora solo loguea en consola — en futuro llamará a AuthService.login().
   */
  onLogin(credentials: { emailOrUsername: string; password: string }): void {
    console.log('Login:', credentials);
  }
}
