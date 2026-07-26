# Tareas — Compatibilidad Frontend ↔ Backend

## Estado: ✅ Completado (2026-07-26)

---

### Tarea 1: Agregar campos opcionales a interface Miembro ✅
- Agregados `esFantasma?: boolean` y `rol?: 'creador' | 'integrante'`
- Archivo: `src/app/core/interfaces/salida.interface.ts`

### Tarea 2: Crear archivo de interfaces DTO de request ✅
- Creado `src/app/core/interfaces/salida-request.interface.ts`
- Incluye: RegistroRequest, CrearSalidaRequest, UnirseASalidaRequest, AgregarIntegranteRequest, ParticipanteRequest, CrearGastoRequest, RegistrarPagoRequest

### Tarea 3: Agregar campos nombre y apellido al registro ✅
- Agregados FormControls `nombre` y `apellido` (required, maxLength 50)
- Actualizado output del componente y la página orquestadora
- Actualizado UserService mock y todos los tests afectados
- Archivos: `registro-form.ts`, `registro-form.html`, `registro-page.ts`, `user.interface.ts`, `user.service.ts`

### Tarea 4: Refactorizar DrawerAgregarGasto para emitir DTO ✅
- Output cambiado de `Omit<Gasto, 'id'>` a `CrearGastoRequest`
- El componente emite solo IDs + datos mínimos
- Archivo: `drawer-agregar-gasto.ts`

### Tarea 5: Actualizar SalidaService para usar DTOs ✅
- `agregarGasto()` ahora acepta `CrearGastoRequest`
- `crearSalida()` ahora acepta `miembrosIniciales` opcionales y guarda `descripcion`
- Archivo: `salida.service.ts`

### Tarea 6: Agregar descripcion al modelo y interfaces ✅
- Campo `descripcion?: string` agregado a interface `Salida` y a `CrearSalidaRequest`
- Modelo BD actualizado: tabla Salida + campo `descripcion VARCHAR(100) NULL`
- Archivos: `salida.interface.ts`, `salida-request.interface.ts`, `Crumbs_Modelo_Base_de_Datos.md`

### Tarea 7: Validación de entero en monto del gasto ✅
- Agregado `Validators.pattern(/^\d+$/)` al FormControl de monto
- Archivo: `drawer-agregar-gasto.ts`

### Tarea 8: Activar botón agregar integrantes en CrearSalida ✅
- Botón `person_add` abre el DrawerAgregarIntegrantes (reutilizado)
- Integrantes se muestran en la lista con nombre y @userName
- Al crear la salida, integrantes se pasan al SalidaService como miembros iniciales
- Archivos: `crear-salida.component.ts`, `crear-salida.component.html`, `dashboard-page.ts`
