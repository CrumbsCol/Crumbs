# Crumbs — Frontend

Aplicación web para dividir gastos entre amigos. Construida con **Angular 21**, **Angular Material** y **Tailwind CSS**.

## Stack Tecnológico

- **Framework:** Angular 21 (standalone components, signals)
- **UI Library:** Angular Material (M3 theme, Purple primary)
- **Styling:** Tailwind CSS 4 + SCSS
- **Build:** Vite + Angular CLI
- **SSR:** Angular SSR con Express 5
- **Testing:** Vitest
- **Formatting:** Prettier

## Requisitos Previos

- **Node.js** 22+
- **npm** 10.9+

Puedes verificar tus versiones con:

```bash
node -v
npm -v
```

## Desarrollo

### Instalación

```bash
cd Crumbs
npm install
```

### Levantar el servidor de desarrollo

```bash
npm start
```

La app estará disponible en `http://localhost:4200/`. Se recarga automáticamente al modificar archivos fuente.

### Build de producción

```bash
npm run build
```

El output se genera en `dist/Crumbs/`. Incluye el build del browser y el servidor SSR.

### Servir el build SSR localmente

```bash
npm run serve:ssr:Crumbs
```

El servidor Express escucha en `http://localhost:4000` (o el puerto definido en la variable de entorno `PORT`).

## Tests

### Pruebas unitarias

El proyecto usa **Vitest** como test runner (integrado con Angular CLI).

```bash
npm test
```

Esto ejecuta todas las pruebas unitarias (archivos `*.spec.ts`).


## Estructura del Proyecto

```
Crumbs/
├── public/                      # Assets estáticos (favicon, imágenes)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── app.ts               # Componente raíz (standalone, signals)
│   │   ├── app.html             # Template del componente raíz
│   │   ├── app.css              # Estilos del componente raíz
│   │   ├── app.config.ts        # Configuración de la app (providers, routes)
│   │   ├── app.config.server.ts # Configuración específica para SSR
│   │   ├── app.routes.ts        # Definición de rutas del cliente
│   │   ├── app.routes.server.ts # Configuración de rutas para SSR
│   │   └── app.spec.ts          # Pruebas del componente raíz
│   ├── main.ts                  # Entry point del browser
│   ├── main.server.ts           # Entry point del servidor (SSR)
│   ├── server.ts                # Servidor Express para SSR
│   ├── material-theme.scss      # Tema de Angular Material (M3, Purple)
│   ├── styles.css               # Estilos globales + Tailwind
│   └── index.html               # HTML principal
├── angular.json                 # Configuración del Angular CLI
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración base de TypeScript
├── tsconfig.app.json            # TypeScript config para la app
├── tsconfig.spec.json           # TypeScript config para tests
├── .postcssrc.json              # Configuración PostCSS (Tailwind)
├── .prettierrc                  # Configuración de Prettier
├── .editorconfig                # Configuración del editor
└── .gitignore                   # Archivos ignorados por Git
```

### Estructura sugerida para escalar

A medida que el proyecto crezca, se recomienda organizar `src/app/` de la siguiente forma:

```
src/app/
├── core/                    # Servicios globales, modelos, guards, interceptors
│   ├── models/              # Interfaces de dominio (User, Salida, Gasto, Miembro)
│   ├── interfaces/          # DTOs/contratos del API
│   ├── services/            # Servicios HTTP (auth, salidas, gastos, miembros)
│   ├── guards/              # AuthGuard
│   └── interceptors/        # Auth interceptor + mocks para desarrollo
├── features/                # Módulos por feature (lazy loaded)
│   ├── auth/                # Login, Registro
│   ├── dashboard/           # Home: salidas activas, crear/unirse
│   ├── salidas/             # Detalle salida: gastos, miembros, drawers
│   └── perfil/              # Perfil del usuario
├── shared/                  # Pipes, directivas, componentes compartidos
└── environments/            # Configuración por entorno
```

## Tema Visual

- **Color primario:** Purple `#6750A4` (Material M3)
- **Tipografía:** Roboto
- **Layout:** Responsive — desktop (grid 2 cols) / mobile (1 col stacked)
- **Header:** Toolbar purple con logo "Crumbs" (clickeable → dashboard)


## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Levanta el servidor de desarrollo en `localhost:4200` |
| `npm run build` | Build de producción (browser + SSR) |
| `npm run watch` | Build en modo watch (desarrollo) |
| `npm test` | Ejecuta pruebas unitarias con Vitest |
| `npm run serve:ssr:Crumbs` | Sirve el build SSR en `localhost:4000` |
