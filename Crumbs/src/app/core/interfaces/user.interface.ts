/**
 * Interfaz que representa un usuario en la aplicación Crumbs.
 *
 * Define la estructura de datos del perfil de usuario que se consume
 * en los componentes de la aplicación. La contraseña NO se incluye
 * por seguridad; el campo visual en la UI es puramente decorativo.
 *
 * @example
 * ```typescript
 * const user: User = {
 *   nombre: 'Juan López',
 *   userName: 'juanlopez',
 *   fechaNacimiento: '15/03/1995',
 *   email: 'juan@example.com',
 *   avatarUrl: null,
 * };
 * ```
 */
export interface User {
  /** Nombre completo del usuario */
  nombre: string;

  /** Nombre de usuario único (handle) */
  userName: string;

  /** Fecha de nacimiento en formato dd/MM/yyyy */
  fechaNacimiento: string;

  /** Correo electrónico del usuario (opcional) */
  email?: string;

  /**
   * URL del avatar del usuario.
   * Si es null o undefined, se mostrará un placeholder genérico.
   */
  avatarUrl?: string | null;
}
