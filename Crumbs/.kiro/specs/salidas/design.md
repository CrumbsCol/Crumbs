# Diseño Técnico — Feature de Salidas

## Arquitectura General

El feature sigue el patrón establecido del proyecto: **páginas como orquestadores** y **componentes presentacionales** que reciben datos vía `input()` y emiten eventos vía `output()`.

```
src/app/features/salidas/
├── pages/
│   └── salida-detalle-page/          ← Orquestador principal
│       ├── salida-detalle-page.ts
│       ├── salida-detalle-page.html
│       ├── salida-detalle-page.css
│       └── salida-detalle-page.spec.ts
├── components/
│   ├── balances-card/                ← Balance neto por miembro
│   │   ├── balances-card.ts
│   │   ├── balances-card.html
│   │   ├── balances-card.css
│   │   └── balances-card.spec.ts
│   ├── gastos-card/                  ← Lista de gastos
│   │   ├── gastos-card.ts
│   │   ├── gastos-card.html
│   │   ├── gastos-card.css
│   │   └── gastos-card.spec.ts
│   ├── desglose-gastos-card/         ← Desglose por gasto
│   │   ├── desglose-gastos-card.ts
│   │   ├── desglose-gastos-card.html
│   │   ├── desglose-gastos-card.css
│   │   └── desglose-gastos-card.spec.ts
│   ├── drawer-agregar-gasto/         ← Drawer para nuevo gasto
│   │   ├── drawer-agregar-gasto.ts
│   │   ├── drawer-agregar-gasto.html
│   │   ├── drawer-agregar-gasto.css
│   │   └── drawer-agregar-gasto.spec.ts
│   └── drawer-agregar-integrantes/   ← Drawer para agregar miembros
│       ├── drawer-agregar-integrantes.ts
│       ├── drawer-agregar-integrantes.html
│       ├── drawer-agregar-integrantes.css
│       └── drawer-agregar-integrantes.spec.ts
```

---

## Interfaces de Dominio

Definidas en `src/app/core/interfaces/salida.interface.ts`:

```typescript
/** Representa un miembro/participante de una salida */
export interface Miembro {
  id: string;             // SalidaMiembro.id en contexto de salida
  nombre: string;
  userName: string;
  email: string;
  avatarUrl: string | null;
  tipoMetodoPago?: string;
  metodoPago?: string;
  esFantasma?: boolean;   // true si es integrante sin cuenta
  rol?: 'creador' | 'integrante';
}

/** Representa la participación de un miembro en un gasto */
export interface ParticipanteGasto {
  miembroId: string;
  monto: number;       // Cuánto le corresponde pagar
}

/** Representa un pago realizado por un miembro */
export interface Pago {
  miembroId: string;
  monto: number;       // Cuánto pagó efectivamente
}

/** Representa un gasto dentro de una salida */
export interface Gasto {
  id: string;
  descripcion: string;
  montoTotal: number;
  fecha: string;                      // ISO date string
  pagos: Pago[];                      // Quién(es) pagaron
  participantes: ParticipanteGasto[]; // Cómo se divide
}

/** Representa una salida (evento grupal) */
export interface Salida {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  miembros: Miembro[];
  gastos: Gasto[];
}
```

---

## Servicio: SalidaService

Ubicación: `src/app/core/services/salida.service.ts`

### Responsabilidades

- Mantener el estado de la salida actual mediante **signals**.
- Proveer métodos para cargar, agregar gastos y agregar miembros.
- En modo mock, retornar datos pre-cargados sin llamadas HTTP.

### API del servicio

```typescript
@Injectable({ providedIn: 'root' })
export class SalidaService {
  /** Salida actualmente cargada */
  currentSalida: Signal<Salida | null>;

  /** Carga una salida por su ID */
  cargarSalida(id: string): void;

  /** Agrega un gasto a la salida actual (recibe DTO con solo IDs) */
  agregarGasto(request: CrearGastoRequest): void;

  /** Agrega un miembro a la salida actual */
  agregarMiembro(miembro: Miembro): void;

  /** Calcula los balances netos de la salida actual */
  calcularBalances(): Signal<Map<string, number>>;
}
```

### Estado con signals

```
┌─────────────────────┐
│   SalidaService     │
│                     │
│  _salida (signal)   │──▶ currentSalida (readonly)
│                     │
│  calcularBalances() │──▶ computed signal (Map<miembroId, balance>)
│                     │
└─────────────────────┘
```

---

## Flujo de Datos

### Carga del detalle

```
┌──────────────┐   navega a /salidas/:id    ┌─────────────────────┐
│  Dashboard   │ ─────────────────────────▶ │ SalidaDetallePage   │
└──────────────┘                            │                     │
                                            │ ngOnInit():         │
                                            │  route.params → id  │
                                            │  salidaService      │
                                            │   .cargarSalida(id) │
                                            └──────────┬──────────┘
                                                       │
                                                       ▼
                                            ┌─────────────────────┐
                                            │  SalidaService      │
                                            │  _salida.set(data)  │
                                            └──────────┬──────────┘
                                                       │
                                            ┌──────────▼──────────┐
                                            │  Componentes hijos  │
                                            │  leen via input()   │
                                            └─────────────────────┘
```

### Comunicación Page ↔ Componentes

```
SalidaDetallePage (orquestador)
├── [salida]="currentSalida()" ──▶ balances-card
├── [gastos]="currentSalida()?.gastos" ──▶ gastos-card
├── [gastos]="currentSalida()?.gastos" ──▶ desglose-gastos-card
│   [miembros]="currentSalida()?.miembros"
├── [miembros]="currentSalida()?.miembros" ──▶ drawer-agregar-gasto
│   (gastoAgregado)="onGastoAgregado($event)" ◀── emite CrearGastoRequest (DTOs con IDs)
└── (integranteAgregado)="onIntegranteAgregado($event)" ◀── drawer-agregar-integrantes
```

---

## Decisiones Técnicas

### ¿Por qué signals y no Observables?

- Consistencia con el patrón del proyecto (UserService ya usa signals).
- API más simple para estado síncrono local.
- Computed signals para derivar balances de forma reactiva.

### ¿Por qué drawers laterales en vez de modales?

- Mejor UX en móvil (ocupan pantalla completa).
- Permiten ver el contexto de la salida detrás del drawer.
- Angular Material `mat-drawer` / `mat-sidenav` proporciona el componente listo.

### ¿Por qué el cálculo de balances es un computed signal?

- Se recalcula automáticamente cuando cambian los gastos o miembros.
- No requiere lógica imperativa de "recalcular" en cada modificación.
- El algoritmo: para cada gasto, suma lo que pagó cada miembro y resta lo que le corresponde. El balance neto es la diferencia acumulada.

### Modo mock

- 2 salidas pre-cargadas con IDs '1' y '2'.
- Datos realistas con múltiples miembros y gastos variados.
- Diseñado para migración transparente a backend real (misma interfaz de servicio).

---

## Rutas

Configuración en `app.routes.ts` (dentro del layout con header):

```typescript
{
  path: '',
  loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
  canActivate: [authGuard],
  children: [
    // ... otras rutas
    {
      path: 'salidas/:id',
      loadComponent: () =>
        import('./features/salidas/pages/salida-detalle-page/salida-detalle-page')
          .then(m => m.SalidaDetallePage),
    },
  ],
}
```

---

## Componentes de Material Utilizados

| Componente | Uso |
|---|---|
| `mat-card` | Contenedor de balances, gastos, desglose |
| `mat-list` | Listas de miembros y gastos |
| `mat-drawer` / `mat-sidenav` | Drawers laterales |
| `mat-form-field` | Inputs del formulario de gasto |
| `mat-select` | Selector de quién pagó / participantes |
| `mat-button` | Botones de acción (agregar, cancelar) |
| `mat-icon` | Iconografía |
| `mat-chip` | Tags de participantes |
| `mat-divider` | Separadores visuales |
