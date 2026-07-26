# Convenciones — Crumbs Backend (NestJS + Prisma)

## Estructura de módulos

```
src/
├── auth/          # Login, registro, JWT, guards
├── users/         # CRUD de perfil, GET /me
├── salidas/       # CRUD salidas, integrantes, unirse por código
├── gastos/        # Registrar gasto, participantes, motor de división
├── pagos/         # Registrar pago, confirmar recepción
└── prisma/        # PrismaService (singleton global)
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

## Seguridad
- Passwords: bcrypt con saltRounds=10
- JWT: secret en .env, expiración configurable
- Nunca retornar password en responses (usar select o exclude en Prisma)
- Validar que el usuario es integrante de la salida antes de cualquier operación

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


## Endpoints implementados (actualizado 2026-07-26)

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

## Estado del proyecto (actualizado 2026-07-26)
- Backend 100% funcional con todos los endpoints del MVP
- 13 tests unitarios (motor de división + balances)
- Seguridad: JWT sin fallback, validación membresía, solo deudor registra pagos
- Creador confirma pagos de fantasmas
- PrismaExceptionFilter global

## Docker
- Dockerfile multi-stage (builder + runtime) en node:22-alpine
- docker-compose.dev.yml: solo PostgreSQL para desarrollo
- docker-compose.prod.yml: backend + nginx (host mode para pruebas locales)
- nginx/nginx.conf: sirve SPA + proxy /api a localhost:3000
- .env.prod: variables de producción (DATABASE_URL de RDS, JWT_SECRET)
- En AWS: el compose usará redes Docker normales (backend se comunica con RDS directamente)