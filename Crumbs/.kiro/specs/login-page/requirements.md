# Requirements: Página de Login (Módulo Auth)

## Contexto

El proyecto Crumbs (Angular 21 + Material 21 + Tailwind 4 + SSR) necesita implementar la funcionalidad real de la página de login, que inicialmente era un placeholder. La página se renderiza fuera del `MainLayout` (sin header) bajo la ruta `/login`. Se transforma en un formulario funcional de inicio de sesión con validaciones avanzadas, usando la arquitectura de componentes separados por responsabilidad (`pages/` + `components/`).

---

## Requisitos Funcionales

### FR-1: Layout Split

- **FR-1.1**: La página debe tener un layout de dos columnas: panel izquierdo con branding y panel derecho con formulario.
- **FR-1.2**: El panel izquierdo muestra el nombre "Crumbs" y un subtítulo descriptivo, con fondo del color primario del tema (`--mat-sys-primary`).
- **FR-1.3**: El panel derecho muestra el formulario centrado vertical y horizontalmente sobre fondo claro (`--mat-sys-surface`).

### FR-2: Formulario de Login

- **FR-2.1**: El formulario contiene dos campos: "Correo electrónico / Usuario" y "Contraseña".
- **FR-2.2**: Los campos usan `mat-form-field` con `appearance="outline"` de Angular Material.
- **FR-2.3**: El campo de contraseña usa `type="password"`.
- **FR-2.4**: El formulario es reactivo (`ReactiveFormsModule` con `FormGroup`).

### FR-3: Validaciones

- **FR-3.1**: Campo email/usuario:
  - Requerido.
  - Formato de email válido (`Validators.email`).
- **FR-3.2**: Campo contraseña:
  - Requerido.
  - Mínimo 6 caracteres.
  - Al menos 1 letra mayúscula (`[A-Z]`).
  - Al menos 1 número (`[0-9]`).
  - Al menos 1 carácter especial (`[!@#$%^&*]`).
- **FR-3.3**: Los mensajes de error se muestran con `<mat-error>` específicos para cada validación fallida.
- **FR-3.4**: Los errores se muestran solo cuando el campo ha sido tocado.

### FR-4: Botón de Submit

- **FR-4.1**: Botón "Iniciar Sesión" con `mat-flat-button` color primary.
- **FR-4.2**: El botón está deshabilitado (`[disabled]`) mientras el formulario sea inválido.
- **FR-4.3**: Al hacer submit con formulario válido, se emiten las credenciales al componente padre (página).

### FR-5: Enlace a Registro

- **FR-5.1**: Debajo del botón aparece un enlace "¿No tienes cuenta? Registrarse".
- **FR-5.2**: El enlace navega a `/registro` usando `routerLink`.

### FR-6: Acción Post-Submit

- **FR-6.1**: La página (orquestador) recibe las credenciales y hace `console.log('Login:', credentials)`.
- **FR-6.2**: En futuro se reemplazará por una llamada a `AuthService.login()`.

---

## Requisitos No Funcionales

### NFR-1: Arquitectura de Componentes

- **NFR-1.1**: Seguir el patrón `pages/` (orquestador) + `components/` (presentacionales).
- **NFR-1.2**: El componente de branding es un componente presentacional separado (`login-branding`).
- **NFR-1.3**: El componente de formulario es un componente presentacional separado (`login-form`).
- **NFR-1.4**: La página (`login-page`) solo orquesta: ensambla los componentes hijos y maneja el evento de login.
- **NFR-1.5**: Cada componente tiene 4 archivos: `.ts`, `.html`, `.css`, `.spec.ts`.

### NFR-2: Responsive

- **NFR-2.1**: En desktop (≥768px): layout de 2 columnas (grid 1fr 1fr).
- **NFR-2.2**: En mobile (<768px): layout de 1 columna (branding arriba, formulario abajo).

### NFR-3: Testing

- **NFR-3.1**: Tests unitarios con Vitest para cada componente.
- **NFR-3.2**: Se requiere `@angular/animations` como dependencia para `provideNoopAnimations()` en tests.
- **NFR-3.3**: Comentarios de tests en español.

### NFR-4: Compatibilidad

- **NFR-4.1**: Compatible con SSR (sin APIs del browser).
- **NFR-4.2**: Mantener lazy loading existente de la ruta `/login`.

### NFR-5: Código

- **NFR-5.1**: Todos los comentarios en español.
- **NFR-5.2**: Documentación JSDoc en todos los componentes y métodos públicos.

---

## Fuera de Alcance (por ahora)

- Integración con backend de autenticación real.
- Página de registro (spec separado).
- Recuperación de contraseña.
- Almacenamiento de tokens/sesión.
- Mostrar/ocultar contraseña (toggle de visibilidad).
