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
