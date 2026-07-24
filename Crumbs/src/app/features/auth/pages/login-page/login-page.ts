import { Component, inject, signal } from '@angular/core';

import { LoginBranding } from '../../components/login-branding/login-branding';
import { LoginForm } from '../../components/login-form/login-form';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/interfaces/auth.interface';

/**
 * Página de inicio de sesión — componente orquestador.
 *
 * Responsabilidades:
 * - Define el layout split (branding izquierdo + formulario derecho).
 * - Ensambla los componentes presentacionales LoginBranding y LoginForm.
 * - Recibe el evento loginSubmit del formulario y ejecuta la autenticación
 *   a través del AuthService.
 * - Muestra mensajes de error si el login falla.
 *
 * Se renderiza fuera del MainLayout (sin header) porque las rutas
 * de autenticación no necesitan el header compartido.
 *
 * Flujo:
 * ```
 * LoginForm emite credenciales → LoginPage.onLogin()
 *   → AuthService.login() → Backend POST /auth/login
 *   → Éxito: redirect a /perfil (automático desde AuthService)
 *   → Error: muestra mensaje en la UI
 * ```
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginBranding, LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  /** Servicio de autenticación para ejecutar el login */
  private readonly authService = inject(AuthService);

  /** Signal que indica si se está procesando el login (para spinners/disabled) */
  readonly isLoading = this.authService.isLoading;

  /** Signal con el mensaje de error a mostrar en la UI (vacío si no hay error) */
  readonly errorMessage = signal<string>('');

  /**
   * Maneja el evento de login emitido por LoginForm.
   * Recibe las credenciales validadas del formulario hijo y las envía
   * al AuthService para autenticar contra el backend.
   *
   * En caso de éxito, AuthService redirige automáticamente a /perfil.
   * En caso de error, se muestra un mensaje en la UI.
   *
   * @param credentials - Email/username y contraseña del formulario.
   */
  onLogin(credentials: { emailOrUsername: string; password: string }): void {
    // Limpiar errores previos antes de intentar login
    this.errorMessage.set('');

    const loginRequest: LoginRequest = {
      emailOrUsername: credentials.emailOrUsername,
      password: credentials.password,
    };

    this.authService.login(loginRequest).subscribe({
      error: (err) => {
        // Mostrar mensaje de error apropiado según el tipo de fallo
        if (err.status === 401) {
          this.errorMessage.set('Credenciales incorrectas. Verifica tu email y contraseña.');
        } else if (err.status === 0) {
          this.errorMessage.set('No se pudo conectar con el servidor. Intenta de nuevo.');
        } else {
          this.errorMessage.set('Ocurrió un error inesperado. Intenta de nuevo más tarde.');
        }
      },
    });
  }
}
