import { Injectable, signal } from '@angular/core';

import { User } from '../interfaces/user.interface';

/**
 * Datos mock del usuario para desarrollo.
 * En producción, estos datos se obtendrán desde una API de autenticación.
 */
const MOCK_USER: User = {
  nombre: 'Juan López',
  userName: 'juanlopez',
  fechaNacimiento: '15/03/1995',
  email: 'juan@example.com',
  avatarUrl: null,
};

/**
 * Servicio de gestión del usuario actual de la aplicación.
 *
 * Utiliza signals de Angular para mantener un estado reactivo del usuario.
 * Actualmente provee datos mock, pero está diseñado para que en el futuro
 * se reemplace por llamadas HTTP sin modificar los componentes consumidores.
 *
 * @example
 * ```typescript
 * // En un componente:
 * private readonly userService = inject(UserService);
 * readonly user = this.userService.currentUser;
 *
 * // En el template:
 * // {{ user()?.nombre }}
 * ```
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Signal privado que almacena el usuario actual */
  private readonly _currentUser = signal<User | null>(MOCK_USER);

  /**
   * Signal de solo lectura con los datos del usuario actual.
   * Retorna `null` si no hay usuario autenticado.
   */
  readonly currentUser = this._currentUser.asReadonly();

  /**
   * Actualiza los datos del perfil del usuario actual.
   * Merge parcial: solo actualiza los campos proporcionados.
   *
   * En el futuro, este método hará un PUT/PATCH al backend.
   *
   * @param updates - Campos parciales a actualizar del usuario.
   */
  updateUser(updates: Partial<User>): void {
    const current = this._currentUser();
    if (current) {
      this._currentUser.set({ ...current, ...updates });
    }
  }

  /**
   * Cierra la sesión del usuario actual.
   * Limpia el estado del signal a null.
   *
   * En el futuro, este método también deberá:
   * - Invalidar el token de autenticación
   * - Limpiar almacenamiento local
   * - Notificar al backend
   */
  logout(): void {
    this._currentUser.set(null);
  }
}
