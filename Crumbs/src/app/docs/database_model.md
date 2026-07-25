# Modelo de Base de Datos y Endpoints (Backend)

A continuación te detallo el diseño de la base de datos relacional y los endpoints sugeridos para la API REST del backend, basándome estrictamente en las interfaces y casos de uso actuales del frontend de **Crumbs**.

---

## 1. Modelo de Base de Datos (Entity Relationship)

Este diseño está pensado para una base de datos relacional (como PostgreSQL o MySQL).

### Entidad `users`
Almacena la información del perfil global de los usuarios registrados.
- `id` (UUID, Primary Key)
- `nombre` (Varchar, Not Null)
- `user_name` (Varchar, Unique, Not Null)
- `email` (Varchar, Unique, Nullable)
- `fecha_nacimiento` (Date, Not Null)
- `avatar_url` (Varchar, Nullable)
- `tipo_metodo_pago` (Varchar, Nullable) - *Ej. clabe, tarjeta, paypal*
- `metodo_pago` (Varchar, Nullable) - *Datos de la cuenta o tarjeta*
- `password_hash` (Varchar, Not Null) - *Manejado solo en backend*
- `created_at` (Timestamp, Default NOW)

### Entidad `salidas`
Almacena los eventos o grupos donde se registrarán los gastos.
- `id` (UUID, Primary Key)
- `titulo` (Varchar, Not Null)
- `codigo_invitacion` (Varchar(6), Unique, Not Null)
- `fecha_creacion` (Timestamp, Default NOW)

### Entidad `salidas_miembros` (Relación M:N / Integrantes)
Relaciona a los usuarios con las salidas. Puede incluir "miembros fantasma" (usuarios sin cuenta real).
- `id` (UUID, Primary Key)
- `salida_id` (UUID, Foreign Key a `salidas`)
- `user_id` (UUID, Foreign Key a `users`, Nullable para fantasmas)
- `nombre_fantasma` (Varchar, Nullable) - *Si user_id es nulo*
- `rol` (Varchar) - Ej. 'admin', 'integrante'
- `joined_at` (Timestamp, Default NOW)

### Entidad `gastos`
Almacena el detalle de un gasto específico dentro de una salida.
- `id` (UUID, Primary Key)
- `salida_id` (UUID, Foreign Key a `salidas`)
- `nombre` (Varchar, Not Null)
- `descripcion` (Text, Nullable)
- `monto` (Decimal(10,2), Not Null)
- `fecha` (Timestamp, Not Null)
- `metodo_division` (Enum: 'equitativo', 'manual')
- `pagado_por_miembro_id` (UUID, Foreign Key a `salidas_miembros`)
- `created_at` (Timestamp, Default NOW)

### Entidad `gastos_participantes`
Tabla pivote que indica cómo se dividió el gasto entre los miembros.
- `gasto_id` (UUID, Foreign Key a `gastos`)
- `miembro_id` (UUID, Foreign Key a `salidas_miembros`)
- `es_invitado` (Boolean, Default FALSE) - *Si alguien más invitó a esta persona*
- `monto_manual` (Decimal(10,2), Nullable) - *Solo usado si metodo_division es 'manual'*
- *Primary Key Compuesta: (`gasto_id`, `miembro_id`)*

### Entidad `pagos`
Registra las deudas saldadas (o pendientes de saldar) entre dos miembros.
- `id` (UUID, Primary Key)
- `salida_id` (UUID, Foreign Key a `salidas`)
- `deudor_id` (UUID, Foreign Key a `salidas_miembros`)
- `pagador_id` (UUID, Foreign Key a `salidas_miembros`)
- `gasto_id` (UUID, Foreign Key a `gastos`, Nullable) - *Si el pago es específico para un gasto*
- `monto` (Decimal(10,2), Not Null)
- `estado` (Enum: 'pendiente', 'pagado')
- `fecha` (Timestamp, Default NOW)
- `updated_at` (Timestamp, Default NOW)

---

## 2. Definición de Endpoints (API REST)

Todas las rutas (excepto Auth) asumen que reciben un token JWT válido en el header `Authorization: Bearer <token>`.

### Autenticación & Usuario
- `POST /api/auth/register` - Registra un usuario nuevo.
- `POST /api/auth/login` - Autenticación y retorno de JWT.
- `GET /api/users/me` - Obtiene la información del usuario en sesión.

### Salidas
- `GET /api/salidas`
  - *Retorna todas las salidas (activas/históricas) a las que pertenece el usuario logueado.*
- `POST /api/salidas`
  - *Crea una nueva salida y genera el `codigo_invitacion`. El creador se añade como miembro.*
- `GET /api/salidas/:id`
  - *Obtiene el detalle completo de la salida (incluye miembros, listado de gastos y pagos).*
- `POST /api/salidas/join`
  - *Body: `{ codigoInvitacion: "A3B9X2" }`*
  - *El usuario logueado se une a la salida correspondiente a ese código.*
- `POST /api/salidas/:id/miembros-fantasmas`
  - *Añade a una persona que no tiene cuenta en la app al grupo (se guarda en `salidas_miembros` sin `user_id`).*

### Gastos
- `POST /api/salidas/:id/gastos`
  - *Crea un nuevo gasto. El body debe incluir los datos básicos (monto, nombre, pagador_id) y el arreglo de participantes con sus banderas (esInvitado, montoManual).*
- `PUT /api/salidas/:id/gastos/:gastoId`
  - *Edita la información o la distribución de un gasto.*
- `DELETE /api/salidas/:id/gastos/:gastoId`
  - *Elimina el gasto y recalcula (o invalida) los balances.*

### Pagos (Liquidación de Deudas)
- `POST /api/salidas/:id/pagos`
  - *Body: `{ deudorId, pagadorId, monto, gastoId }`*
  - *Registra que una persona va a pagar una deuda. Se crea con estado `pendiente`.*
- `PUT /api/salidas/:id/pagos/:pagoId/confirmar`
  - *Cambia el estado del pago a `pagado` y asienta la fecha/hora en la que el acreedor confirmó haber recibido el dinero.*

> [!TIP]
> **Lógica de Balances:** El cálculo de quién le debe a quién (`balanceGlobal`) actualmente se hace en el Frontend iterando los gastos y pagos. Para el Backend, recomiendo devolver los gastos y pagos tal cual en `GET /api/salidas/:id` y mantener el cálculo dinámico en el Frontend. Si el grupo crece mucho, podrías crear un endpoint `GET /api/salidas/:id/balances` que haga la consolidación mediante sentencias SQL (GROUP BY deudor, acreedor).
