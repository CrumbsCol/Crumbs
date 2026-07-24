# Requirements: Página de Registro (Módulo Auth)

## Contexto

El proyecto Crumbs necesita una página de registro de usuario accesible desde `/registro`, fuera del MainLayout (sin header compartido). Permite a nuevos usuarios crear una cuenta proporcionando sus datos básicos con validaciones avanzadas.

---

## Requisitos Funcionales

### FR-1: Layout de 1 Columna

- **FR-1.1**: La página tiene un layout de 1 columna centrada (no split como login).
- **FR-1.2**: Un mini-header propio en la parte superior con "Logo" y enlace "Volver".
- **FR-1.3**: El formulario se centra vertical y horizontalmente debajo del header.

### FR-2: Header de Registro

- **FR-2.1**: Muestra "Logo" alineado a la izquierda.
- **FR-2.2**: Muestra enlace "Volver" alineado a la derecha que navega a `/login`.
- **FR-2.3**: Tiene un borde inferior sutil para separar visualmente del contenido.

### FR-3: Formulario de Registro

- **FR-3.1**: 5 campos con `mat-form-field appearance="outline"`:
  1. Correo electrónico (`type="email"`)
  2. Usuario (`type="text"`)
  3. Contraseña (`type="password"`)
  4. Confirmar contraseña (`type="password"`)
  5. Fecha de nacimiento (`type="date"`, selector nativo del navegador)

### FR-4: Validaciones

- **FR-4.1**: Email: requerido + formato válido.
- **FR-4.2**: Usuario: requerido.
- **FR-4.3**: Contraseña: requerida + mínimo 6 chars + 1 mayúscula + 1 número + 1 especial.
- **FR-4.4**: Confirmar contraseña: requerida + debe coincidir con contraseña (validador a nivel de formulario).
- **FR-4.5**: Fecha de nacimiento: requerida.
- **FR-4.6**: Mensajes de error específicos con `<mat-error>` para cada validación fallida.

### FR-5: Botón de Submit

- **FR-5.1**: Botón "Registrarme" con `mat-flat-button` color primary.
- **FR-5.2**: Deshabilitado mientras el formulario sea inválido.

### FR-6: Acción Post-Submit

- **FR-6.1**: Emite los datos (email, userName, password, fechaNacimiento) al padre.
- **FR-6.2**: El padre hace `console.log('Registro:', data)`.
- **FR-6.3**: Futuro: llamará a `AuthService.register()` y redirigirá.

---

## Requisitos No Funcionales

### NFR-1: Arquitectura

- **NFR-1.1**: 3 componentes separados: `registro-header` + `registro-form` + `registro-page`.
- **NFR-1.2**: Misma convención que login: `pages/` orquestador, `components/` presentacionales.
- **NFR-1.3**: 4 archivos por componente.

### NFR-2: Responsive

- **NFR-2.1**: El formulario se adapta bien en mobile (menos padding, alineado arriba).

### NFR-3: Testing

- **NFR-3.1**: Tests unitarios con Vitest para los 3 componentes.
- **NFR-3.2**: Comentarios en español.

### NFR-4: Ruta

- **NFR-4.1**: Ruta `/registro` fuera del MainLayout (sin header compartido).
- **NFR-4.2**: Lazy loading con `loadComponent()`.

---

## Fuera de Alcance

- Integración con backend.
- Validación de usuario/email duplicado.
- Subida de avatar.
- Verificación de email.
