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
│   │   └── user.interface.ts      # Modelo de datos del usuario
│   ├── services/
│   │   └── user.service.ts        # Servicio de usuario (mock por ahora)
│   ├── guards/                    # (futuro) Guards de autenticación
│   └── interceptors/              # (futuro) Interceptors HTTP
├── shared/                        # Componentes reutilizables entre features
│   └── components/
│       └── header/                # Header con navegación por tabs
├── features/                      # Módulos de funcionalidad (lazy loaded)
│   ├── perfil/
│   │   ├── components/            # Componentes presentacionales del feature
│   │   │   └── perfil-card/       # Tarjeta de datos del usuario
│   │   └── pages/                 # Páginas (orquestradores)
│   │       └── perfil-page/       # Página principal de perfil
│   ├── auth/                      # (futuro) Login y registro
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

## Autenticación (futuro)

El `UserService` está diseñado para facilitar la integración con un proveedor de autenticación:

1. Reemplazar `MOCK_USER` por una llamada HTTP (`httpClient.get('/api/me')`).
2. Añadir un `AuthGuard` en `core/guards/` para proteger rutas.
3. Añadir un `HttpInterceptor` en `core/interceptors/` para adjuntar tokens.
4. Los componentes consumidores **no cambian** porque leen el mismo signal `currentUser()`.

---

## Tema Visual

El tema de Material 3 usa la paleta **magenta** como color primario y **violet** como terciario. El color scheme por defecto es `light`. Configurado en `src/material-theme.scss`.
