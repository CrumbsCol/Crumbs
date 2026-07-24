import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap, catchError, map, finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

/**
 * Clave usada en localStorage para almacenar el token JWT.
 * Solo se guarda el token — nunca datos personales del usuario.
 */
const TOKEN_KEY = 'access_token';

/**
 * Servicio principal de autenticación de la aplicación Crumbs.
 *
 * Responsabilidades:
 * - Ejecutar el login contra el backend (POST /auth/login).
 * - Almacenar/recuperar el token JWT en localStorage.
 * - Rehidratar la sesión al iniciar la app (autoLogin via GET /api/me).
 * - Exponer signals reactivos para el estado de autenticación.
 * - Manejar el logout (limpiar token + estado + redirigir).
 * - Soportar modo mock cuando `environment.useMocks === true`.
 *
 * Flujo de autenticación:
 * ```
 * LoginPage → AuthService.login() → Backend POST /auth/login
 *           → Almacena token en localStorage
 *           → UserService.setUser(user)
 *           → Navega a /perfil
 * ```
 *
 * @example
 * ```typescript
 * // En LoginPage:
 * private readonly authService = inject(AuthService);
 *
 * onLogin(credentials: LoginRequest): void {
 *   this.authService.login(credentials).subscribe({
 *     error: (err) => this.showError(err)
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Inyección del HttpClient para peticiones al backend */
  private readonly http = inject(HttpClient);

  /** Inyección del Router para redirecciones post-login/logout */
  private readonly router = inject(Router);

  /** Inyección del UserService para gestionar el estado del usuario */
  private readonly userService = inject(UserService);

  /** URL base de la API, tomada de las variables de entorno */
  private readonly apiUrl = environment.apiUrl;

  /**
   * Signal que indica si se está procesando una operación de autenticación.
   * Útil para mostrar spinners o deshabilitar botones en la UI.
   */
  private readonly _isLoading = signal<boolean>(false);

  /** Signal público de solo lectura para el estado de carga */
  readonly isLoading = this._isLoading.asReadonly();

  /**
   * Signal computado que indica si hay un usuario autenticado.
   * Se basa en la existencia de un usuario en el UserService.
   */
  readonly isAuthenticated = computed(() => this.userService.currentUser() !== null);

  // ─── MÉTODOS PÚBLICOS ─────────────────────────────────────────────────

  /**
   * Inicia sesión con las credenciales proporcionadas.
   *
   * En modo mock (`environment.useMocks === true`):
   * - Simula una respuesta exitosa con datos locales.
   * - No realiza ninguna petición HTTP.
   *
   * En modo real:
   * - Envía POST a `{apiUrl}/auth/login` con las credenciales.
   * - Almacena el token recibido en localStorage.
   * - Actualiza el UserService con los datos del usuario.
   * - Navega automáticamente a `/perfil`.
   *
   * @param credentials - Email/username y contraseña del usuario.
   * @returns Observable que completa tras el login exitoso o emite error.
   */
  login(credentials: LoginRequest): Observable<void> {
    this._isLoading.set(true);

    // ─── Modo mock: simula login sin backend ───
    if (environment.useMocks) {
      return of(undefined).pipe(
        tap(() => {
          const mockUser = this.userService.getMockUser();
          this.setToken('mock-jwt-token-for-development');
          this.userService.setUser(mockUser);
          this.router.navigate(['/dashboard']);
        }),
        finalize(() => this._isLoading.set(false))
      );
    }

    // ─── Modo real: petición al backend ───
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          // Almacenar token en localStorage
          this.setToken(response.accessToken);

          // Actualizar el estado del usuario en la app
          this.userService.setUser(response.user);

          // Redirigir al perfil tras login exitoso
          this.router.navigate(['/dashboard']);
        }),
        map(() => undefined),
        finalize(() => this._isLoading.set(false))
      );
  }

  /**
   * Cierra la sesión del usuario actual.
   *
   * Acciones:
   * 1. Elimina el token de localStorage.
   * 2. Limpia el estado del usuario en UserService.
   * 3. Redirige a la página de login.
   */
  logout(): void {
    this.removeToken();
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  /**
   * Intenta rehidratar la sesión al iniciar la aplicación.
   *
   * Si hay un token almacenado en localStorage:
   * - En modo mock: carga datos locales directamente.
   * - En modo real: llama a GET /api/me para obtener los datos del usuario.
   *
   * Si no hay token o la petición falla, no hace nada (el usuario
   * deberá hacer login manualmente).
   *
   * @returns Observable que completa tras intentar la rehidratación.
   */
  autoLogin(): Observable<void> {
    const token = this.getToken();

    // Sin token almacenado — no hay sesión que rehidratar
    if (!token) {
      return of(undefined);
    }

    this._isLoading.set(true);

    // ─── Modo mock: rehidrata con datos locales ───
    if (environment.useMocks) {
      return of(undefined).pipe(
        tap(() => {
          const mockUser = this.userService.getMockUser();
          this.userService.setUser(mockUser);
        }),
        finalize(() => this._isLoading.set(false))
      );
    }

    // ─── Modo real: obtiene el usuario del backend ───
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        this.userService.setUser(user);
      }),
      map(() => undefined),
      catchError(() => {
        // Token inválido o expirado — limpiar sesión
        this.removeToken();
        this.userService.clearUser();
        return of(undefined);
      }),
      finalize(() => this._isLoading.set(false))
    );
  }

  /**
   * Obtiene el token JWT almacenado en localStorage.
   * Retorna `null` si no hay token.
   *
   * Usado internamente por el `authInterceptor` para adjuntar
   * el header Authorization a las peticiones HTTP.
   */
  getToken(): string | null {
    if (typeof localStorage === 'undefined') {
      // SSR: localStorage no existe en el servidor
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  // ─── MÉTODOS PRIVADOS ─────────────────────────────────────────────────

  /**
   * Almacena el token JWT en localStorage.
   * @param token - Token JWT recibido del backend.
   */
  private setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  /**
   * Elimina el token JWT de localStorage.
   */
  private removeToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
}
