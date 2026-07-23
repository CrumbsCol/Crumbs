# Requirements Document

## Introduction

El módulo `dashboard-view` es la vista principal de la aplicación Crumbs. Presenta un saludo personalizado al usuario, acciones rápidas para gestionar salidas, y una lista de salidas activas. El componente es standalone, utiliza Angular Signals para el estado local y se integra con Angular Material (M3, tema Purple) y Tailwind CSS 4 para el estilizado.

La restricción crítica de diseño excluye cualquier Header, Navbar, Logo o botones de navegación global del componente, ya que éstos se gestionan a nivel de aplicación.

## Glossary

- **Dashboard**: Vista principal del módulo `features/dashboard`, accesible como ruta del router.
- **Salida**: Entidad del dominio que representa una ruta o itinerario activo del usuario.
- **Nick_Name**: Alias o nombre corto del usuario autenticado, gestionado mediante Angular Signal.
- **Dashboard_Component**: Componente Angular standalone que implementa la vista del dashboard.
- **Salidas_List**: Subcomponente o sección visual que muestra las salidas activas del usuario.
- **Action_Buttons**: Botones de acción principal ("Crear Salida", "Agregar Salida") ubicados en la columna izquierda del layout.

---

## Requirements

### Requirement 1: Mensaje de Bienvenida

**User Story:** As a usuario autenticado, I want ver un saludo personalizado en la parte superior del dashboard, so that me sienta reconocido al iniciar sesión en la aplicación.

#### Acceptance Criteria

1. THE Dashboard_Component SHALL renderizar un elemento `<h1>` cuyo texto sea `¡Hola, [Nick_Name]!`, donde `[Nick_Name]` es reemplazado por el valor actual del Signal, y dicho `<h1>` SHALL ser el primer elemento visible en la vista.
2. THE Dashboard_Component SHALL gestionar el valor de Nick_Name mediante un Angular Signal de tipo `string` con valor por defecto de cadena vacía `""`.
3. WHEN el valor del Signal de Nick_Name cambia, THE Dashboard_Component SHALL actualizar el texto del `<h1>` en un máximo de 100 ms sin recargar la página.
4. WHEN el Signal de Nick_Name contiene una cadena vacía `""`, THE Dashboard_Component SHALL renderizar el `<h1>` con el texto `¡Hola, !` (sin nombre) sin lanzar ningún error.

---

### Requirement 2: Layout Responsive de Dos Columnas

**User Story:** As a usuario, I want que el dashboard se adapte a distintos tamaños de pantalla, so that pueda usarlo correctamente tanto en dispositivos móviles como en escritorio.

#### Acceptance Criteria

1. THE Dashboard_Component SHALL implementar un layout de cuadrícula con una columna (`grid-cols-1`) en viewports menores a `768px` de ancho.
2. THE Dashboard_Component SHALL implementar un layout de cuadrícula con dos columnas proporcionales (`grid-cols-2`) en viewports de `768px` de ancho o superiores.
3. THE Dashboard_Component SHALL aplicar espaciado entre columnas mediante clases de Tailwind CSS 4 (`gap-*`) con un valor entre `16px` y `32px`.
4. WHEN el viewport cruza el umbral de `768px` de ancho (en cualquier dirección), THE Dashboard_Component SHALL recalcular y aplicar el número de columnas correcto sin recargar la página.
5. WHEN el contenido de una columna supera la altura de la otra, THE Dashboard_Component SHALL mantener cada columna en su ancho asignado sin desbordamiento horizontal.

---

### Requirement 3: Columna de Acciones (Action Buttons)

**User Story:** As a usuario, I want acceder a las acciones principales de salidas desde el dashboard, so that pueda iniciar el flujo de creación o incorporación de salidas rápidamente.

#### Acceptance Criteria

1. THE Dashboard_Component SHALL renderizar exactamente dos botones de acción en la columna izquierda del layout con etiquetas exactas: "Crear Salida" y "Agregar Salida".
2. THE Dashboard_Component SHALL presentar los botones utilizando el componente `mat-flat-button` de Angular Material.
3. THE Dashboard_Component SHALL aplicar el color primario del tema (`--mat-sys-primary`) a los botones mediante las variables CSS del tema Material Design 3.
4. THE Dashboard_Component SHALL disponer los botones en disposición vertical apilada con un espaciado de al menos `8px` entre ellos.
5. WHEN el usuario hace clic en el botón "Crear Salida", THE Dashboard_Component SHALL navegar a la ruta de creación de salida; IF no existe ruta configurada, THEN SHALL emitir un evento de output llamado `crearSalida`.
6. WHEN el usuario hace clic en el botón "Agregar Salida", THE Dashboard_Component SHALL navegar a la ruta de incorporación de salida; IF no existe ruta configurada, THEN SHALL emitir un evento de output llamado `agregarSalida`.
7. WHEN el usuario hace clic en cualquier botón de acción y la navegación falla, THE Dashboard_Component SHALL no dejar la interfaz en un estado bloqueado ni lanzar una excepción no controlada.

---

### Requirement 4: Columna de Salidas Activas (Salidas List)

**User Story:** As a usuario, I want ver la lista de mis salidas activas en el dashboard, so that pueda identificar y acceder rápidamente a mis itinerarios en curso.

#### Acceptance Criteria

1. THE Dashboard_Component SHALL renderizar un contenedor tipo card en la columna derecha del layout, titulado "Mis Salidas Activas".
2. THE Salidas_List SHALL mostrar al menos un ítem de salida compuesto por un `Menu Label` (máximo 60 caracteres) y un `Menu description` (máximo 120 caracteres).
3. THE Salidas_List SHALL gestionar la colección de salidas activas mediante un Angular Signal de tipo array con un máximo de 50 ítems.
4. THE Dashboard_Component SHALL aplicar un estilo de estado activo/seleccionado (fondo destacado con color oscuro) al primer ítem de la lista de salidas.
5. THE Dashboard_Component SHALL aplicar un estilo de estado secundario (sin destacado) a los ítems restantes de la lista de salidas.
6. WHEN la lista de salidas activas está vacía, THE Dashboard_Component SHALL mostrar un mensaje indicando que no hay salidas activas.
7. WHEN el texto de `Menu Label` supera 60 caracteres, THE Dashboard_Component SHALL truncar el texto con elipsis (`...`) sin desbordamiento del contenedor.
8. WHEN el texto de `Menu description` supera 120 caracteres, THE Dashboard_Component SHALL truncar el texto con elipsis (`...`) sin desbordamiento del contenedor.

---

### Requirement 5: Conformidad Técnica y Accesibilidad

**User Story:** As a desarrollador, I want que el componente cumpla con los estándares técnicos del proyecto, so that sea mantenible, accesible e integrable sin fricción en la aplicación.

#### Acceptance Criteria

1. THE Dashboard_Component SHALL ser declarado con `standalone: true` en el decorador `@Component` (sin NgModule).
2. THE Dashboard_Component SHALL utilizar Angular Signals exclusivamente para la gestión del estado local, excluyendo propiedades de clase mutables y `BehaviorSubject`.
3. THE Dashboard_Component SHALL importar únicamente los módulos de Angular Material necesarios para su renderizado, sin módulos no utilizados en el template.
4. THE Dashboard_Component SHALL combinar estilos de Tailwind CSS 4 en el template con estilos SCSS encapsulados en el archivo `.component.scss`, sin estilos inline en el template.
5. THE Dashboard_Component SHALL excluir cualquier elemento de Header, Navbar, Logo o botones de sesión global en su template.
6. IF el componente se renderiza en el servidor (SSR con Express 5), THEN THE Dashboard_Component SHALL diferir cualquier acceso a `document`, `window` o `localStorage` hasta que el entorno de cliente esté disponible, sin lanzar errores durante la fase SSR.
7. THE Dashboard_Component SHALL incluir atributos ARIA (`aria-label`, `role`) con un nombre accesible no vacío en todos los botones, enlaces y controles de formulario del template.
8. WHEN la lista de salidas activas está vacía, THE Dashboard_Component SHALL renderizar un elemento con `role="status"` que contenga un mensaje visible para lectores de pantalla.
