# Tasks: Página de Perfil y Header Compartido

#[[file:design.md]]

---

## Task 1: Crear interfaz User

**Archivos a crear:**
- `src/app/core/interfaces/user.interface.ts`

**Detalle:**
1. Crear el archivo `user.interface.ts` con la interfaz `User`:
   - `nombre: string`
   - `userName: string`
   - `fechaNacimiento: string`
   - `email?: string`
   - `avatarUrl?: string | null`
2. Exportar la interfaz.
3. Eliminar el `.gitkeep` de `core/interfaces/` si existe.

**Criterio de aceptación:** La interfaz compila sin errores y se puede importar desde otros archivos del proyecto.

---

## Task 2: Crear UserService con datos mock

**Archivos a crear:**
- `src/app/core/services/user.service.ts`

**Detalle:**
1. Crear un servicio injectable con `providedIn: 'root'`.
2. Definir una constante `MOCK_USER` con datos de prueba:
   ```typescript
   const MOCK_USER: User = {
     nombre: 'Juan López',
     userName: 'juanlopez',
     fechaNacimiento: '15/03/1995',
     email: 'juan@example.com',
     avatarUrl: null,
   };
   ```
3. Crear un `signal<User | null>` privado inicializado con `MOCK_USER`.
4. Exponer `currentUser` como signal readonly.
5. Implementar método `logout()` que setee el signal a `null`.
6. Eliminar el `.gitkeep` de `core/services/` si existe.

**Criterio de aceptación:** El servicio se puede inyectar, retorna los datos mock vía signal, y `logout()` limpia el usuario a `null`.

---

## Task 3: Crear componente Header compartido (4 archivos)

**Archivos a crear:**
- `src/app/shared/components/header/header.ts`
- `src/app/shared/components/header/header.html`
- `src/app/shared/components/header/header.css`
- `src/app/shared/components/header/header.spec.ts`

**Detalle:**
1. Crear componente standalone `Header` con selector `app-header`.
2. Importar: `MatTabsModule`, `MatIconModule`, `RouterLink`, `RouterLinkActive`.
3. Inyectar `Router` y `UserService`.
4. Template:
   - Layout flex: logo a la izquierda, navegación a la derecha.
   - Logo: texto "Logo" con estilo bold (placeholder para futuro logo real).
   - Navegación: `<nav mat-tab-nav-bar>` con:
     - "Perfil" → `routerLink="/perfil"` con `routerLinkActive` y `[active]`.
     - "Salir" → ejecuta `logout()` y navega a `/login` (o ruta inicial).
5. Estilos con Tailwind: `flex`, `justify-between`, `items-center`, `px-6`, `py-3`, borde inferior o sombra sutil.
6. Test (Vitest):
   - Verificar que el componente se crea correctamente.
   - Verificar que el logo se renderiza.
   - Verificar que los links de navegación existen.

**Criterio de aceptación:** El header renderiza con logo y tabs. La tab activa se resalta visualmente con `routerLinkActive`. El botón "Salir" ejecuta logout. Tests pasan.

---

## Task 4: Crear componente presentacional PerfilCard (4 archivos)

**Archivos a crear:**
- `src/app/features/perfil/components/perfil-card/perfil-card.ts`
- `src/app/features/perfil/components/perfil-card/perfil-card.html`
- `src/app/features/perfil/components/perfil-card/perfil-card.css`
- `src/app/features/perfil/components/perfil-card/perfil-card.spec.ts`

**Detalle:**
1. Crear componente standalone `PerfilCard` con selector `app-perfil-card`.
2. Usar `input.required<User>()` para recibir los datos del usuario.
3. NO inyectar servicios (componente presentacional puro).
4. Template según diseño:
   - Layout de dos columnas (avatar + datos):
     - **Columna izquierda**: Avatar circular (~150px), fondo violet claro (`bg-violet-100`), ícono SVG de usuario en violet oscuro.
     - **Columna derecha**: Lista vertical con:
       - Nombre (valor del input `user().nombre`)
       - UserName (valor del input `user().userName`)
       - Fecha de nacimiento (valor del input `user().fechaNacimiento`)
       - Contraseña (texto fijo `••••••••`)
5. Estilos: Tailwind para layout y colores. Responsive (columnas en desktop, stack en mobile).
6. Test (Vitest):
   - Verificar que el componente se crea con un User mock.
   - Verificar que los 4 campos se renderizan con los valores correctos.
   - Verificar que el avatar placeholder existe.

**Criterio de aceptación:** El componente recibe un `User` y muestra los datos correctamente. No depende de servicios. Tests pasan.

---

## Task 5: Crear página PerfilPage (4 archivos)

**Archivos a crear:**
- `src/app/features/perfil/pages/perfil-page/perfil-page.ts`
- `src/app/features/perfil/pages/perfil-page/perfil-page.html`
- `src/app/features/perfil/pages/perfil-page/perfil-page.css`
- `src/app/features/perfil/pages/perfil-page/perfil-page.spec.ts`

**Detalle:**
1. Crear componente standalone `PerfilPage` con selector `app-perfil-page`.
2. Importar: `PerfilCard`, `MatIconModule`, `MatButtonModule`.
3. Inyectar `UserService` y exponer el signal `currentUser`.
4. Template:
   - Contenedor principal con el contenido de perfil.
   - Botón de edición (ícono lápiz `mat-icon-button`) posicionado en la esquina superior derecha.
   - `<app-perfil-card [user]="currentUser()!" />` pasándole los datos del usuario.
   - Manejar caso `null` (si el usuario no está cargado, mostrar estado vacío o nada).
5. Estilos: padding, max-width centrado, posición relativa para el botón editar.
6. Test (Vitest):
   - Verificar que la página se crea.
   - Verificar que `PerfilCard` recibe los datos del usuario.
   - Verificar que el botón de editar existe.

**Criterio de aceptación:** La página inyecta el servicio, pasa los datos al componente presentacional, y muestra el botón de editar. Tests pasan.

---

## Task 6: Crear MainLayout (4 archivos)

**Archivos a crear:**
- `src/app/layouts/main-layout/main-layout.ts`
- `src/app/layouts/main-layout/main-layout.html`
- `src/app/layouts/main-layout/main-layout.css`
- `src/app/layouts/main-layout/main-layout.spec.ts`

**Detalle:**
1. Crear componente standalone `MainLayout` con selector `app-main-layout`.
2. Importar: `HeaderComponent`, `RouterOutlet`.
3. Template:
   ```html
   <app-header />
   <main>
     <router-outlet />
   </main>
   ```
4. Estilos: `main` con min-height para ocupar el viewport restante.
5. Test (Vitest):
   - Verificar que el componente se crea.
   - Verificar que contiene `app-header`.
   - Verificar que contiene `router-outlet`.

**Criterio de aceptación:** El layout renderiza el header arriba y el contenido de la ruta hija debajo. Todas las páginas dentro de este layout tendrán header automáticamente. Tests pasan.

---

## Task 7: Configurar rutas en app.routes.ts y limpiar app root

**Archivos a modificar:**
- `src/app/app.routes.ts`
- `src/app/app.html`
- `src/app/app.css`

**Detalle:**
1. En `app.routes.ts` configurar:
   ```typescript
   export const routes: Routes = [
     {
       path: '',
       loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
       children: [
         {
           path: 'perfil',
           loadComponent: () => import('./features/perfil/pages/perfil-page/perfil-page').then(m => m.PerfilPage),
         },
         { path: '', redirectTo: 'perfil', pathMatch: 'full' },
       ],
     },
     // Rutas de auth (sin header) se agregarán aquí en el futuro:
     // { path: 'login', loadComponent: () => ... },
     // { path: 'registro', loadComponent: () => ... },
   ];
   ```
2. En `app.html`:
   - Eliminar TODO el contenido placeholder de Angular (SVG, estilos inline, links).
   - Dejar solo: `<router-outlet />`
3. En `app.css`:
   - Limpiar o dejar vacío.

**Criterio de aceptación:** Navegar a `/` redirige a `/perfil`. La página de perfil se carga con lazy loading dentro del MainLayout (con header). No queda contenido placeholder.

---

## Task 8: Verificación, build y tests

**Acciones:**
1. Ejecutar `ng build` para verificar compilación sin errores.
2. Ejecutar `npm test` (Vitest) para correr todos los `.spec.ts`.
3. Verificar que el lazy loading genera chunks separados (layout, perfil-page).
4. Confirmar visualmente que los estilos de Material y Tailwind se aplican.

**Criterio de aceptación:** El proyecto compila sin errores. Todos los tests pasan. La página se renderiza según el diseño de la imagen (header con tabs, avatar, datos de usuario, botón editar).

---

## Orden de ejecución

```
Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6 → Task 7 → Task 8
  │         │         │         │         │         │         │         │
  ▼         ▼         ▼         ▼         ▼         ▼         ▼         ▼
Interfaz  Service   Header   PerfilCard PerfilPage Layout    Rutas    Build
                   (shared)  (present.) (page)    (wrapper)  +clean   +tests
```

- Tasks 1-2: Base (interfaz + servicio). Prerrequisito de todo lo demás.
- Task 3: Header compartido. Prerrequisito del layout.
- Task 4: Componente presentacional. Prerrequisito de la página.
- Task 5: Página que orquesta todo.
- Task 6: Layout que envuelve header + router-outlet.
- Task 7: Integra todo en las rutas.
- Task 8: Validación final.

---

## Resumen de archivos a crear

| # | Archivo | Tipo |
|---|---------|------|
| 1 | `core/interfaces/user.interface.ts` | Interfaz |
| 2 | `core/services/user.service.ts` | Servicio |
| 3 | `shared/components/header/header.ts` | Componente |
| 4 | `shared/components/header/header.html` | Template |
| 5 | `shared/components/header/header.css` | Estilos |
| 6 | `shared/components/header/header.spec.ts` | Test |
| 7 | `features/perfil/components/perfil-card/perfil-card.ts` | Componente |
| 8 | `features/perfil/components/perfil-card/perfil-card.html` | Template |
| 9 | `features/perfil/components/perfil-card/perfil-card.css` | Estilos |
| 10 | `features/perfil/components/perfil-card/perfil-card.spec.ts` | Test |
| 11 | `features/perfil/pages/perfil-page/perfil-page.ts` | Componente |
| 12 | `features/perfil/pages/perfil-page/perfil-page.html` | Template |
| 13 | `features/perfil/pages/perfil-page/perfil-page.css` | Estilos |
| 14 | `features/perfil/pages/perfil-page/perfil-page.spec.ts` | Test |
| 15 | `layouts/main-layout/main-layout.ts` | Componente |
| 16 | `layouts/main-layout/main-layout.html` | Template |
| 17 | `layouts/main-layout/main-layout.css` | Estilos |
| 18 | `layouts/main-layout/main-layout.spec.ts` | Test |

**Total: 18 archivos nuevos + 3 archivos modificados (app.routes.ts, app.html, app.css)**
