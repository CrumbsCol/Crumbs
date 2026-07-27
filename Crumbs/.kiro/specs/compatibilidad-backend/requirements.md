# Requisitos — Compatibilidad Frontend ↔ Backend

## Objetivo

Garantizar que las interfaces, DTOs y flujos de datos del frontend estén alineados con el modelo de base de datos y los endpoints del backend, permitiendo una integración sin fricciones al desactivar el modo mock.

---

## Requisitos Funcionales

### RF-01: DTOs de Request

El frontend debe enviar payloads con **solo IDs y datos mínimos** al backend, sin objetos anidados completos.

- `CrearGastoRequest`: envía `pagadoPorMiembroId` (string) en vez del objeto `Miembro` completo.
- `RegistrarPagoRequest`: envía `deudorId` y `pagadorId` como IDs de `SalidaMiembro`.
- `AgregarIntegranteRequest`: envía `userName` (registrado) o `nombreFantasma` (fantasma).

### RF-02: Interface Miembro compatible con SalidaMiembro

La interface `Miembro` del frontend debe poder representar tanto usuarios registrados como fantasmas:
- `esFantasma?: boolean` para distinguir el tipo.
- `rol?: 'creador' | 'integrante'` para el rol en la salida.
- `Miembro.id` corresponde a `SalidaMiembro.id` (no a `User.id`).

### RF-03: Registro con nombre y apellido separados

El formulario de registro envía `nombre` y `apellido` como campos separados (máx 50 chars cada uno), alineado con la tabla User de la BD.

### RF-04: Validación de montos como enteros

Los montos de gastos y pagos deben ser **enteros positivos** (sin decimales). Se valida en frontend con `Validators.pattern(/^\d+$/)` y en backend con `@IsInt()`.

### RF-05: Descripción en Salida

La salida incluye un campo `descripcion` opcional (máx 100 chars) que se envía al crear y se muestra en el detalle.

### RF-06: Integrantes al crear salida

Al crear una salida desde el modal del dashboard, el usuario puede agregar integrantes (registrados o fantasmas) que quedan guardados como miembros iniciales.

---

## Requisitos No Funcionales

### RNF-01: El backend transforma datos al responder

El backend hace JOIN entre `SalidaMiembro` y `User` para devolver objetos planos tipo `Miembro` como espera el frontend. El frontend **nunca** conoce la estructura interna de la tabla pivote.

### RNF-02: Migración transparente de mocks a HTTP

Los servicios del frontend (`SalidaService`, `AuthService`) están diseñados para reemplazar los datos mock por llamadas HTTP sin modificar los componentes consumidores.
