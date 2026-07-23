# Design: Página de Perfil y Header Compartido

#[[file:requirements.md]]

---

## Arquitectura General

```
src/app/
├── core/
│   ├── interfaces/
│   │   └── user.interface.ts              # Interfaz User
│   └── services/
│       └── user.service.ts                # UserService (mock → futuro HTTP)
├── shared/
│   └── components/
│       └── header/
│           ├── header.ts                  # Componente Header standalone
│           ├── header.html                # Template del header
│           ├── header.css                 # Estilos
│           └── header.spec.ts             # Tests (Vitest)
├── features/
│   ├── perfil/
│   │   ├── components/
│   │   │   └── perfil-card/
│   │   │       ├── perfil-card.ts         # Componente presentacional (recibe datos via @input)
│   │   │       ├── perfil-card.html       # Template
│   │   │       ├── perfil-card.css        # Estilos
│   │   │       └── perfil-card.spec.ts    # Tests (Vitest)
│   │   └── pages/
│   │       └── perfil-page/
│   │           ├── perfil-page.ts         # Página: inyecta servicio, usa header + perfil-card
│   │           ├── perfil-page.html       # Template
│   │           ├── perfil-page.css        # Estilos
│   │           └── perfil-page.spec.ts    # Tests (Vitest)
│   ├── auth/
│   │   └── ...                            # (futuro: login, registro — sin header)
│   ├── dashboard/
│   │   └── ...                            # (futuro — con header)
│   └── salidas/
│       └── ...                            # (futuro — con header)
├── layouts/
│   └── main-layout/
│       ├── main-layout.ts                 # Layout wrapper: header + <router-outlet>
│       ├── main-layout.html
│       ├── main-layout.css
│       └── main-layout.spec.ts
├── app.routes.ts                          # ÚNICA ubicación de rutas
├── app.ts                                 # Root component (solo <router-outlet>)
└── app.html                               # Template root limpio
```

---

## Decisiones Técnicas

### 1. Estructura Feature: components/ vs pages/

**Decisión**: Cada feature tiene dos subcarpetas:
- `components/` — Componentes presentacionales (reciben datos por `input()`, no inyectan servicios).
- `pages/` — Componentes de página (inyectan servicios, orquestan componentes, se registran en las rutas).

**Razón**: Separa responsabilidades. Los componentes presentacionales son fáciles de testear (solo inputs/outputs). Las páginas manejan la lógica de negocio y coordinan los componentes.

### 2. Convención de 4 archivos por componente

Cada componente Angular se compone de:
- `.ts` — Clase del componente (lógica)
- `.html` — Template
- `.css` — Estilos (Tailwind + Material)
- `.spec.ts` — Tests unitarios con Vitest

### 3. Header vía Layout Route (no duplicado por página)

**Decisión**: Crear un componente `MainLayout` que contenga el `<app-header>` + `<router-outlet>`. Las rutas que necesitan header se agrupan como hijas de este layout. Las rutas de auth (login, registro) quedan fuera del layout.

**Razón**: Evita repetir `<app-header>` en cada página. El header se muestra automáticamente para todas las rutas hijas del layout. Login y registro quedan fuera, sin header.

```typescript
// app.routes.ts — ÚNICA ubicación de rutas
export const routes: Routes = [
  // Rutas CON header (dentro del layout)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: 'perfil',
        loadComponent: () => import('./features/perfil/pages/perfil-page/perfil-page').then(m => m.PerfilPage),
      },
      // futuro: dashboard, salidas, etc.
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
    ],
  },
  // Rutas SIN header (auth)
  // {
  //   path: 'login',
  //   loadComponent: () => import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage),
  // },
  // {
  //   path: 'registro',
  //   loadComponent: () => import('./features/auth/pages/registro-page/registro-page').then(m => m.RegistroPage),
  // },
];
```

### 4. Gestión de Estado del Usuario

**Decisión**: Usar `signal<User | null>` en el `UserService`.

**Razón**: Angular 21 prioriza signals como primitiva reactiva. Un signal es más simple que un BehaviorSubject, se integra nativamente con templates (`{{ user().nombre }}`), y no requiere suscripciones manuales ni `async` pipe.

```typescript
// core/services/user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _currentUser = signal<User | null>(MOCK_USER);

  readonly currentUser = this._currentUser.asReadonly();

  logout(): void {
    this._currentUser.set(null);
  }
}
```

**Migración futura**: Para integrar auth real, se reemplaza `MOCK_USER` por una llamada HTTP en un método `loadUser()` que actualice el signal.

### 5. Header: Detección de Tab Activa

**Decisión**: Usar `routerLinkActive` directamente en el template del header para determinar la pestaña activa.

**Razón**: Es declarativo, no requiere lógica en el .ts, y Angular se encarga de actualizar el estado automáticamente al navegar.

```html
<nav mat-tab-nav-bar>
  <a mat-tab-link routerLink="/perfil" routerLinkActive #perfil="routerLinkActive" [active]="perfil.isActive">
    Perfil
  </a>
  <a mat-tab-link (click)="logout()">
    Salir
  </a>
</nav>
```

### 6. Navegación de Tabs con Angular Material

**Decisión**: Usar `mat-tab-nav-bar` + `mat-tab-link` de Angular Material.

**Razón**: 
- Accesibilidad (ARIA roles, navegación por teclado) out-of-the-box.
- Indicador visual de tab activa incluido.
- Se integra con `routerLink` y `routerLinkActive`.
- Consistente con el theme Material 3 (magenta/violet).

### 7. Componente PerfilCard (presentacional)

**Decisión**: `PerfilCard` solo recibe datos vía `input()` de Angular 21. No inyecta servicios.

```typescript
// features/perfil/components/perfil-card/perfil-card.ts
@Component({ ... })
export class PerfilCard {
  readonly user = input.required<User>();
}
```

**Razón**: Componente tonto/presentacional que es fácil de testear. La página se encarga de obtener los datos y pasárselos.

### 8. Lazy Loading

**Decisión**: Todas las páginas y el layout usan `loadComponent` para lazy loading.

**Razón**: Reduce el bundle inicial. Cada feature se carga solo cuando se navega a él.

### 9. Estilos: Tailwind + Material Combinados

**Decisión**: Tailwind para layout y spacing. Angular Material para componentes interactivos (tabs, buttons, icons).

**Razón**: 
- Tailwind maneja el layout (flexbox, grid, padding, margin).
- Material provee componentes con comportamiento (ripple, animations, a11y).
- El theme M3 ya está configurado con paleta magenta/violet.

### 10. Testing con Vitest

**Decisión**: Usar Vitest (ya configurado en el proyecto) para tests unitarios de todos los componentes.

**Razón**: El proyecto ya tiene Vitest como devDependency y el builder `@angular/build:unit-test` configurado. Se usará `@analogjs/vitest-angular` o el setup nativo de Angular 21 con Vitest.

---

## Modelo de Datos

```typescript
// core/interfaces/user.interface.ts
export interface User {
  nombre: string;
  userName: string;
  fechaNacimiento: string;   // formato: 'dd/MM/yyyy'
  email?: string;
  avatarUrl?: string | null; // null = usa placeholder
}
```

**Datos Mock**:
```typescript
const MOCK_USER: User = {
  nombre: 'Juan López',
  userName: 'juanlopez',
  fechaNacimiento: '15/03/1995',
  email: 'juan@example.com',
  avatarUrl: null,
};
```

> Nota: La contraseña NO se almacena en el modelo de frontend. Se muestra un campo "Contraseña" con valor enmascarado (`••••••••`) puramente visual.

---

## Flujo de Componentes

```
┌──────────────────────────────────────────────────────┐
│  AppComponent (<router-outlet>)                      │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  MainLayout (layout route)                     │  │
│  │                                                │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │  HeaderComponent (shared)                │  │  │
│  │  │  [Logo]              [Perfil] [Salir]    │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                │  │
│  │  <router-outlet> ← hijos del layout            │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │  PerfilPage (page)                       │  │  │
│  │  │                                         ✏│  │  │
│  │  │  ┌────────────────────────────────────┐  │  │  │
│  │  │  │  PerfilCard (component)            │  │  │  │
│  │  │  │  [Avatar]    Nombre                │  │  │  │
│  │  │  │              UserName              │  │  │  │
│  │  │  │              Fecha nacimiento      │  │  │  │
│  │  │  │              Contraseña            │  │  │  │
│  │  │  └────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ── Rutas SIN layout (futuro) ──                     │
│  /login  → LoginPage (sin header)                    │
│  /registro → RegistroPage (sin header)               │
└──────────────────────────────────────────────────────┘
```

---

## Dependencias de Angular Material Necesarias

| Módulo | Uso |
|--------|-----|
| `MatTabsModule` | Tabs de navegación en header |
| `MatIconModule` | Íconos (editar, usuario) |
| `MatButtonModule` | Botón de editar |

---

## Compatibilidad SSR

- Los componentes no usan APIs del browser directamente.
- El `UserService` con signal es compatible con SSR (datos mock inline).
- Si en futuro se usa localStorage para tokens, se deberá usar `isPlatformBrowser()`.

---

## Seguridad

- La contraseña nunca se expone en el modelo; el campo visual es decorativo.
- El botón "Salir" limpia el estado del usuario en memoria.
- Futuro: el `AuthGuard` protegerá rutas dentro del layout.
