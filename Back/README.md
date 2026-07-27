# Crumbs - Backend

Servidor backend para **Crumbs**, una plataforma colaborativa para dividir gastos.

## Stack

- **NestJS 11** + TypeScript
- **Prisma v7** (ORM)
- **PostgreSQL 16**
- **JWT** (autenticación)
- **Docker** (desarrollo y producción)

## Setup rápido

```bash
# 1. Copiar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 2. Levantar PostgreSQL
docker compose -f docker-compose.dev.yml up -d

# 3. Instalar dependencias
npm install

# 4. Crear tablas
npx prisma db push

# 5. Arrancar en modo desarrollo
npm run start:dev
```

El backend corre en `http://localhost:8000/api`

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/me | Perfil del usuario |
| PATCH | /api/me | Actualizar perfil |
| GET | /api/salidas | Listar salidas |
| POST | /api/salidas | Crear salida |
| GET | /api/salidas/:id | Detalle completo |
| POST | /api/salidas/join | Unirse por código |
| POST | /api/salidas/:id/integrantes | Agregar integrante |
| GET | /api/salidas/:id/fantasmas | Gestión de fantasmas |
| POST | /api/salidas/:id/gastos | Registrar gasto |
| POST | /api/salidas/:id/pagos | Registrar pago |
| PATCH | /api/salidas/:id/pagos/:pagoId/confirmar | Confirmar pago |
| GET | /api/salidas/:id/balances | Balances por miembro |
| GET | /api/balance-detallado | Balance global |
| GET | /api/users/search?q=... | Buscar usuario |
| GET | /api/users/search/frecuentes | Miembros frecuentes |

## Docker

```bash
# Desarrollo (solo DB)
docker compose -f docker-compose.dev.yml up -d

# Producción (backend + nginx)
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

## Tests

```bash
npm test                    # Unitarios
npm run test:e2e            # End-to-end
```

## Estructura

```
src/
├── auth/          # Login, registro, JWT
├── users/         # Perfil, búsqueda
├── salidas/       # CRUD salidas, integrantes, fantasmas
├── gastos/        # Motor de división
├── pagos/         # Pagos + balances
├── prisma/        # PrismaService
└── shared/        # Helpers y filtros
```
