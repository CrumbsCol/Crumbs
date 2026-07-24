# Spec: Arquitectura de Autenticación JWT

## Resumen

Implementar un sistema completo de autenticación basado en JWT (JSON Web Tokens) que conecte
el frontend Angular con el backend API. El sistema debe manejar login, almacenamiento seguro
de tokens, rehidratación de sesión, protección de rutas, e inyección automática de tokens
en las peticiones HTTP.

---

## Requisitos

### Funcionales

1. **Login**: El usuario ingresa credenciales (email/username + password) y el sistema las envía al backend.
2. **Almacenamiento de tokens**: El `accessToken` se guarda en `localStorage` para persistir entre recargas.
3. **Rehidratación de sesión (autoLogin)**: Al cargar la app, si existe un token válido en storage, se obtiene el perfil del usuario desde `/api/me`.
4. **Protección de rutas**: Las rutas dentro del `MainLayout` requieren autenticación (guard).
5. **Inyección de token**: Un interceptor HTTP agrega el header `Authorization: Bearer <token>` a cada petición.
6. **Manejo de 401**: Si el backend responde con 401 Unauthorized, se hace logout y se redirige a `/login`.
7. **Logout**: Limpia tokens del storage, resetea el signal de usuario, y redirige a `/login`.
8. **Perfil**: La página de perfil sigue consumiendo `UserService.currentUser` — ahora alimentado con datos reales.

### No funcionales

- Los datos sensibles del usuario NO se almacenan en localStorage (solo el token).
- El token se puede invalidar desde el backend.
- La app funciona en modo mock (sin backend) cuando `environment.useMocks === true`.

---

## Flujo resumido de autenticación

```
┌─────────────┐     POST /auth/login       ┌──────────┐
│  LoginPage  │ ───────────────────────────▶│ Backend  │
│             │ ◀─── { accessToken, user } ─│          │
└──────┬──────┘                             └──────────┘
       │
       ▼
┌──────────────┐    localStorage.set('access_token')
│  AuthService │───────────────────────────────▶ 💾
│              │    userService.setUser(user)
└──────┬───────┘
       │
       ▼
┌──────────────┐    lee userService.currentUser signal
│  PerfilPage  │ ──── ya funciona como está hoy ────▶ ✅
└──────────────┘
```

### Flujo de rehidratación (autoLogin)

```
┌──────────────┐   token en localStorage?
│  APP_INIT    │──────────────────────────────┐
└──────────────┘                              │
       │ SÍ                                   │ NO
       ▼                                      ▼
┌──────────────┐  GET /api/me             ┌─────────┐
│  AuthService │──────────────────────────│ /login  │
│              │◀── { user }              └─────────┘
│  setUser()   │
└──────────────┘
```

### Flujo de interceptor

```
Petición HTTP cualquiera
       │
       ▼
┌──────────────────┐   ¿Tiene token?
│  authInterceptor │──────────────────┐
└──────────────────┘   SÍ             │ NO
       │                              │
       ▼                              ▼
 Agrega header:                Envía sin header
 Authorization: Bearer <token>
       │
       ▼
 ¿Respuesta 401?
   SÍ → logout() + redirect /login
   NO → continúa normal
```

---

## Diseño técnico

### Archivos a crear/modificar

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `core/services/auth.service.ts` | Crear | Servicio principal de autenticación |
| `core/interceptors/auth.interceptor.ts` | Crear | Interceptor funcional HTTP |
| `core/guards/auth.guard.ts` | Crear | Guard funcional para rutas protegidas |
| `core/interfaces/user.interface.ts` | Modificar | Agregar campo `id` |
| `core/interfaces/auth.interface.ts` | Crear | Interfaces de request/response de auth |
| `core/services/user.service.ts` | Modificar | Agregar método `setUser()` público |
| `app.config.ts` | Modificar | Proveer HttpClient con interceptor |
| `app.routes.ts` | Modificar | Aplicar guard a rutas protegidas |
| `features/auth/pages/login-page/login-page.ts` | Modificar | Conectar con AuthService |

### Interfaces

```typescript
// core/interfaces/auth.interface.ts
export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
```

### AuthService — API pública

```typescript
// Signals expuestos
readonly isAuthenticated: Signal<boolean>;
readonly isLoading: Signal<boolean>;

// Métodos
login(credentials: LoginRequest): Observable<void>;
logout(): void;
autoLogin(): Observable<void>;
getToken(): string | null;
```

### Endpoints del backend

| Método | URL | Body | Response |
|--------|-----|------|----------|
| POST | `{apiUrl}/auth/login` | `LoginRequest` | `LoginResponse` |
| GET | `{apiUrl}/me` | — | `User` |

---

## Tareas de implementación

1. Crear interfaces de auth (`LoginRequest`, `LoginResponse`)
2. Actualizar interfaz `User` con campo `id`
3. Actualizar `UserService` con método `setUser()`
4. Crear `AuthService` con login, logout, autoLogin, getToken
5. Crear `authInterceptor` funcional
6. Crear `authGuard` funcional
7. Actualizar `app.config.ts` con HttpClient + interceptor
8. Conectar `LoginPage` con `AuthService`
9. Aplicar `authGuard` a rutas protegidas
10. Actualizar README con documentación del flujo

---

## Decisiones de diseño

- **localStorage sobre sessionStorage**: Para que la sesión persista al cerrar y abrir el navegador.
- **Signal-based state**: Consistente con el patrón ya establecido en el proyecto.
- **Interceptor funcional**: Usando la API moderna de Angular (`withInterceptors`).
- **Guard funcional**: Usando `CanActivateFn` en vez de class-based guards (deprecados).
- **Mock support**: Cuando `useMocks === true`, el AuthService simula respuestas sin llamar al backend.
