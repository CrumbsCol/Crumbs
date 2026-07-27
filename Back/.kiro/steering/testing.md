# Testing — Crumbs Backend

## Stack de Testing
- **Runner:** Jest (configurado via NestJS CLI)
- **Tests unitarios:** `npm test` (o `npm test -- --watch` para desarrollo)
- **Tests e2e:** `npm run test:e2e` (supertest)
- **CI:** `npm test -- --no-coverage` (GitHub Actions, Node 22)

## Obligatorio

### Servicios
- Todo service DEBE tener .spec.ts
- Cubrir happy path + al menos 1 caso de error por método público
- Mock de PrismaService en todos los tests unitarios

### Motor de División (tests críticos)
El motor de división DEBE tener tests para:
1. División equitativa (caso normal: 3 personas, monto divisible)
2. División equitativa con invitados (invitados no pagan)
3. Redondeo: residuo se carga al pagador
4. División manual: suma cuadra correctamente
5. División manual: suma NO cuadra → debe rechazar (BadRequestException)
6. Todos marcados invitado → debe rechazar (sin participantes válidos)

### Balances
- Calcular balance correcto con múltiples gastos
- Verificar que pagos reducen deuda correctamente
- Pagos sin gastoId se incluyen en el cálculo

### Guards
- JwtAuthGuard: verificar acceso permitido y denegado (401)
- SalidaMiembroGuard: verificar membresía (403)

### Endpoints e2e
- Happy path completo (request válido → response esperado)
- Al menos 1 error case: 401 (no auth), 403 (no miembro), 400 (validación)

## Estructura de archivos

```
src/
├── auth/
│   └── auth.service.spec.ts
├── users/
│   └── users.service.spec.ts
├── salidas/
│   └── salidas.service.spec.ts
├── gastos/
│   └── gastos.service.spec.ts      ← Incluye tests del motor de división
├── pagos/
│   ├── pagos.service.spec.ts
│   └── balances.service.spec.ts    ← Tests de cálculo de balances
└── prisma/
    └── (no necesita spec — es wrapper)

test/                               ← E2E tests
├── app.e2e-spec.ts
└── jest-e2e.json
```

## Patrones

### Test unitario de servicio

```typescript
describe('GastosService', () => {
  let service: GastosService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GastosService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
      ],
    }).compile();

    service = module.get(GastosService);
    prisma = module.get(PrismaService);
  });

  describe('crearGasto', () => {
    it('debe crear gasto con división equitativa', async () => { ... });
    it('debe rechazar si monto es 0 o negativo', async () => { ... });
    it('debe rechazar si no hay participantes no-invitados', async () => { ... });
  });
});
```

### Mock de PrismaService

```typescript
// Usar jest-mock-extended para deep mocks
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../prisma/prisma.service';

// En providers del TestingModule:
{ provide: PrismaService, useValue: mockDeep<PrismaService>() }
```

### Test de Guard

```typescript
describe('SalidaMiembroGuard', () => {
  it('debe permitir acceso si es miembro de la salida', async () => { ... });
  it('debe lanzar ForbiddenException si no es miembro', async () => { ... });
});
```

## CI/CD Integration

En el pipeline de GitHub Actions (job `test-backend`):
```yaml
- run: npm ci
- run: DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate
- run: npm test -- --no-coverage
  env:
    DATABASE_URL: "postgresql://dummy:dummy@localhost:5432/dummy"
    JWT_SECRET: "test-secret-for-ci"
```

- No se necesita base de datos real para tests unitarios (PrismaService está mockeado)
- `prisma generate` necesita DATABASE_URL pero no conecta (solo genera el client)
- `--no-coverage` en CI para velocidad

## Cobertura mínima
- Services: cubrir happy path + al menos 1 caso de error por método
- Guards: verificar acceso permitido y denegado
- DTOs: verificar validaciones (campos requeridos, longitudes, formatos)
- Motor de división: los 6 casos obligatorios listados arriba

## Comandos
- `npm test` — unitarios (Jest)
- `npm test -- --watch` — modo watch para desarrollo
- `npm test -- --no-coverage` — sin reporte de cobertura (usado en CI)
- `npm run test:e2e` — end-to-end (supertest contra app real)

## Estado actual (2026-07-27)
- 13+ tests unitarios implementados
- Cobertura principal: motor de división + cálculo de balances
- Tests corren en CI antes de cada deploy (gate obligatorio)
