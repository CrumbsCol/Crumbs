/**
 * Interfaces relacionadas con la autenticación de la aplicación Crumbs.
 *
 * Define los contratos de comunicación entre el frontend y el backend
 * para las operaciones de login y respuesta de autenticación.
 */

import { User } from './user.interface';

/**
 * Payload que se envía al backend para iniciar sesión.
 *
 * @example
 * ```typescript
 * const request: LoginRequest = {
 *   emailOrUsername: 'juan@example.com',
 *   password: 'MiPassword123!'
 * };
 * ```
 */
export interface LoginRequest {
  /** Email o nombre de usuario del usuario */
  emailOrUsername: string;

  /** Contraseña del usuario (se envía en texto plano sobre HTTPS) */
  password: string;
}

/**
 * Respuesta del backend tras un login exitoso.
 *
 * Contiene el token de acceso JWT y los datos básicos del usuario autenticado.
 *
 * @example
 * ```typescript
 * // Respuesta esperada del POST /auth/login
 * const response: LoginResponse = {
 *   accessToken: 'eyJhbGciOiJIUzI1NiIs...',
 *   user: { id: '1', nombre: 'Juan López', userName: 'juanlopez', ... }
 * };
 * ```
 */
export interface LoginResponse {
  /** Token JWT de acceso para autenticar peticiones subsecuentes */
  accessToken: string;

  /** Datos del usuario autenticado */
  user: User;
}
