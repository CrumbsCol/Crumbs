# Crumbs — Backend

API REST construida con **NestJS 11** + **Prisma v7** + **PostgreSQL 16**. Gestiona la lógica de negocio para dividir gastos de salidas grupales: autenticación, creación de salidas, registro de gastos, cálculo de balances y liquidación de deudas.

---

## Arquitectura

El backend sigue una arquitectura modular por dominio. Cada módulo encapsula su controller, service y DTOs.

```
AppModule
├── PrismaModule      → Conexión a PostgreSQL (global)
├── AuthModule        → Registro, login, JWT
├── UsersModule       → Perfil, búsqueda, balance detallado
├── SalidasModule     → CRUD de salidas, miembros, fantasmas
├── GastosModule      → Creación de gastos con división
└── PagosModule       → Pagos/liquidaciones, balances por salida
```

### Componentes Globales

| Componente | Función |
|------------|---------|
| `ValidationPipe` | Valida DTOs con class-validator (whitelist + transform + forbidNonWhitelisted) |
| `PrismaExceptionFilter` | Traduce errores Prisma a HTTP (P2002→409, P2025→404, P2003→400) |
| Prefijo `/api` | Todas las rutas inician con `/api` |
| CORS | Permite `localhost:4200` (dev) y `localhost:80` (nginx local) |

---

## Modelo de Datos

6 entidades + 3 enums. **SalidaMiembro** es la entidad central — todas las relaciones financieras pasan por ella, no por User directamente.

```
User ──1:N──> SalidaMiembro <──N:1── Salida
                   │
        ┌──────────┼──────────┐
        │          │          │
   GastoPagadoPor  │    PagoDeudor/Acreedor
        │          │          │
      Gasto   GastoParticipante  Pago
```

| Entidad | Descripción | Campos clave |
|---------|-------------|--------------|
| **User** | Usuario registrado | nombre, apellido, userName (unique), email (unique), password |
| **Salida** | Evento grupal | titulo (max 20), descripcion (max 100), codigoInvitacion (6 chars, unique) |
| **SalidaMiembro** | Pivote usuario↔salida | rol (creador/integrante), esFantasma, nombreFantasma (max 12) |
| **Gasto** | Gasto dentro de una salida | monto (int, pesos), metodoDivision (equitativo/manual), pagadoPorId |
| **GastoParticipante** | Quién participa en un gasto | esInvitado, montoManual (solo si manual) |
| **Pago** | Liquidación entre deudor y acreedor | monto (int), estado (pendiente/pagado), deudorId, pagadorId |

### Enums

- `MetodoDivision`: `equitativo` | `manual`
- `EstadoPago`: `pendiente` | `pagado`
- `RolSalida`: `creador` | `integrante`

### Reglas de Negocio

- **Fantasmas**: Miembros sin cuenta real (esFantasma=true, nombreFantasma en vez de userId)
- **División equitativa**: Residuo se asigna al pagador
- **División manual**: La suma de montos manuales debe ser exactamente igual al monto total
- **Pagos**: Se crean como `pendiente`, solo el acreedor puede confirmar (`pagado`)
- **Montos**: Enteros en pesos, máximo 9,999,999

---

## Endpoints

Todos los endpoints requieren `Authorization: Bearer <token>` excepto los de Auth.

### Auth (`/api/auth`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registra usuario nuevo | ❌ |
| POST | `/api/auth/login` | Inicia sesión (email o userName) | ❌ |

### Users (`/api/me`, `/api/users`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/me` | Perfil del usuario autenticado |
| PATCH | `/api/me` | Actualizar perfil (nombre, apellido, userName, fechaNacimiento, avatarUrl, tipoMetodoPago, metodoPago) |
| GET | `/api/balance-detallado` | Balance global: totalMeDeben, totalDebo, balanceNeto, detalle por persona/salida |
| GET | `/api/users/search?q=...` | Buscar usuario por userName o email |
| GET | `/api/users/search/frecuentes` | Usuarios con quienes he compartido salidas |

### Salidas (`/api/salidas`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/salidas` | Listar mis salidas |
| POST | `/api/salidas` | Crear salida (genera código de invitación) |
| GET | `/api/salidas/:id` | Detalle de una salida (con miembros, gastos, pagos) |
| POST | `/api/salidas/join` | Unirse a salida con código de invitación |
| GET | `/api/salidas/:id/fantasmas` | Listar fantasmas de una salida |
| POST | `/api/salidas/:id/integrantes` | Agregar integrante (registrado o fantasma) |

### Gastos (`/api/salidas/:salidaId/gastos`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/salidas/:salidaId/gastos` | Crear gasto con participantes |

### Pagos (`/api/salidas/:salidaId/pagos`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/salidas/:salidaId/pagos` | Registrar un pago/liquidación |
| PATCH | `/api/salidas/:salidaId/pagos/:pagoId/confirmar` | Confirmar pago (solo el acreedor) |

### Balances (`/api/salidas/:salidaId/balances`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/salidas/:salidaId/balances` | Balances de una salida (quién debe a quién) |

---

## Flujo de Autenticación

```
┌─────────┐     POST /api/auth/register     ┌───────────┐
│ Cliente │ ──────── o login ───────────────▶ │ AuthService│
└─────────┘                                  └─────┬─────┘
                                                   │
                                    ┌──────────────┼──────────────┐
                                    │              │              │
                              bcrypt.hash(10)  findUser     bcrypt.compare
                                    │              │              │
                                    └──────────────┼──────────────┘
                                                   │
                                          JwtService.sign({ sub: userId })
                                                   │
                                                   ▼
                                     { accessToken, user (sin password) }
```

1. **Registro**: Valida unicidad de email/userName → hashea password (bcrypt, salt=10) → crea User → firma JWT
2. **Login**: Busca por email o userName → compara password con bcrypt → firma JWT
3. **Token**: JWT con payload `{ sub: userId }`, expira en **7 días**
4. **Protección**: `JwtAuthGuard` + `JwtStrategy` (Passport) extraen token del header `Authorization: Bearer <token>`
5. **req.user**: Todas las rutas protegidas reciben `{ userId: string }` en `req.user`

---

## Setup Local

### Prerequisitos

- Node.js 22+
- Docker (para PostgreSQL)

### 1. Instalar dependencias

```bash
cd Back
npm install
```

> `postinstall` ejecuta `prisma generate` automáticamente.

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus valores (ver sección [Variables de Entorno](#variables-de-entorno)).

### 3. Levantar PostgreSQL

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 4. Crear tablas en la base de datos

```bash
npx prisma db push
```

### 5. Iniciar servidor en modo desarrollo

```bash
npm run start:dev
```

El backend estará disponible en **http://localhost:8000/api**

---

## Variables de Entorno

### Desarrollo (`.env`)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_USER` | Usuario PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña PostgreSQL | `crumbs_dev` |
| `DB_NAME` | Nombre de la base de datos | `crumbs` |
| `DATABASE_URL` | URL de conexión Prisma | `postgresql://postgres:crumbs_dev@localhost:5432/crumbs?schema=public` |
| `JWT_SECRET` | Secret para firmar JWT (min 32 chars) | Generar con `openssl rand -base64 32` |

### Producción (`.env.prod`)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a RDS | `postgresql://user:pass@host:5432/crumbs?schema=public` |
| `JWT_SECRET` | Secret seguro | Generar con `openssl rand -base64 64` |
| `NODE_ENV` | Entorno | `production` |
| `PORT` | Puerto del servidor | `3000` |

---

## Docker

### Desarrollo (solo PostgreSQL)

```bash
docker compose -f docker-compose.dev.yml up -d
```

Levanta PostgreSQL 16 en puerto 5432. El backend corre fuera de Docker con `npm run start:dev`.

### Producción (backend + nginx)

```bash
# 1. Configurar variables
cp .env.prod.example .env.prod
# Editar .env.prod

# 2. Build y levantar
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

Contenedores en host mode:
- **crumbs-backend**: NestJS en puerto 3000
- **crumbs-nginx**: Sirve SPA + proxy `/api` → backend:3000, puerto 80

Para detener:
```bash
docker compose -f docker-compose.prod.yml down
```

---

## Testing

Framework: **Jest** + **ts-jest**

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

### Convenciones de Testing

- Cada service debe tener su `.spec.ts`
- Se mockea `PrismaService` (no se conecta a DB real)
- Nombres de tests en español (`"debería crear un gasto..."`)
- Motor de división debe cubrir: equitativo par, equitativo impar, manual exacto, manual con error, invitados, residuo al pagador

---

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `start:dev` | `nest start --watch` | Desarrollo con hot-reload |
| `start:prod` | `node dist/src/main` | Producción |
| `build` | `nest build` | Compilar TypeScript |
| `test` | `jest` | Ejecutar tests |
| `test:e2e` | `jest --config ./test/jest-e2e.json` | Tests end-to-end |
| `lint` | `eslint "{src,apps,libs,test}/**/*.ts" --fix` | Linter |
| `format` | `prettier --write "src/**/*.ts" "test/**/*.ts"` | Formatear código |

---

## Estructura del Proyecto

```
Back/
├── prisma/
│   └── schema.prisma              # Esquema de base de datos
├── src/
│   ├── main.ts                    # Bootstrap (port, cors, pipes, filters)
│   ├── app.module.ts              # Módulo raíz
│   ├── app.controller.ts          # Health check
│   ├── auth/
│   │   ├── auth.module.ts         # Config JWT + providers
│   │   ├── auth.controller.ts     # POST /register, /login
│   │   ├── auth.service.ts        # Lógica de auth (bcrypt + JWT)
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts  # Guard para rutas protegidas
│   │   └── strategies/
│   │       └── jwt.strategy.ts    # Estrategia Passport JWT
│   ├── users/
│   │   ├── users.module.ts
│   │   └── users.controller.ts    # GET/PATCH /me, búsqueda, balance
│   ├── salidas/
│   │   ├── salidas.module.ts
│   │   ├── salidas.controller.ts  # CRUD salidas, join, fantasmas
│   │   ├── salidas.service.ts     # Lógica de salidas
│   │   └── dto/
│   │       ├── create-salida.dto.ts
│   │       ├── join-salida.dto.ts
│   │       └── add-integrante.dto.ts
│   ├── gastos/
│   │   ├── gastos.module.ts
│   │   ├── gastos.controller.ts   # POST gastos
│   │   ├── gastos.service.ts      # Creación + motor de división
│   │   ├── gastos.service.spec.ts # Tests del motor de división
│   │   └── dto/
│   │       ├── create-gasto.dto.ts
│   │       └── participante.dto.ts
│   ├── pagos/
│   │   ├── pagos.module.ts
│   │   ├── pagos.controller.ts    # POST pagos, PATCH confirmar
│   │   ├── pagos.service.ts       # Lógica de pagos + balances
│   │   ├── pagos.service.spec.ts  # Tests de pagos
│   │   ├── balances.controller.ts # GET balances por salida
│   │   └── dto/
│   │       └── create-pago.dto.ts
│   ├── prisma/
│   │   ├── prisma.module.ts       # Módulo global
│   │   └── prisma.service.ts      # PrismaClient wrapper
│   ├── shared/
│   │   ├── prisma-exception.filter.ts  # Filtro global de errores Prisma
│   │   └── transform-miembro.helper.ts # Helper para transformar miembros
│   └── docs/                      # Documentación interna del modelo
├── test/                          # Tests e2e
├── docker-compose.dev.yml         # PostgreSQL para desarrollo
├── docker-compose.prod.yml        # Backend + Nginx para producción
├── Dockerfile                     # Imagen del backend
├── .env.example                   # Template de variables (desarrollo)
├── .env.prod.example              # Template de variables (producción)
├── package.json
└── tsconfig.json
```

---

## Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| NestJS | 11 | Framework HTTP |
| Prisma | 7.9 | ORM + migraciones |
| PostgreSQL | 16 | Base de datos |
| Passport + JWT | 4.x | Autenticación |
| bcrypt | 6 | Hashing de passwords |
| class-validator | 0.15 | Validación de DTOs |
| Jest | 30 | Testing |
| TypeScript | 5.7 | Lenguaje |
| Docker | — | Contenedores |
