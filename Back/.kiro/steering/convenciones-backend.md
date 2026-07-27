# Convenciones — Crumbs Backend (NestJS 11 + Prisma v7)

## Stack

- **Runtime:** Node.js 22
- **Framework:** NestJS 11
- **ORM:** Prisma v7 con driver adapter (`@prisma/adapter-pg` + `PrismaPg`)
- **Base de datos:** PostgreSQL 16 (RDS en producción, Docker local en desarrollo)
- **Auth:** JWT (passport-jwt) + bcrypt 6
- **Validación:** class-validator + class-transformer
- **Testing:** Jest
- **CI/CD:** GitHub Actions → ECR → EC2

## Estructura de módulos

```
src/
├── auth/          # Login, registro, JWT, guards
├── users/         # CRUD de perfil, GET /me, búsqueda de usuarios
├── salidas/       # CRUD salidas, integrantes, unirse por código, fantasmas
├── gastos/        # Registrar gasto, participantes, motor de división
├── pagos/         # Registrar pago, confirmar recepción, balances
├── prisma/        # PrismaService (singleton global con driver adapter)
└── shared/        # Helpers y filtros compartidos
```

## Cada módulo contiene
- nombre.module.ts
- nombre.controller.ts
- nombre.service.ts
- dto/create-nombre.dto.ts, update-nombre.dto.ts
- nombre.service.spec.ts
- nombre.controller.spec.ts (opcional)

## Reglas de código
- DTOs con class-validator (@IsString, @IsInt, @MaxLength, @IsEnum, etc.)
- Services inyectan PrismaService — controllers NUNCA acceden a Prisma directamente
- Transacciones ($transaction) para crear gasto + participantes
- Guards: JwtAuthGuard (autenticación), SalidaMiembroGuard (pertenece a la salida)
- Pipes: ValidationPipe global con whitelist:true y transform:true

## Prisma v7 — Driver Adapter

Prisma v7 requiere driver adapter explícito. El PrismaService usa `@prisma/adapter-pg`:

```typescript
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString,
  // En producción (RDS): SSL sin verificación de certificado AWS
  ...(isProduction && { ssl: { rejectUnauthorized: false } }),
});

super({ adapter });
```

- En desarrollo: conexión directa a PostgreSQL local (sin SSL)
- En producción: conexión a RDS con SSL (rejectUnauthorized: false para cert de AWS)
- `postinstall: prisma generate` en package.json asegura que el client se regenere

## Seguridad
- Passwords: bcrypt con saltRounds=10
- JWT: secret en .env (JWT_SECRET), expiración configurable
- Nunca retornar password en responses (usar select o exclude en Prisma)
- Validar que el usuario es integrante de la salida antes de cualquier operación
- SalidaMiembroGuard verifica membresía automáticamente

## Respuestas HTTP
- 201 para creación exitosa
- 400 para validación fallida
- 401 para no autenticado
- 403 para no autorizado (no es integrante de la salida)
- 404 para recurso no encontrado
- 409 para conflictos (duplicados: email, userName, código)

## Idioma
- Código (variables, clases): inglés
- Comentarios y documentación: español
- Nombres de entidades Prisma: español (User, Salida, Gasto, Pago, etc.)

## Endpoints implementados (actualizado 2026-07-27)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/me | Perfil del usuario autenticado |
| PATCH | /api/me | Actualizar perfil |
| GET | /api/salidas | Listar salidas del usuario |
| POST | /api/salidas | Crear salida |
| GET | /api/salidas/:id | Detalle completo |
| POST | /api/salidas/join | Unirse por código |
| POST | /api/salidas/:id/integrantes | Agregar integrante |
| GET | /api/salidas/:id/fantasmas | Resumen de fantasmas (solo creador) |
| POST | /api/salidas/:id/gastos | Registrar gasto |
| POST | /api/salidas/:id/pagos | Registrar pago |
| PATCH | /api/salidas/:id/pagos/:pagoId/confirmar | Confirmar pago |
| GET | /api/salidas/:id/balances | Balances por miembro |
| GET | /api/balance-detallado | Balance global desglosado |
| GET | /api/users/search?q=... | Buscar usuario |
| GET | /api/users/search/frecuentes | Miembros frecuentes |

## Módulos compartidos (src/shared/)
- transform-miembro.helper.ts — SalidaMiembro+User → Miembro plano
- prisma-exception.filter.ts — P2002→409, P2025→404, P2003→400

## Docker
- Dockerfile multi-stage (builder + runtime) en node:22-alpine
- docker-compose.dev.yml: solo PostgreSQL para desarrollo local
- docker-compose.prod.yml: backend + nginx (para pruebas locales de producción)
- nginx/nginx.conf: sirve SPA + proxy /api a backend:3000
- .env.prod: variables de producción (DATABASE_URL con host RDS, JWT_SECRET)

## CI/CD (GitHub Actions)

Pipeline automático al hacer push a `main`:

1. **test-backend** — `npm ci` → `prisma generate` → `npm test --no-coverage`
2. **test-frontend** — `npm ci` → `ng lint` → `ng test --watch=false`
3. **build-and-deploy** (requiere que ambos tests pasen):
   - Build Angular → copia dist a `Back/nginx/dist`
   - Genera nginx.conf para AWS (proxy a `backend:3000`)
   - Build & push imágenes Docker a ECR (`crumbs-backend`, `crumbs-nginx`)
   - SSH a EC2 → `docker-compose pull` → `down` → `up -d`
4. **notify-failure** — Log de fallo en consola

**Secrets requeridos:** AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, EC2_HOST, EC2_SSH_PRIVATE_KEY

## Variables de entorno

| Variable | Desarrollo | Producción |
|----------|-----------|------------|
| DATABASE_URL | postgresql://user:pass@localhost:5432/crumbs?schema=public | postgresql://user:pass@rds-host:5432/crumbs?schema=public |
| JWT_SECRET | string local | openssl rand -base64 64 |
| NODE_ENV | (no definido) | production |
| PORT | 8000 (docker-compose.dev expone este puerto) | 3000 (interno en Docker network) |

## Estado del proyecto (actualizado 2026-07-27)
- Backend 100% funcional con 17 endpoints del MVP
- 13+ tests unitarios (motor de división + balances)
- Seguridad: JWT, validación membresía, solo deudor registra pagos
- Creador confirma pagos de fantasmas
- PrismaExceptionFilter global
- CI/CD completo con deploy automático a AWS
- Prisma v7 con driver adapter y SSL para RDS
