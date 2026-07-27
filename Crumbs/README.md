# Crumbs — Frontend

Aplicación web para dividir gastos de salidas grupales. Construida con **Angular 21**, **Angular Material 21** (M3), **Tailwind CSS 4**.

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Angular | 21.2 | Framework principal |
| Angular Material | 21.2 | Componentes UI (Material Design 3) |
| Tailwind CSS | 4.1 | Utilidades de estilo y layout |
| Vitest | 4.1 | Test runner unitario |
| TypeScript | 5.9 | Lenguaje |

---

## Setup Rápido

### Prerequisitos
- Node.js 22+
- Backend corriendo en `localhost:8000` (ver `Back/README.md`)

### Levantar en desarrollo

```bash
npm install
npm start
# → http://localhost:4200
```

El frontend se conecta al backend en `http://localhost:8000/api`. NO usa mocks.

### Build de producción

```bash
npm run build
# Output en dist/Crumbs/browser/
# Este build se copia al container Nginx para producción
```

---

## Arquitectura

### Estructura del Proyecto

```
src/app/
├── core/                          # Servicios, interfaces, guards, interceptors
│   ├── interfaces/
│   │   ├── user.interface.ts      # Modelo de usuario (nombre + apellido)
│   │   ├── auth.interface.ts      # LoginRequest, LoginResponse
│   │   ├── salida.interface.ts    # Salida, Gasto, Miembro, Pago
│   │   └── salida-request.interface.ts  # DTOs de request (solo IDs)
│   ├── services/
│   │   ├── user.service.ts        # Estado del usuario (signal)
│   │   ├── auth.service.ts        # Login, registro, autoLogin, JWT
│   │   └── salida.service.ts      # CRUD salidas, gastos, pagos (HTTP real)
│   ├── guards/
│   │   └── auth.guard.ts          # Guard async (espera autoLogin)
│   └── interceptors/
│       ├── auth.interceptor.ts    # Inyecta token + manejo 401
│       └── error.interceptor.ts   # Manejo global de errores HTTP
├── features/
│   ├── auth/                      # Login y registro
│   ├── dashboard/                 # Home: salidas activas, crear/unirse
│   ├── salidas/                   # Detalle de salida: gastos, balances, integrantes, fantasmas
│   ├── perfil/                    # Perfil editable (nombre, apellido, userName)
│   └── balance/                   # Balance global detallado por persona/salida
├── shared/components/             # Header con navegación
├── layouts/main-layout/           # Layout con header (rutas protegidas)
├── app.routes.ts                  # Rutas centralizadas (lazy loading)
├── app.ts                         # Componente raíz (autoLogin via afterNextRender)
└── app.config.ts                  # Providers globales
```

### Patrones de Diseño

- **Componentes presentacionales** (`components/`): Reciben datos vía `input()`, emiten eventos vía `output()`.
- **Páginas** (`pages/`): Inyectan servicios, orquestan componentes.
- **Signals**: Estado reactivo en vez de BehaviorSubject/Observable.
- **Standalone**: Todos los componentes sin NgModules.
- **DTOs de Request**: Las interfaces en `salida-request.interface.ts` definen payloads limpios (solo IDs, sin objetos anidados).
- **HTTP real**: `SalidaService` usa `HttpClient` para todas las operaciones contra el backend.

### SSR

- **Producción**: SSR habilitado (`outputMode: server` en angular.json production config)
- **Desarrollo**: SSR desactivado (`ssr: false` en angular.json development config) para evitar problemas con localStorage y peticiones HTTP

---

## Funcionalidades Implementadas

| Feature | Descripción |
|---------|-------------|
| Autenticación | Registro (nombre, apellido, email, userName, password) + Login + persistencia de sesión |
| Perfil | Ver y editar datos del usuario (persiste en backend) |
| Dashboard | Listar salidas, crear nueva, unirse por código |
| Salidas | Detalle con integrantes, gastos, pagos |
| Gastos | Registrar con división equitativa/manual, invitados |
| Pagos | Registrar pago + confirmar recepción |
| Balances | Balance global detallado (por persona y salida) |
| Fantasmas | Gestión de integrantes sin cuenta (solo creador) |
| Búsqueda | Buscar usuarios por userName o email |
| Miembros frecuentes | Sugerencias de personas con salidas compartidas |

---

## Autenticación

- JWT almacenado en `localStorage`
- Auto-login al recargar página (via `afterNextRender` en `app.ts`)
- Guard async que espera a que autoLogin complete antes de decidir
- Interceptor inyecta token en cada request y hace logout en 401 (excepto /me)

---

## Conexión con Backend

```
Desarrollo:  http://localhost:8000/api  (environment.development.ts)
Producción:  /api                       (environment.ts — relativa, Nginx hace proxy)
```

---

## Comandos

```bash
npm install          # Instalar dependencias
npm start            # Dev server en :4200
npm run build        # Build producción
npm test             # Tests unitarios (Vitest)
```

---

## Tema Visual

Material 3 con paleta **magenta** (primario) y **violet** (terciario). Color scheme: light.
Configurado en `src/material-theme.scss`.
