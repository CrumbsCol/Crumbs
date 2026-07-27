# Diseño — Compatibilidad Frontend ↔ Backend

## Interfaces DTOs creadas

Archivo: `src/app/core/interfaces/salida-request.interface.ts`

```typescript
// Auth
RegistroRequest       { nombre, apellido, email, userName, password, fechaNacimiento }

// Salidas
CrearSalidaRequest    { titulo, descripcion?, fecha }
UnirseASalidaRequest  { codigoInvitacion }

// Integrantes
AgregarIntegranteRequest  { userName?, nombreFantasma? }

// Gastos
CrearGastoRequest     { nombre, descripcion?, monto, fecha, metodoDivision, pagadoPorMiembroId, participantes[] }
ParticipanteRequest   { salidaMiembroId, esInvitado, montoManual }

// Pagos
RegistrarPagoRequest  { deudorId, pagadorId, monto, gastoId? }
```

---

## Mapeo Frontend → Backend

| Frontend envía | Backend recibe | Backend almacena |
|---|---|---|
| `pagadoPorMiembroId` | ID del SalidaMiembro | FK → SalidaMiembro.id |
| `participantes[].salidaMiembroId` | ID del SalidaMiembro | FK → SalidaMiembro.id |
| `deudorId` / `pagadorId` | IDs de SalidaMiembro | FK → SalidaMiembro.id |
| `nombre` + `apellido` (registro) | Campos separados | User.nombre + User.apellido |

---

## Mapeo Backend → Frontend

| Backend almacena | Backend responde | Frontend consume |
|---|---|---|
| `SalidaMiembro` + JOIN `User` | Objeto plano `Miembro` | Interface `Miembro` |
| `SalidaMiembro.id` | `Miembro.id` | Usado en pagos/gastos |
| `User.nombre` + `User.apellido` | Puede concatenarse | `User.nombre` + `User.apellido` |
| `Salida.descripcion` (nullable) | `descripcion` o null | `Salida.descripcion?` |

---

## Cambios al Modelo de BD

| Tabla | Antes | Después |
|---|---|---|
| User | `nombre VARCHAR(100) NOT NULL` | `nombre VARCHAR(50) NOT NULL` + `apellido VARCHAR(50) NOT NULL` |
| Salida | Sin descripción | `descripcion VARCHAR(100) NULL` |

---

## Validaciones alineadas Front ↔ Back

| Campo | Frontend | Backend |
|---|---|---|
| Monto gasto | `Validators.pattern(/^\d+$/)` + min(1) + max(9999999) | `@IsInt() @Min(1) @Max(9999999)` |
| Nombre gasto | `maxLength(12)` | `@MaxLength(12)` |
| Título salida | `required` | `@IsNotEmpty() @MaxLength(20)` |
| Código invitación | `pattern(/^[a-zA-Z0-9]+$/)` | `@Length(6) @IsAlphanumeric()` |
| Nombre usuario | `required, maxLength(50)` | `@IsNotEmpty() @MaxLength(50)` |
| Apellido | `required, maxLength(50)` | `@IsNotEmpty() @MaxLength(50)` |
