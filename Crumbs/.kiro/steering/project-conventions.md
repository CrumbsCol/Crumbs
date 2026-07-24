# Convenciones del Proyecto Crumbs

## Stack Tecnológico

- **Framework:** Angular 21 (standalone components, signals)
- **UI Library:** Angular Material 21 (M3 theme, paleta magenta/violet)
- **Styling:** Tailwind CSS 4 + CSS por componente
- **Build:** Vite + Angular CLI
- **Testing:** Vitest
- **Formatting:** Prettier + ESLint

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
3. **Components (presentacionales):** Reciben datos vía `input()`, emiten eventos vía `output()`. NO inyectan servicios.
4. **4 archivos por componente:** `.ts` (lógica), `.html` (template), `.css` (estilos), `.spec.ts` (tests).
5. **Cada componente es standalone** — no usar NgModules.

### Creación de componentes:

Para crear un componente nuevo, usar Angular CLI desde la carpeta del feature:

```bash
# Crear un componente presentacional:
ng g c features/<feature>/components/<nombre-componente>

# Crear una página (orquestador):
ng g c features/<feature>/pages/<nombre>-page
```

Esto genera los 4 archivos con la estructura base correcta.

---

## Convenciones de Código

### Idioma

- **Comentarios:** Siempre en español. Claros y al punto, explicando CÓMO funciona.
- **Nombres de tests:** En español usando "debería..." (ej: `it('debería crear el componente', ...)`).
- **JSDoc:** En español para todos los componentes, métodos públicos y propiedades importantes.
- **Nombres de variables/clases:** En inglés (convención Angular).

### Estilos

- Usar **variables CSS del tema de Material** (`--mat-sys-primary`, `--mat-sys-surface`, etc.) para colores.
- Usar **Tailwind CSS** para layout y spacing donde sea práctico.
- Usar **CSS del componente** (`.css`) para estilos específicos que no se resuelven con Tailwind.
- Responsive: breakpoint mobile en `max-width: 767px`.

### Formularios

- Usar **ReactiveFormsModule** (FormGroup + FormControl) — NO template-driven forms.
- Validadores custom como **métodos estáticos** del componente.
- Mensajes de error con `<mat-error>` y bloques `@if/@else if` para errores específicos.
- Componentes de Material con `appearance="outline"`.

### Comunicación entre componentes

- **Padre → Hijo:** Angular `input()` (signal-based).
- **Hijo → Padre:** Angular `output()` para emitir eventos.
- **Servicios:** Solo en pages/orquestadores o en `core/services/`.

---

## Estructura del Proyecto

```
src/app/
├── core/                    # Servicios globales, modelos, guards, interceptors
│   ├── interfaces/          # Interfaces de dominio
│   ├── services/            # Servicios (auth, user, etc.)
│   ├── guards/              # Route guards
│   └── interceptors/        # HTTP interceptors
├── features/                # Módulos por feature (lazy loaded)
│   ├── auth/                # Login, Registro (SIN header)
│   ├── dashboard/           # Home (CON header)
│   ├── salidas/             # Salidas grupales (CON header)
│   └── perfil/              # Perfil de usuario (CON header)
├── shared/                  # Componentes compartidos entre features
│   └── components/
│       └── header/          # Header reutilizable
├── layouts/                 # Layouts que envuelven rutas
│   └── main-layout/         # Header + <router-outlet>
├── app.routes.ts            # ÚNICA ubicación de rutas (centralizado)
└── app.html                 # Solo <router-outlet />
```

---

## Rutas

- **`app.routes.ts`** es el ÚNICO archivo de rutas. No crear archivos de rutas separados por feature.
- Rutas CON header van como hijas de `MainLayout`.
- Rutas SIN header (auth) van fuera del layout.
- Todas las páginas usan **lazy loading** con `loadComponent()`.

```typescript
export const routes: Routes = [
  // Rutas SIN header
  { path: 'login', loadComponent: () => import('...').then(m => m.LoginPage) },

  // Rutas CON header (dentro del layout)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: 'perfil', loadComponent: () => import('...').then(m => m.PerfilPage) },
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
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
- Nombres de tests en español: `it('debería...', ...)`.

---

## Documentación (.kiro/specs/)

Cada feature implementada debe tener su spec documentado:

```
.kiro/specs/<nombre-feature>/
├── requirements.md     # Requisitos funcionales y no funcionales
├── design.md           # Decisiones técnicas, arquitectura, flujo de datos
└── tasks.md            # Desglose de tareas con criterios de aceptación
```

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo en localhost:4200 |
| `npm test` | Ejecutar todos los tests con Vitest |
| `npm run build` | Build de producción |
| `ng g c <ruta>` | Generar componente con los 4 archivos |
