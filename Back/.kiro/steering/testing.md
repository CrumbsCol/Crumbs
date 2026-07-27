# Testing — Crumbs Backend

## Obligatorio
- Todo service DEBE tener .spec.ts
- Motor de división DEBE tener tests para:
  - División equitativa (caso normal)
  - División equitativa con invitados
  - Redondeo: residuo se carga al pagador
  - División manual: suma cuadra correctamente
  - División manual: suma NO cuadra (debe rechazar)
  - Todos marcados invitado (debe rechazar)
- Endpoints e2e: happy path + al menos 1 error (401, 403, 400)

## Estructura
- Unitarios: archivo.spec.ts junto al archivo que testean
- E2E: test/ directorio raíz
- Mock de PrismaService en tests unitarios
- TestingModule con providers mockeados

## Patrones

```typescript
describe('GastosService', () => {
  describe('crearGasto', () => {
    it('debe crear gasto con división equitativa', () => { ... });
    it('debe rechazar si monto es 0 o negativo', () => { ... });
    it('debe rechazar si no hay participantes no-invitados', () => { ... });
  });
});
```

## Cobertura mínima
- Services: cubrir happy path + al menos 1 caso de error por método
- Guards: verificar acceso permitido y denegado
- DTOs: verificar validaciones (campos requeridos, longitudes, formatos)

## Comandos
- `npm run test` — unitarios (Jest)
- `npm run test:e2e` — end-to-end (supertest)
- `npm run test -- --watch` — modo watch para desarrollo
