# Requisitos — Feature de Salidas

## Descripción General

El feature de **Salidas** permite gestionar eventos grupales donde los participantes comparten gastos. Cada salida tiene miembros, gastos registrados y un sistema de balances que calcula cuánto debe o le deben a cada persona.

---

## Requisitos Funcionales

### RF-01: Visualización del detalle de una salida

- El usuario puede acceder al detalle de una salida mediante la ruta `/salidas/:id`.
- Al navegar a la ruta, se carga la salida correspondiente al ID proporcionado.
- Se muestra el nombre de la salida, la lista de miembros, los gastos registrados y los balances.
- Si la salida no existe, se muestra un mensaje de error o se redirige al dashboard.

### RF-02: Visualización de balances por miembro

- Se muestra una tarjeta con el balance neto de cada miembro de la salida.
- El balance indica cuánto debe (negativo) o cuánto le deben (positivo) a cada persona.
- Los balances se calculan automáticamente a partir de los gastos registrados.

### RF-03: Visualización de gastos registrados

- Se muestra una lista de todos los gastos de la salida.
- Cada gasto muestra: descripción, monto total, quién pagó y fecha.
- La lista se ordena por fecha (más reciente primero).

### RF-04: Desglose por gasto

- Se puede ver el desglose de cada gasto: quién pagó y cuánto le corresponde a cada participante.
- El desglose muestra la distribución del monto entre los participantes del gasto.

### RF-05: Agregar un nuevo gasto

- El usuario puede abrir un drawer lateral para registrar un nuevo gasto.
- El formulario solicita: descripción, monto, quién pagó y entre quiénes se divide.
- Al confirmar, el gasto se agrega a la salida y los balances se recalculan.
- El drawer se cierra al confirmar o cancelar.

### RF-06: Agregar integrantes a la salida

- El usuario puede abrir un drawer lateral para agregar nuevos miembros.
- Se busca al usuario por username o email.
- Al confirmar, el miembro se agrega a la lista de participantes de la salida.
- El drawer se cierra al confirmar o cancelar.

### RF-07: Navegación desde el dashboard

- Desde el dashboard, al hacer clic en una salida activa, se navega a `/salidas/:id`.
- La navegación usa el router de Angular con lazy loading.

---

## Requisitos No Funcionales

### RNF-01: Rendimiento

- La carga del detalle de una salida debe ser inmediata con datos mock (< 100ms).
- Los cálculos de balances se realizan de forma reactiva mediante signals.

### RNF-02: Responsividad

- La página de detalle se adapta a pantallas móviles (breakpoint en `max-width: 767px`).
- Los drawers laterales ocupan el ancho completo en móvil.

### RNF-03: Consistencia visual

- Se utiliza Angular Material M3 con la paleta magenta/violet del proyecto.
- Los componentes usan `appearance="outline"` para inputs de Material.
- Layout con Tailwind CSS para spacing y distribución.

### RNF-04: Modo mock

- En desarrollo (`environment.useMocks === true`), se usan 2 salidas pre-cargadas (IDs '1' y '2').
- El servicio simula respuestas sin hacer peticiones HTTP reales.

### RNF-05: Testabilidad

- Cada componente tiene su archivo `.spec.ts` con tests unitarios en Vitest.
- Los componentes presentacionales se testean de forma aislada (sin servicios).
