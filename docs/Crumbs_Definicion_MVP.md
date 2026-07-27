# Crumbs — Definición del MVP

## 1. En una frase

**Crumbs** divide gastos de salidas grupales sin fricción: creas una salida, agregas a los integrantes, registran quién pagó cada gasto, y la app calcula exactamente quién le debe a quién — respetando invitados que no pagan y distintas formas de repartir.

## 2. El problema

Dividir una cuenta grupal en la vida real es un desastre:

- Alguien adelanta la plata y luego tiene que perseguir a los demás.
- El cumpleañero no debería pagar, pero las apps existentes lo obligan a dividir parejo.
- En una salida pagan varias personas cosas distintas y nadie lleva la cuenta neta.
- No todos tienen el mismo presupuesto: a veces la división justa es por montos fijos o por porcentaje, no por cabezas.

La gente termina resolviéndolo con notas de WhatsApp, calculadora y memoria. Se cometen errores y se generan roces.

## 3. Usuario objetivo

Grupos de amigos, compañeros o familia que hacen salidas y necesitan repartir gastos de forma clara y sin conflictos. El usuario que **crea la salida y adelanta dinero** es nuestro usuario primario: es quien más sufre el problema.

## 4. Qué nos diferencia

Tres cosas que las apps comunes no hacen bien:

1. **Invitados que no pagan y sin registro** — marca al cumpleañero como invitado y su parte se reparte entre los demás; los invitados pueden agregarse solo por nombre ("invitado fantasma"), sin crear cuenta.
2. **Varias formas de dividir** — equitativa, por valores manuales en pesos, o por porcentaje según el presupuesto de cada quien.
3. **Seguimiento de pagos** — cada quien registra su pago y el pagador confirma la recepción, con balance detallado de quién le pagó y quién le debe.

## 5. Glosario (términos del producto)

Definiciones acordadas por el equipo. Se usan igual en el código, el diseño y la documentación:

- **Salida**: un grupo de gastos. Es el espacio donde conviven los integrantes y todos los gastos de un plan.
- **Gasto**: un registro individual dentro de una salida (monto, título, fecha, quién pagó y entre quiénes se divide).
- **Integrante**: cualquier persona dentro de la salida. Puede ser registrada (tiene cuenta) o fantasma (agregada solo por nombre).
- **Pagador**: la persona que puso el dinero de un gasto (uno por gasto; distintos gastos pueden tener distintos pagadores).
- **Participante**: las personas entre las que se divide un gasto.
- **Invitado** (`is_guest`, por gasto): participante que no paga en ese gasto; su parte la absorben los que sí pagan.

> **Subcategorías:** no existen en el producto. Se descartaron por decisión del equipo.

## 6. Alcance del MVP

Funcionalidades comprometidas. El flujo completo de principio a fin debe funcionar y estar desplegado.

| # | Funcionalidad | Descripción |
|---|---------------|-------------|
| F1 | Autenticación | Registro e inicio de sesión de usuarios. |
| F2 | Crear salida | Un usuario crea una salida con nombre. |
| F3 | Agregar integrantes | Por nombre (invitado fantasma), por código de 6 caracteres. |
| F4 | Registrar gasto | Monto, título, fecha, descripción, quién pagó (selección manual del integrante que adelantó el dinero) y qué participantes entran. |
| F5 | Marcar invitados | Por gasto, excluir a un participante del cobro (switch "invitado"). |
| F6 | División equitativa y manual | Repartir por cabezas, o asignar valores fijos en pesos por integrante. |
| F7 | Balances | Ver el saldo por gasto y el consolidado de toda la salida (quién debe / le deben). |
| F8 | Registro de pago | Marcar un pago como realizado; el pagador confirma la recepción (pendiente / pagado). |

## 7. Roles y vistas

Qué puede hacer y ver cada quien:

- **Creador de la salida**: crea la salida y agrega a los integrantes.
- **Cualquier integrante**: puede registrar un gasto que él pagó, y puede agregar nuevos integrantes. Los integrantes nuevos aplican solo a gastos futuros de la salida.
- **Pagador de un gasto**: ve el balance detallado — cuánto le han pagado y cuánto le deben, con el desglose por integrante.
- **Integrante que debe (no pagó)**: ve la opción de registrar su pago o marcarlo como pagado, y puede dejar una nota al pagador.
- **Invitado**: solo ve los gastos en los que fue seleccionado.

**Regla clave del balance:** un integrante solo habilita las opciones de balance de un gasto si es la misma persona que lo pagó. Esto evita que cualquiera altere cuentas que no le corresponden.

## 8. Flujo principal del usuario (happy path)

El recorrido que la demo debe mostrar de principio a fin:

1. **Ana** se registra e inicia sesión.
2. Ana crea la salida **"Cumpleaños de Luis"** y agrega a Beto, Carla y Luis (por nombre, o compartiendo el código **ABC123** / QR).
3. Ana registra el gasto **"Cena restaurante" · $200.000**, que ella pagó, con todos como participantes.
4. Ana marca a **Luis como invitado** (es el cumpleañero, no paga).
5. La app divide en partes iguales entre los que sí pagan (Ana, Beto, Carla).
6. Beto registra su pago; Ana lo **confirma** y su saldo queda saldado.
7. La pantalla de **balance** muestra el estado por gasto y el consolidado de la salida.

Si este recorrido funciona sin errores y está desplegado, **tenemos entrega**. Todo lo demás es mejora.

## 9. Reglas de negocio del motor de división

El motor matemático es el corazón del producto.

### Base del balance

- **Saldo neto** de una persona = (total que adelantó en la salida) − (total que le corresponde pagar en la salida).
- Saldo positivo → **le deben**. Saldo negativo → **debe**.
- El balance se puede ver por gasto y consolidado por salida.

### Regla 1 — División equitativa

`cuota = Total del gasto / (participantes que NO son invitados)`

- Los invitados no reciben cuota.
- **Redondeo:** cada cuota se redondea al peso; el residuo se le carga al pagador.

**Ejemplo — Salida "Cumpleaños de Luis":** Gasto $200.000, pagó Ana, participan Ana/Beto/Carla/Luis, Luis es invitado.

| Persona | Adelantó | Le corresponde | Saldo neto |
|---------|----------|----------------|------------|
| Ana | $200.000 | $66.666 | +133.334 (le deben) |
| Beto | $0 | $66.667 | −66.667 (debe) |
| Carla | $0 | $66.667 | −66.667 (debe) |
| Luis | $0 | $0 | 0 (invitado) |

### Regla 2 — División por valores manuales (en pesos)

- El usuario asigna a mano cuánto pone cada participante, en pesos.
- La suma de los valores debe ser **exactamente igual** al total del gasto. Si no cuadra, no se guarda.
- Los invitados no llevan valor.

## 10. Seguimiento de pagos

Crumbs no mueve dinero: registra y da seguimiento a los pagos entre integrantes.

- **Estados de un saldo:** pendiente → pagado
- El integrante que debe **registra su pago**; el pagador lo **confirma** para dejarlo saldado.
- **Stretch:** adjuntar comprobante, validar si el dinero llegó, y dejar/responder una nota entre las partes.

## 11. Amigos y grupos favoritos (stretch)

Sirve para armar gastos más rápido reutilizando a las personas con las que sales seguido. Es stretch: se activa solo si el flujo central (salida, gasto, división y balance) está verde.

### Cómo se agrega un amigo (Opción D — híbrido, sin solicitudes)

- **Sugeridos desde salidas**: la app propone personas con las que ya compartiste una salida y que aún no son tus amigos. Es una consulta al vuelo, no una relación guardada, hasta que decides agregarla.
- **Agregar por nickname**: buscas a un usuario por su nickname exacto y lo sumas a tu lista.
- **Mutua y auto-aceptada**: en el MVP no hay bandeja ni aprobación; la amistad queda activa al instante.
- **Solo usuarios registrados**: los invitados fantasma (por nombre) siguen existiendo y conviven en la misma salida.

## 12. Modelo de datos conceptual

Entidades mínimas y sus relaciones (el detalle técnico se define en el diseño):

- **Usuario** — quien usa la app (registrado).
- **Salida** — tiene un código único de 6 caracteres y muchos integrantes.
- **Integrante** — persona dentro de una salida; registrada (ligada a un Usuario) o fantasma (solo nombre).
- **Gasto** — pertenece a una salida; tiene monto, título, fecha, un pagador y un método de división.
- **Participación en gasto** — relación gasto ↔ integrante; incluye `is_guest` y el valor/porcentaje según el método.
- **Pago** — registro de un abono de un integrante hacia un pagador, con su estado.
- **Amistad** (stretch) — relación personal usuario ↔ amigo; incluye `status` (MVP: accepted), la dirección (quién agregó) y `source` (code | sugerido_salida).

## 13. Definición de "Terminado" (Definition of Done)

El MVP es entregable cuando **todo** lo siguiente es verdadero:

- ☐ Un usuario puede registrarse, crear una salida y agregar integrantes (nombre, código o QR).
- ☐ Se puede registrar un gasto con pagador, participantes e invitados.
- ☐ La división equitativa y la de valores manuales calculan correctamente (invitados y redondeo incluidos).
- ☐ El balance muestra el saldo correcto por gasto y consolidado por salida.
- ☐ Un integrante puede registrar un pago y el pagador confirmarlo.
- ☐ Cada rol ve lo que le corresponde (pagador, deudor, invitado).
- ☐ Todo el flujo funciona en la aplicación desplegada en AWS (no solo en local).
- ☐ Existe documentación: README, diagrama de arquitectura y sección de uso de Kiro.
- ☐ El motor de división tiene pruebas unitarias: invitados, redondeo y valores manuales.

## 14. Restricciones técnicas

Lo único definido en este momento son las obligaciones del reglamento del hackathon:

- **Servicios de AWS** — de uso obligatorio. No se permite ningún otro proveedor de nube.
- **Kiro** — de uso obligatorio como herramienta de desarrollo.

**La arquitectura concreta está pendiente de definir con el equipo.** Los servicios específicos de AWS, el framework de frontend, la base de datos y demás decisiones técnicas se acordarán en conjunto y se documentarán aquí antes del 20 de julio. Este documento no fija esas elecciones para no dar contexto no aprobado.

## 15. Roadmap post-MVP

Lo que viene después demuestra que hay visión de producto:

1. División por porcentaje y comprobantes de pago validados.
2. **Solicitud de amistad (Opción B)** — aceptar/rechazar, bandeja de solicitudes y notificaciones. Evolución natural del módulo de amigos, ya previsto en el modelo de datos.
3. **Salidas favoritas / recurrentes** con integrantes fijos.
4. **Control de presupuesto** con alertas de sobregasto por salida.
5. **Notificaciones y recordatorios** automáticos de vencimiento y de pago recibido.
6. **Módulo Casas** — servicios públicos con un solo contador (cabezas, porcentaje u horario de locales).
7. **Módulo Cadenas** — pagos rotativos entre integrantes.
8. **Simplificación de deudas** y app móvil nativa.

## 16. Decisiones y preguntas resueltas

- **¿El invitado debe registrarse?** No. Para el MVP los invitados pueden ser fantasma (solo nombre). Si alguien quiere ver su propio balance, se une con el código/QR y crea cuenta.
- **¿Existirán invitados fantasma?** Sí. Es la forma más simple de sumar gente a una salida sin fricción de registro.
- **¿Un gasto tiene un solo pagador?** Sí en el MVP; pero cada gasto puede tener un pagador distinto, y el balance neto se calcula sobre toda la salida.
- **Módulo de amigos:** se hace con la Opción D (sin solicitudes), pero modelado para evolucionar a la Opción B sin migración. Se incluye el campo `source` para saber cómo se agregó cada amigo (mejor UX y analítica a futuro).
- **Nombre del producto:** "Crumbs" es provisional. Si el equipo define otro, se cambia.
