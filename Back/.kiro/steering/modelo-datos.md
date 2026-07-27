# Reglas del Modelo de Datos — Crumbs

## Stack de Persistencia
- **ORM:** Prisma v7 con driver adapter (`@prisma/adapter-pg`)
- **Base de datos:** PostgreSQL 16
- **Producción:** AWS RDS db.t3.micro (Free Tier) con SSL
- **Desarrollo:** PostgreSQL local via Docker (docker-compose.dev.yml)

## Entidades (6 modelos)

### User (@@map: "users")
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | String (UUID) | PK, auto-generated |
| nombre | VarChar(50) | NOT NULL |
| apellido | VarChar(50) | NOT NULL |
| userName | VarChar(30) | UNIQUE, NOT NULL |
| email | VarChar(100) | UNIQUE, NOT NULL |
| password | VarChar(255) | NOT NULL (bcrypt hash) |
| fechaNacimiento | VarChar(10) | nullable, formato "dd/MM/yyyy" |
| avatarUrl | Text | nullable |
| tipoMetodoPago | VarChar(20) | nullable ('clabe', 'tarjeta', 'efectivo', 'paypal') |
| metodoPago | VarChar(100) | nullable (valor del método) |
| createdAt | DateTime | auto |
| updatedAt | DateTime | auto |

### Salida (@@map: "salidas")
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | String (UUID) | PK |
| titulo | VarChar(20) | NOT NULL |
| descripcion | VarChar(100) | nullable |
| codigoInvitacion | VarChar(6) | UNIQUE, NOT NULL |
| fechaCreacion | DateTime | auto |

### SalidaMiembro (@@map: "salida_miembros") — ENTIDAD CENTRAL
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | String (UUID) | PK |
| salidaId | String | FK → Salida (Cascade) |
| userId | String? | FK → User (SetNull), nullable para fantasmas |
| nombreFantasma | VarChar(12) | nullable, usado cuando esFantasma=true |
| esFantasma | Boolean | default: false |
| rol | RolSalida | default: integrante |
| fechaUnion | DateTime | auto |

**Constraint:** @@unique([salidaId, userId]) — un usuario no puede unirse dos veces

### Gasto (@@map: "gastos")
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | String (UUID) | PK |
| salidaId | String | FK → Salida (Cascade) |
| pagadoPorId | String | FK → SalidaMiembro |
| nombre | VarChar(12) | NOT NULL |
| descripcion | VarChar(100) | nullable |
| monto | Int | positivo, máx 9.999.999 (pesos enteros) |
| fecha | DateTime | NOT NULL |
| metodoDivision | MetodoDivision | default: equitativo |
| createdAt | DateTime | auto |

### GastoParticipante (@@map: "gasto_participantes")
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | String (UUID) | PK |
| gastoId | String | FK → Gasto (Cascade) |
| salidaMiembroId | String | FK → SalidaMiembro |
| esInvitado | Boolean | default: false |
| montoManual | Int? | nullable, solo en división manual |

**Constraint:** @@unique([gastoId, salidaMiembroId])

### Pago (@@map: "pagos")
| Campo | Tipo | Constraints |
|-------|------|-------------|
| id | String (UUID) | PK |
| salidaId | String | FK → Salida (Cascade) |
| deudorId | String | FK → SalidaMiembro (quien debe) |
| pagadorId | String | FK → SalidaMiembro (acreedor, a quien le deben) |
| gastoId | String? | FK → Gasto (SetNull), nullable |
| monto | Int | positivo (pesos enteros) |
| estado | EstadoPago | default: pendiente |
| fecha | DateTime | NOT NULL |
| createdAt | DateTime | auto |

## Enums (3)

```prisma
enum MetodoDivision {
  equitativo
  manual
}

enum EstadoPago {
  pendiente
  pagado
}

enum RolSalida {
  creador
  integrante
}
```

## Relaciones Críticas

- **SalidaMiembro es la entidad CENTRAL** para todas las relaciones financieras
- Gasto.pagadoPorId → SalidaMiembro (NO User)
- GastoParticipante.salidaMiembroId → SalidaMiembro (NO User)
- Pago.deudorId y Pago.pagadorId → SalidaMiembro (NO User)
- SalidaMiembro.userId → User (nullable para fantasmas)
- Salida → SalidaMiembro[] (Cascade: borrar salida borra miembros)
- Gasto → GastoParticipante[] (Cascade: borrar gasto borra participantes)
- Pago.gastoId → Gasto (SetNull: borrar gasto NO borra el pago)

## Fantasmas (miembros sin cuenta)

- esFantasma=true, userId=NULL, nombreFantasma=VarChar(12)
- Participan en gastos y pagos a través de SalidaMiembro
- Solo el creador de la salida puede agregar/gestionar fantasmas
- Creador puede confirmar pagos donde el acreedor es fantasma

## Constraints que NUNCA se deben violar
- userId IS NOT NULL **OR** nombreFantasma IS NOT NULL (en SalidaMiembro)
- Montos: INTEGER, positivos, máximo 7 dígitos (9.999.999)
- codigoInvitacion: exactamente 6 caracteres, UNIQUE
- Gasto.nombre: máximo 12 caracteres
- Salida.titulo: máximo 20 caracteres
- Salida.descripcion: máximo 100 caracteres, nullable
- User.nombre: máximo 50 caracteres
- User.apellido: máximo 50 caracteres
- UNIQUE(gastoId, salidaMiembroId) en GastoParticipante
- UNIQUE(salidaId, userId) en SalidaMiembro (cuando userId no es NULL)

## Reglas del Motor de División
- **Equitativo:** cuota = monto / no-invitados. Residuo (centavos de peso) se carga al pagador.
- **Manual:** suma de montoManual de participantes no-invitados == Gasto.monto (exacto, sin tolerancia)
- **Invitados (esInvitado=true):** montoManual=0, NO se incluyen en la división equitativa
- Todos marcados como invitados → RECHAZAR (debe haber al menos 1 no-invitado)

## Reglas de Pagos
- Estado inicial SIEMPRE 'pendiente'
- Solo el **acreedor** (pagadorId) puede cambiar estado a 'pagado'
- Excepción: creador de salida confirma pagos donde acreedor es fantasma
- Monto del pago no puede superar la deuda actual
- Pagos sin gastoId (pagos generales) se consideran al calcular balances
- Solo el deudor puede registrar un pago

## Al modificar el schema
1. Actualizar `prisma/schema.prisma`
2. Generar migración: `npx prisma migrate dev --name descripcion-cambio`
3. O en desarrollo rápido: `npx prisma db push`
4. Actualizar DTOs si cambian campos
5. Verificar que los tests reflejen los nuevos campos
6. En CI: `prisma generate` corre con DATABASE_URL dummy (no necesita DB real)

## Convenciones de DTOs
- Frontend envía DTOs con solo IDs (no objetos completos)
- Miembro.id en el frontend siempre corresponde a SalidaMiembro.id
- El backend transforma SalidaMiembro+User → Miembro plano (via transform-miembro.helper.ts)
