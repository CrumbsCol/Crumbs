# Crumbs — Frontend

SPA para dividir gastos de salidas grupales. Construida con **Angular 21**, **Angular Material 21** (Material Design 3) y **Tailwind CSS 4**.

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Angular | 21.2 | Framework principal |
| Angular Material | 21.2 | Componentes UI (Material Design 3) |
| Tailwind CSS | 4.1 | Layout y utilidades de estilo |
| Vitest | 4.1 | Test runner unitario |
| TypeScript | 5.9 | Lenguaje |
| ESLint | 10.x | Linting |
| Prettier | 3.8 | Formateo de código |

---

## Sistema de Diseño

### Tipografía

- **Inter** (300, 400, 500, 600) — Fuente principal para cuerpo, labels y títulos menores.
- **Pacifico** — Fuente display cursiva para headlines y títulos grandes (`title-large`, `headline-*`).
- Cargadas desde Google Fonts con `preconnect`.

### Paleta de Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#421146` (violeta oscuro) | Color principal, textos destacados |
| `--color-accent` | `#EBA3FF` (lila claro) | Acentos, containers, botones secundarios |
| `--color-surface-glass` | `rgba(255, 255, 255, 0.35)` | Fondos glassmorphism |
| `--color-border-glass` | `rgba(255, 255, 255, 0.4)` | Bordes de superficies glass |

Material 3 configurado con paletas `mat.$magenta-palette` (primary) y `mat.$violet-palette` (tertiary). Color scheme: light.

### Glassmorphism

Todas las tarjetas y superficies principales usan la clase utilitaria `.glass`:

```css
.glass {
  background: var(--color-surface-glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--color-border-glass);
  box-shadow: 0 8px 32px 0 rgba(66, 17, 70, 0.05);
}
```

Fondo global con imagen SVG desenfocada (`blur(4px)`). En pantallas de auth el blur se elimina para apreciar la ilustración.

---

## Arquitectura

### Estructura del Proyecto

```
src/app/
├── core/                          # Servicios globales, interfaces, guards, interceptors
│   ├── interfaces/
│   │   ├── user.interface.ts      # Modelo de usuario
│   │   ├── auth.interface.ts      # LoginRequest, LoginResponse
│   │   ├── salida.interface.ts    # Salida, Gasto, Miembro, Pago
│   │   └── salida-request.interface.ts  # DTOs de request (solo IDs)
│   ├── services/
│   │   ├── auth.service.ts        # Login, registro, autoLogin, JWT
│   │   ├── user.service.ts        # Estado reactivo del usuario (signal)
│   │   └── salida.service.ts      # CRUD salidas, gastos, pagos, balances
│   ├── guards/
│   │   └── auth.guard.ts          # Guard async (espera autoLogin)
│   └── interceptors/
│       ├── auth.interceptor.ts    # Inyecta token JWT + manejo 401
│       └── error.interceptor.ts   # Manejo global de errores HTTP
├── features/
│   ├── auth/                      # Login y registro (sin header)
│   ├── dashboard/                 # Home: salidas activas, crear/unirse
│   ├── salidas/                   # Detalle de salida: gastos, balances, integrantes
│   ├── balance/                   # Balance global detallado
│   └── perfil/                    # Perfil editable del usuario
├── shared/components/             # Componentes reutilizables (header, table, avatar-group)
├── layouts/main-layout/           # Layout con header (rutas protegidas)
├── app.routes.ts                  # Rutas centralizadas (lazy loading)
├── app.ts                         # Componente raíz (autoLogin via afterNextRender)
└── app.config.ts                  # Providers globales
```

### Feature Modules

| Feature | Descripción | Componentes |
|---------|-------------|-------------|
| **auth** | Autenticación | `login-page`, `registro-page`, `login-form`, `registro-form`, `login-branding`, `registro-header` |
| **dashboard** | Panel principal | `dashboard-page`, `welcome-header`, `dashboard-actions`, `active-salidas-list`, modales |
| **salidas** | Detalle de salida | `salida-detalle-page`, `gastos-card`, `balances-card`, `desglose-gastos-card`, drawers (agregar gasto, agregar integrantes, gestión fantasmas), modales |
| **balance** | Balance global | `balance-page` |
| **perfil** | Perfil de usuario | `perfil-page`, `perfil-card` |

---

## Estructura de Componentes

Cada feature sigue el patrón **Pages → Components**:

```
features/<feature>/
├── pages/              ← ORQUESTADORES (1 por ruta)
│   └── <nombre>-page/
│       ├── <nombre>-page.ts
│       ├── <nombre>-page.html
│       ├── <nombre>-page.css
│       └── <nombre>-page.spec.ts
└── components/         ← PRESENTACIONALES (1 responsabilidad cada uno)
    └── <nombre>/
        ├── <nombre>.ts
        ├── <nombre>.html
        ├── <nombre>.css
        └── <nombre>.spec.ts
```

**Pages (orquestadores):** Inyectan servicios, manejan estado, ensamblan componentes hijos.

**Components (presentacionales):** Reciben datos vía `input()`, emiten eventos vía `output()`. No inyectan servicios.

**Shared:** Componentes genéricos usados en múltiples features (`header`, `table`, `avatar-group`).

---

## Servicios

Todos los servicios están en `core/services/` y usan `HttpClient` para comunicarse con el backend.

### AuthService

- Login (`POST /auth/login`) y registro (`POST /auth/register`)
- Almacena JWT en `localStorage`
- Auto-login al recargar (`GET /api/me`)
- Expone signals reactivos del estado de autenticación
- Logout: limpia token + estado + redirige a `/login`

### UserService

- Mantiene el estado del usuario actual via signals (`currentUser`)
- `setUser()`, `updateUser()`, `clearUser()`
- Alimentado por `AuthService` tras login/autoLogin

### SalidaService

- CRUD completo de salidas (`GET/POST /api/salidas`)
- Crear y unirse a salidas por código de invitación
- Gestión de gastos (`POST /api/salidas/:id/gastos`)
- Registro y confirmación de pagos
- Balance detallado (`GET /api/balance-detallado`)
- Gestión de fantasmas (miembros sin cuenta)
- Estado reactivo con signals (lista de salidas, salida actual, balances)

---

## Routing

Archivo único: `app.routes.ts`. Todas las rutas usan **lazy loading** con `loadComponent()`.

```
/ (raíz)
├── /login              ← Pública, sin header
├── /registro           ← Pública, sin header
└── / (MainLayout)      ← Protegida por authGuard, con header
    ├── /dashboard      ← Redirige aquí por defecto
    ├── /perfil
    ├── /balance
    └── /salidas/:id
```

**Estrategia de layout:**
- Rutas de autenticación (login, registro) se renderizan sin el `MainLayout` — no muestran header.
- Rutas protegidas son hijas de `MainLayout`, que inyecta el header y `<router-outlet>`.
- `authGuard` es async: espera a que `autoLogin` complete antes de decidir.

---

## Setup Local

### Prerequisitos

- Node.js 22+
- Backend corriendo en `localhost:8000` (ver `Back/README.md`)

### Instalar y ejecutar

```bash
cd Crumbs
npm install
npm start
# → http://localhost:4200
```

El frontend se conecta al backend en `http://localhost:8000/api`. No usa mocks.

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo en `localhost:4200` (SSR desactivado) |
| `npm run build` | Build de producción (output en `dist/Crumbs/browser/`) |
| `npm test` | Tests unitarios con Vitest |
| `npm run lint` | Linting con ESLint |
| `npm run watch` | Build en modo watch (desarrollo) |

---

## Configuración de Environments

### Desarrollo (`src/environments/environment.development.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  useMocks: false,
};
```

### Producción (`src/environments/environment.ts`)

```typescript
export const environment = {
  production: true,
  apiUrl: '/api',
  useMocks: false,
};
```

En producción, la `apiUrl` es relativa porque Nginx sirve la SPA y hace proxy de `/api` al backend.

---

## Convenciones Clave

### Componentes

- **Standalone only** — sin NgModules.
- **4 archivos por componente:** `.ts`, `.html`, `.css`, `.spec.ts`.
- Generar con: `ng g c features/<feature>/components/<nombre>`.

### Estado Reactivo

- **Signals** en vez de BehaviorSubject/Observable para estado local y de servicios.
- `input()` y `output()` signal-based para comunicación padre/hijo.

### Formularios

- **ReactiveFormsModule** exclusivamente (no template-driven forms).
- Componentes Material con `appearance="outline"`.
- Montos como enteros positivos con `Validators.pattern(/^\d+$/)`.
- Mensajes de error con `<mat-error>` y bloques `@if`.

### Estilos

- **Tailwind CSS** para layout y spacing.
- **Variables CSS de Material** (`--mat-sys-primary`, etc.) para colores.
- **CSS del componente** para estilos específicos.
- Responsive: breakpoint mobile en `max-width: 767px`.

### Idioma

- **Código** (variables, clases): Inglés.
- **Comentarios, JSDoc, tests**: Español.
- Tests nombrados con `'debería...'`.

### DTOs de Request

Las interfaces en `salida-request.interface.ts` definen payloads limpios: solo IDs y datos mínimos, sin objetos anidados.

---

## Producción y Docker

- Angular se compila como SPA estática (`npm run build`).
- El output `dist/Crumbs/browser/` se copia a `Back/nginx/dist/` para construir la imagen Nginx.
- Nginx sirve los archivos estáticos y hace proxy de `/api` al container del backend.
- SSR está desactivado en desarrollo; los paquetes de SSR están instalados pero el deploy usa modo SPA.

```bash
# Build y copiar para Docker
npm run build
cp -r dist/Crumbs/browser/ ../Back/nginx/dist/
```
