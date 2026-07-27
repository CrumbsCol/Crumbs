# Convenciones del Proyecto Crumbs

## Stack Tecnológico

- **Framework:** Angular 21.2 (standalone components, signals)
- **UI Library:** Angular Material 21.2 (M3 theme, paleta magenta/violet)
- **Styling:** Tailwind CSS 4.1 + glassmorphism design system
- **Fonts:** Inter (UI body/labels) + Pacifico (display/headings)
- **Build:** Vite + Angular CLI
- **Testing:** Vitest
- **Formatting:** Prettier + ESLint
- **HTTP:** Servicios reales contra backend (NO mocks) — `useMocks: false` en todos los environments

---

## Design System — Glassmorphism

### Tokens de diseño (styles.css)

```css
:root {
  --color-primary: #421146;           /* Violeta Oscuro */
  --color-accent: #EBA3FF;            /* Lila Claro */
  --color-surface-glass: rgba(255, 255, 255, 0.35);
  --color-border-glass: rgba(255, 255, 255, 0.4);
}
```

### Clase utilitaria `.glass`

Aplicar a tarjetas, contenedores y paneles principales:

```css
.glass {
  background: var(--color-surface-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border-glass);
  box-shadow: 0 8px 32px 0 rgba(66, 17, 70, 0.05);
}
```

### Background
- Body tiene fondo SVG con blur(4px) via pseudo-elemento `::before`
- Páginas de auth (`body.is-auth`) eliminan el blur para mostrar la imagen completa
- El contenido de la app flota sobre el fondo con efecto glassmorphism

### Tipografía
- **Inter** — font-sans: body text, labels, botones, formularios
- **Pacifico** — font-display: branding (logo "Crumbs"), títulos grandes
- Material typography tokens override: body usa Inter, headlines/titles usan Pacifico
- Fonts cargadas via Google Fonts CDN en `index.html`

### Tailwind 4 Theme

```css
@theme {
  --color-primary: var(--color-primary);
  --color-accent: var(--color-accent);
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Pacifico', cursive;
}
```

### Material M3 Overrides (material-theme.scss)
- Primary palette: `mat.$magenta-palette`
- Tertiary palette: `mat.$violet-palette`
- `--mat-sys-primary` → `var(--color-primary)`
- `--mat-sys-primary-container` → `var(--color-accent)`

---

## Arquitectura de Componentes

Cada feature sigue el patrón de separación por responsabilidad:

```
src/app/features/<nombre-feature>/
├── pages/                  ← Componentes ORQUESTADORES (1 por ruta)
│   └── <nombre>-page/
│       ├── <nombre>-page.ts
│       ├── <nombre>-page.html
│       ├── <nombre>-page.css
│       └── <nombre>-page.spec.ts
├── components/             ← Componentes PRESENTACIONALES (1 responsabilidad cada uno)
│   └── <nombre>-componente/
│       ├── <nombre>.ts
│       ├── <nombre>.html
│       ├── <nombre>.css
│       └── <nombre>.spec.ts
```

### Reglas clave:

1. **Un componente = Una responsabilidad.** Si un componente hace dos cosas (ej: branding + formulario), sepáralo en dos componentes.
2. **Pages (orquestadores):** Inyectan servicios, manejan estado, ensamblan componentes hijos. NO tienen lógica de UI compleja.
3. **Components (presentacionales):** Reciben datos vía `input()`, emiten eventos vía `output()`. NO inyectan servicios HTTP.
4. **4 archivos por componente:** `.ts` (lógica), `.html` (template), `.css` (estilos), `.spec.ts` (tests).
5. **Cada componente es standalone** — no usar NgModules.
6. **Modals/Drawers:** Componentes especiales que viven en `components/modals/` o `components/drawer-*/`. Se abren desde la page orquestadora.

### Creación de componentes:

```bash
# Crear un componente presentacional:
ng g c features/<feature>/components/<nombre-componente>

# Crear una página (orquestador):
ng g c features/<feature>/pages/<nombre>-page
```

---

## Convenciones de Código

### Idioma

- **Comentarios:** Siempre en español. Claros y al punto, explicando CÓMO funciona.
- **Nombres de tests:** En español usando "debería..." (ej: `it('debería crear el componente', ...)`).
- **JSDoc:** En español para todos los componentes, métodos públicos y propiedades importantes.
- **Nombres de variables/clases:** En inglés (convención Angular).

### Estilos

- Usar **variables CSS del tema** (`--color-primary`, `--color-accent`, etc.) para colores.
- Usar **Tailwind CSS 4** para layout, spacing, y utilidades (importado como `@import 'tailwindcss'`).
- Usar **CSS del componente** (`.css`) para estilos específicos que no se resuelven con Tailwind.
- Clase `.glass` para contenedores principales (tarjetas, paneles, modales).
- `font-display` (Pacifico) para el logo y títulos display.
- `font-sans` (Inter) para todo el body text.
- Responsive: breakpoint mobile en `max-width: 767px`.

### Formularios

- Usar **ReactiveFormsModule** (FormGroup + FormControl) — NO template-driven forms.
- Validadores custom como **métodos estáticos** del componente.
- Mensajes de error con `<mat-error>` y bloques `@if/@else if` para errores específicos.
- Componentes de Material con `appearance="outline"`.
- Validar montos como **enteros positivos** con `Validators.pattern(/^\d+$/)` además de min/max.

### Comunicación entre componentes

- **Padre → Hijo:** Angular `input()` (signal-based).
- **Hijo → Padre:** Angular `output()` para emitir eventos.
- **Servicios:** Solo en pages/orquestadores o en `core/services/`.
- **DTOs de Request:** Las interfaces en `salida-request.interface.ts` definen los payloads que se envían al backend (solo IDs y datos mínimos, sin objetos anidados completos).

---

## Servicios HTTP (NO mocks)

Los servicios en `core/services/` hacen llamadas reales al backend:

| Servicio | Responsabilidad |
|----------|----------------|
| AuthService | Login, registro, token management, autoLogin |
| UserService | Perfil, búsqueda de usuarios |
| SalidaService | CRUD salidas, integrantes, gastos, pagos, balances |

### Interceptors (funcionales)
- **authInterceptor** — Adjunta Bearer token a requests, intercepta 401 → logout automático
- **errorInterceptor** — Captura errores HTTP globales (status >= 400)

### Configuración HTTP
```typescript
provideHttpClient(
  withFetch(),
  withInterceptors([authInterceptor, errorInterceptor])
)
```

### Environments
- **Desarrollo:** `apiUrl: 'http://localhost:8000/api'` (backend directo)
- **Producción:** `apiUrl: '/api'` (Nginx proxea al backend)
- `useMocks: false` en ambos (mocks eliminados del proyecto)

---

## Estructura del Proyecto

```
src/app/
├── core/                    # Servicios globales, modelos, guards, interceptors
│   ├── interfaces/          # Interfaces de dominio + DTOs de request
│   ├── services/            # Servicios HTTP (auth, user, salida)
│   ├── guards/              # Route guards (auth.guard.ts)
│   └── interceptors/        # HTTP interceptors (auth, error)
├── features/                # Módulos por feature (lazy loaded)
│   ├── auth/                # Login, Registro (SIN header, body.is-auth)
│   ├── dashboard/           # Home: bienvenida, acciones, lista salidas activas (CON header)
│   ├── salidas/             # Detalle de salida: gastos, balances, integrantes (CON header)
│   └── perfil/              # Perfil de usuario (CON header)
├── shared/                  # Componentes compartidos entre features
│   └── components/
│       ├── header/          # Header reutilizable con logo Pacifico
│       ├── avatar-group/    # Grupo de avatares de miembros
│       └── table/           # Tabla reutilizable genérica
├── layouts/                 # Layouts que envuelven rutas
│   └── main-layout/         # Header + <router-outlet>
├── app.routes.ts            # ÚNICA ubicación de rutas (centralizado)
├── app.config.ts            # Providers globales (router, HTTP, hydration)
└── app.html                 # Solo <router-outlet />
```

---

## Rutas

- **`app.routes.ts`** es el ÚNICO archivo de rutas. No crear archivos de rutas separados por feature.
- Rutas CON header van como hijas de `MainLayout`.
- Rutas SIN header (auth) van fuera del layout. Agregan clase `is-auth` al body.
- Todas las páginas usan **lazy loading** con `loadComponent()`.

```typescript
export const routes: Routes = [
  // Rutas SIN header (auth)
  { path: 'login', loadComponent: () => import('...').then(m => m.LoginPage) },
  { path: 'registro', loadComponent: () => import('...').then(m => m.RegistroPage) },

  // Rutas CON header (dentro del layout)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('...').then(m => m.DashboardPage) },
      { path: 'salida/:id', loadComponent: () => import('...').then(m => m.SalidaDetallePage) },
      { path: 'perfil', loadComponent: () => import('...').then(m => m.PerfilPage) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
```

---

## Testing

- **Runner:** Vitest (configurado con Angular CLI `@angular/build:unit-test`).
- **Cada componente tiene su `.spec.ts`.**
- En tests con Angular Material, usar `provideNoopAnimations()` en providers del TestBed.
- En tests con rutas/routerLink, usar `provideRouter([])` en providers.
- En tests de componentes que usan servicios HTTP, mockear el servicio (no el HTTP client).
- Nombres de tests en español: `it('debería...', ...)`.
- CI ejecuta: `npx ng test --watch=false`

---

## Documentación (.kiro/specs/)

Cada feature implementada tiene su spec documentado (histórico, no modificar):

```
.kiro/specs/<nombre-feature>/
├── requirements.md     # Requisitos funcionales y no funcionales
├── design.md           # Decisiones técnicas, arquitectura, flujo de datos
└── tasks.md            # Desglose de tareas con criterios de aceptación
```

### Specs existentes:

| Feature | Estado |
|---------|--------|
| `perfil-header` | ✅ Implementado |
| `login-page` | ✅ Implementado |
| `registro-page` | ✅ Implementado |
| `auth-architecture` | ✅ Implementado |
| `dashboard-view` | ✅ Implementado |
| `salidas` | ✅ Implementado |
| `compatibilidad-backend` | ✅ Implementado |
| `gestion-fantasmas` | ✅ Implementado |

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo en localhost:4200 |
| `npm test` | Ejecutar todos los tests con Vitest |
| `npm run build` | Build de producción (SPA) |
| `npm run lint` | ESLint |
| `ng g c <ruta>` | Generar componente con los 4 archivos |

---

## Docker y Producción

- En desarrollo: Angular dev server (:4200) → backend (:8000) directo
- En producción: Angular se compila como SPA estática → Nginx sirve archivos + proxy /api
- La `apiUrl` en producción es `/api` (relativa — Nginx hace proxy al backend:3000)
- El build de producción se copia a `Back/nginx/dist/` antes de construir la imagen Docker
- SSR packages instalados pero deploy actual usa output `browser/` (SPA mode via Nginx)
- CI/CD: push a main → lint + test → build → deploy automático a AWS
