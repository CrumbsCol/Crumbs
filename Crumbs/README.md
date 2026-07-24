# Crumbs

Aplicación web construida con **Angular 21**, **Angular Material 21** (M3), **Tailwind CSS 4**, y soporte para **SSR** (Server-Side Rendering).

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Angular | 21.2 | Framework principal |
| Angular Material | 21.2 | Componentes UI (Material Design 3) |
| Tailwind CSS | 4.1 | Utilidades de estilo y layout |
| Vitest | 4.1 | Test runner unitario |
| Express | 5.x | Servidor SSR |
| TypeScript | 5.9 | Lenguaje |

---

## Estructura del Proyecto

```
src/app/
├── core/                          # Servicios, interfaces, guards, interceptors
│   ├── interfaces/
│   │   ├── user.interface.ts      # Modelo de datos del usuario
│   │   └── auth.interface.ts      # Interfaces de autenticación (LoginRequest, LoginResponse)
│   ├── services/
│   │   ├── user.service.ts        # Servicio de estado del usuario (signal)
│   │   └── auth.service.ts        # Servicio de autenticación (JWT)
│   ├── guards/
│   │   └── auth.guard.ts          # Guard funcional para rutas protegidas
│   └── interceptors/
│       └── auth.interceptor.ts    # Interceptor HTTP (token + manejo 401)
├── shared/                        # Componentes reutilizables entre features
│   └── components/
│       └── header/                # Header con navegación por tabs
├── features/                      # Módulos de funcionalidad (lazy loaded)
│   ├── perfil/
│   │   ├── components/            # Componentes presentacionales del feature
│   │   │   └── perfil-card/       # Tarjeta de datos del usuario
│   │   └── pages/                 # Páginas (orquestradores)
│   │       └── perfil-page/       # Página principal de perfil
│   ├── auth/                      # Login y registro
│   │   ├── components/
│   │   │   └── login-form/        # Formulario de login con validaciones
│   │   └── pages/
│   │       ├── login-page/        # Página de login (orquestador)
│   │       └── registro-page/     # Página de registro
│   ├── dashboard/                 # (futuro) Panel principal
│   └── salidas/                   # (futuro) Gestión de salidas
├── layouts/                       # Layouts de ruta (wrappers de página)
│   └── main-layout/              # Layout con header (para páginas autenticadas)
├── app.routes.ts                  # Configuración centralizada de rutas
├── app.ts                         # Componente raíz
└── app.config.ts                  # Providers de la aplicación
```

---

## Convenciones

### Estructura de Componentes

Cada componente se compone de **4 archivos**:

- `.ts` — Clase del componente (lógica)
- `.html` — Template
- `.css` — Estilos (Tailwind + Material)
- `.spec.ts` — Tests unitarios (Vitest)

### Patrones de Diseño

- **Componentes presentacionales** (`components/`): Reciben datos vía `input()`, no inyectan servicios. Fáciles de testear.
- **Páginas** (`pages/`): Inyectan servicios, orquestan componentes, se registran en rutas.
- **Layout route**: El `MainLayout` envuelve las páginas que necesitan header. Las rutas de auth quedan fuera.
- **Signals**: Se usan signals de Angular para estado reactivo (en vez de BehaviorSubject/Observable).
- **Standalone**: Todos los componentes son standalone (sin NgModules).

### Rutas

Todas las rutas se definen exclusivamente en `src/app/app.routes.ts`. Se usa lazy loading con `loadComponent`.

---

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start
# → http://localhost:4200

# Build de producción
npm run build

# Ejecutar tests unitarios (Vitest)
npm test

# Servir build SSR
npm run serve:ssr:Crumbs
```

---

## Página de Perfil

La página de perfil muestra los datos del usuario actual:

- **Header**: Logo + tabs de navegación (Perfil / Salir). Se detecta la tab activa automáticamente vía `routerLinkActive`.
- **PerfilCard**: Componente presentacional que muestra avatar, nombre, userName, fecha de nacimiento y contraseña enmascarada.
- **Datos mock**: Actualmente se usan datos hardcodeados en el `UserService`. Diseñado para migración transparente a un backend real.

---

## Autenticación (JWT)

El sistema de autenticación utiliza **JSON Web Tokens (JWT)** para manejar sesiones de usuario. El token se almacena en `localStorage` y se inyecta automáticamente en cada petición HTTP mediante un interceptor.

### Flujo resumido de autenticación

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

### Rehidratación de sesión (autoLogin)

Al iniciar la aplicación, si existe un token en `localStorage`, el `AuthService` llama a `GET /api/me` para obtener los datos del usuario y rehidratar la sesión sin necesidad de re-login.

```
┌──────────────┐   ¿Token en localStorage?
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

### Arquitectura de archivos

```
src/app/core/
├── interfaces/
│   ├── user.interface.ts        # Modelo de usuario (incluye id)
│   └── auth.interface.ts        # LoginRequest, LoginResponse
├── services/
│   ├── user.service.ts          # Estado del usuario (signal)
│   └── auth.service.ts          # Login, logout, autoLogin, getToken
├── guards/
│   └── auth.guard.ts            # CanActivateFn — protege rutas
└── interceptors/
    └── auth.interceptor.ts      # Inyecta token + maneja 401
```

### Endpoints del backend

| Método | URL | Body | Response |
|--------|-----|------|----------|
| POST | `{apiUrl}/auth/login` | `{ emailOrUsername, password }` | `{ accessToken, user }` |
| GET | `{apiUrl}/me` | — | `User` |

### Modo mock

Cuando `environment.useMocks === true` (desarrollo), el `AuthService` simula las respuestas del backend con datos locales sin hacer peticiones HTTP reales.

### Decisiones de diseño

- **localStorage** para persistir la sesión entre recargas y cierres del navegador.
- **Solo el token** se guarda en storage (no datos personales del usuario).
- **Signals** para estado reactivo, consistente con el patrón del proyecto.
- **Interceptor y guard funcionales** (API moderna de Angular, no class-based).
- Los componentes de perfil **no cambian** — siguen leyendo el mismo signal `currentUser()`.
---

## Tema Visual

El tema de Material 3 usa la paleta **magenta** como color primario y **violet** como terciario. El color scheme por defecto es `light`. Configurado en `src/material-theme.scss`.
