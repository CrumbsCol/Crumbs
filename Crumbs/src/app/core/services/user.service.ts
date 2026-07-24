import { Injectable, signal } from '@angular/core';

import { User } from '../interfaces/user.interface';

/**
 * Datos mock del usuario para desarrollo.
 * Se usan cuando `environment.useMocks === true`.
 */
const MOCK_USER: User = {
  id: 'mock-user-001',
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
 * El `AuthService` alimenta este servicio con datos reales tras el login.
 * Los componentes consumidores (como PerfilPage) leen el signal `currentUser`
 * sin necesidad de conocer la fuente de los datos.
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
  private readonly _currentUser = signal<User | null>(null);

  /**
   * Signal de solo lectura con los datos del usuario actual.
   * Retorna `null` si no hay usuario autenticado.
   */
  readonly currentUser = this._currentUser.asReadonly();

  /**
   * Establece el usuario actual tras una autenticación exitosa.
   * Llamado por `AuthService` después del login o autoLogin.
   *
   * @param user - Datos completos del usuario autenticado.
   */
  setUser(user: User): void {
    this._currentUser.set(user);
  }

  /**
   * Actualiza los datos del perfil del usuario actual.
   * Merge parcial: solo actualiza los campos proporcionados.
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
   * Limpia el estado del usuario actual (logout).
   * El signal vuelve a `null`, indicando que no hay sesión activa.
   */
  clearUser(): void {
    this._currentUser.set(null);
  }

  /**
   * Retorna los datos mock del usuario para modo desarrollo.
   * Usado internamente por `AuthService` cuando `environment.useMocks === true`.
   */
  getMockUser(): User {
    return { ...MOCK_USER };
  }
}
