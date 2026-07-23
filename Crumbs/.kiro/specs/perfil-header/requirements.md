# Requirements: Página de Perfil y Header Compartido

## Contexto

El proyecto Crumbs (Angular 21 + Material 21 + Tailwind 4 + SSR) necesita una página de perfil de usuario y un componente header reutilizable que se comparta entre las distintas páginas de la aplicación. Inicialmente los datos del usuario se proporcionarán con datos mock, con una arquitectura que permita la futura integración con un servicio de autenticación real.

---

## Requisitos Funcionales

### FR-1: Header Compartido

- **FR-1.1**: El header debe mostrar el logo de la aplicación ("Logo") alineado a la izquierda.
- **FR-1.2**: El header debe mostrar pestañas de navegación a la derecha con las opciones: "Perfil" y "Salir".
- **FR-1.3**: La pestaña activa debe indicarse visualmente (por ejemplo, con un subrayado o color diferenciado).
- **FR-1.4**: El header debe ser un componente standalone reutilizable ubicado en `shared/components/header/`.
- **FR-1.5**: El header debe recibir como input la pestaña activa actual (o detectarla automáticamente a partir de la ruta activa).
- **FR-1.6**: Al hacer clic en "Perfil", debe navegar a la ruta `/perfil`.
- **FR-1.7**: Al hacer clic en "Salir", debe ejecutar la acción de cierre de sesión (por ahora limpiar datos mock y redirigir al login o ruta inicial).

### FR-2: Página de Perfil

- **FR-2.1**: La página debe mostrar una imagen de avatar del usuario (placeholder circular con ícono de usuario si no hay foto).
- **FR-2.2**: La página debe mostrar los siguientes datos del usuario:
  - Nombre
  - UserName
  - Fecha de nacimiento
  - Contraseña (enmascarada)
- **FR-2.3**: La página debe incluir un botón/ícono de edición (lápiz) en la esquina superior derecha del área de contenido.
- **FR-2.4**: Los datos deben provenir inicialmente de un servicio mock (`UserService`) que retorne datos hardcodeados.
- **FR-2.5**: La página debe incluir el header compartido con la pestaña "Perfil" activa.

### FR-3: Servicio de Usuario (Mock)

- **FR-3.1**: Crear un `UserService` en `core/services/` que exponga los datos del usuario actual.
- **FR-3.2**: El servicio debe utilizar un `signal` o `BehaviorSubject` para mantener el estado reactivo del usuario.
- **FR-3.3**: Debe existir una interfaz `User` en `core/interfaces/` que defina la estructura del modelo de usuario.

---

## Requisitos No Funcionales

### NFR-1: Arquitectura

- **NFR-1.1**: Todos los componentes deben ser standalone (sin NgModules).
- **NFR-1.2**: Se debe usar el sistema de signals de Angular 21 para estado reactivo.
- **NFR-1.3**: Los estilos deben combinar Tailwind CSS 4 con Angular Material 21 donde corresponda.
- **NFR-1.4**: El código debe seguir la estructura existente del proyecto: `core/`, `features/`, `shared/`.

### NFR-2: Preparación para Autenticación Real

- **NFR-2.1**: El `UserService` debe diseñarse con una interfaz que permita reemplazar datos mock por llamadas HTTP sin modificar los componentes consumidores.
- **NFR-2.2**: Se recomienda usar un patrón de inyección donde el servicio encapsule la fuente de datos (mock ahora, API después).

### NFR-3: Responsive y Accesibilidad

- **NFR-3.1**: La página de perfil debe ser responsive (mobile-first).
- **NFR-3.2**: El header debe colapsar adecuadamente en pantallas pequeñas.
- **NFR-3.3**: Cumplir con estándares básicos de accesibilidad (roles ARIA, contraste, navegación por teclado).

### NFR-4: Rendimiento

- **NFR-4.1**: Los componentes deben usar lazy loading a nivel de rutas.
- **NFR-4.2**: Compatible con SSR (ya configurado en el proyecto).

---

## Recomendación sobre Autenticación

Para la futura integración de autenticación, se recomienda:

1. **Patrón actual (Mock)**: Un `UserService` con un `signal<User | null>` que retorne datos hardcodeados. Esto permite que los componentes consuman el signal sin saber si los datos vienen de memoria, localStorage o una API.

2. **Migración futura**: Cuando se integre un proveedor de auth (Firebase Auth, Auth0, Cognito, etc.), solo se necesitará:
   - Añadir un `HttpInterceptor` para tokens en `core/interceptors/`.
   - Añadir un `AuthGuard` en `core/guards/`.
   - Modificar `UserService` para hacer `httpClient.get('/api/me')` en lugar de retornar mock.
   - Los componentes NO cambiarán porque consumen el mismo signal.

3. **Almacenamiento de sesión**: Se puede usar `localStorage` o `sessionStorage` para persistir el token JWT, y el interceptor lo adjunta automáticamente a las peticiones.

---

## Fuera de Alcance (por ahora)

- Formulario de edición del perfil (solo se muestra el ícono de editar).
- Integración real con backend de autenticación.
- Subida de foto de perfil.
- Validación de formularios.
