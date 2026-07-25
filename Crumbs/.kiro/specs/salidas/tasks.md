# Tareas — Feature de Salidas

## Estado: ✅ Completado

---

## Tarea 1: Definir interfaces de dominio

**Archivo:** `src/app/core/interfaces/salida.interface.ts`

**Criterios de aceptación:**
- [x] Interfaz `Miembro` con id, nombre, userName, email
- [x] Interfaz `ParticipanteGasto` con miembroId y monto
- [x] Interfaz `Pago` con miembroId y monto
- [x] Interfaz `Gasto` con id, descripcion, montoTotal, fecha, pagos y participantes
- [x] Interfaz `Salida` con id, nombre, descripcion, fecha, miembros y gastos

---

## Tarea 2: Crear SalidaService con estado en signals

**Archivo:** `src/app/core/services/salida.service.ts`

**Criterios de aceptación:**
- [x] Signal `currentSalida` expone la salida actualmente cargada
- [x] Método `cargarSalida(id)` carga datos mock por ID
- [x] Método `agregarGasto(gasto)` agrega gasto a la salida actual
- [x] Método `agregarMiembro(miembro)` agrega miembro a la salida actual
- [x] Computed signal `balances` calcula balance neto por miembro
- [x] 2 salidas mock pre-cargadas (IDs '1' y '2')
- [x] Tests unitarios del servicio

---

## Tarea 3: Crear componente BalancesCard

**Archivo:** `src/app/features/salidas/components/balances-card/`

**Criterios de aceptación:**
- [x] Componente standalone presentacional
- [x] Recibe balances y miembros vía `input()`
- [x] Muestra nombre del miembro y su balance neto
- [x] Estiliza positivos (verde) y negativos (rojo) visualmente
- [x] Usa `mat-card` y `mat-list`
- [x] Tests unitarios

---

## Tarea 4: Crear componente GastosCard

**Archivo:** `src/app/features/salidas/components/gastos-card/`

**Criterios de aceptación:**
- [x] Componente standalone presentacional
- [x] Recibe lista de gastos vía `input()`
- [x] Muestra descripción, monto, pagador y fecha de cada gasto
- [x] Ordenados por fecha (más reciente primero)
- [x] Usa `mat-card` y `mat-list`
- [x] Tests unitarios

---

## Tarea 5: Crear componente DesgloseGastosCard

**Archivo:** `src/app/features/salidas/components/desglose-gastos-card/`

**Criterios de aceptación:**
- [x] Componente standalone presentacional
- [x] Recibe gastos y miembros vía `input()`
- [x] Muestra el desglose de cada gasto: quién pagó y cuánto le toca a cada participante
- [x] Usa `mat-card`, `mat-list` y `mat-divider`
- [x] Tests unitarios

---

## Tarea 6: Crear componente DrawerAgregarGasto

**Archivo:** `src/app/features/salidas/components/drawer-agregar-gasto/`

**Criterios de aceptación:**
- [x] Componente standalone presentacional
- [x] Recibe lista de miembros vía `input()` (para seleccionar pagador y participantes)
- [x] Formulario reactivo con campos: descripción, monto, pagador, participantes
- [x] Validaciones: descripción requerida, monto > 0, al menos un pagador y un participante
- [x] Emite evento `gastoAgregado` con los datos del gasto al confirmar
- [x] Emite evento `cerrar` al cancelar
- [x] Usa `mat-form-field`, `mat-select`, `mat-button`
- [x] Tests unitarios

---

## Tarea 7: Crear componente DrawerAgregarIntegrantes

**Archivo:** `src/app/features/salidas/components/drawer-agregar-integrantes/`

**Criterios de aceptación:**
- [x] Componente standalone presentacional
- [x] Campo de búsqueda por username o email
- [x] Emite evento `integranteAgregado` con los datos del miembro
- [x] Emite evento `cerrar` al cancelar
- [x] Usa `mat-form-field`, `mat-button`
- [x] Tests unitarios

---

## Tarea 8: Crear SalidaDetallePage (orquestador)

**Archivo:** `src/app/features/salidas/pages/salida-detalle-page/`

**Criterios de aceptación:**
- [x] Componente standalone que actúa como orquestador
- [x] Inyecta `SalidaService` y `ActivatedRoute`
- [x] Lee el parámetro `:id` de la ruta y llama a `cargarSalida(id)`
- [x] Pasa datos a componentes hijos vía bindings
- [x] Maneja eventos de los drawers (agregar gasto, agregar integrante)
- [x] Controla apertura/cierre de drawers
- [x] Layout responsivo con Tailwind
- [x] Tests unitarios

---

## Tarea 9: Configurar ruta en app.routes.ts

**Archivo:** `src/app/app.routes.ts`

**Criterios de aceptación:**
- [x] Ruta `salidas/:id` registrada como hija del `MainLayout`
- [x] Lazy loading con `loadComponent()`
- [x] Protegida por `authGuard`

---

## Tarea 10: Navegación desde el dashboard

**Archivo:** `src/app/features/dashboard/` (componentes del dashboard)

**Criterios de aceptación:**
- [x] Al hacer clic en una salida activa, navega a `/salidas/:id`
- [x] Usa `routerLink` o navegación programática con `Router`
