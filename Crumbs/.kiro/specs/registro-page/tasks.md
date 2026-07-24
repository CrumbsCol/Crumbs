# Tasks: Página de Registro (Módulo Auth)

#[[file:design.md]]

---

## Task 1: Crear componente presentacional RegistroHeader (4 archivos)

**Archivos:**
- `src/app/features/auth/components/registro-header/registro-header.ts`
- `src/app/features/auth/components/registro-header/registro-header.html`
- `src/app/features/auth/components/registro-header/registro-header.css`
- `src/app/features/auth/components/registro-header/registro-header.spec.ts`

**Detalle:**
1. Componente standalone con `RouterLink` y `MatButtonModule`.
2. Layout flex: "Logo" izquierda, "Volver" (→ /login) derecha.
3. Borde inferior sutil para separar del contenido.
4. Tests: creación, renderiza "Logo", enlace "Volver" apunta a /login.

**Criterio de aceptación:** Header renderiza correctamente con logo y enlace. 3 tests pasan.

---

## Task 2: Crear componente presentacional RegistroForm (4 archivos)

**Archivos:**
- `src/app/features/auth/components/registro-form/registro-form.ts`
- `src/app/features/auth/components/registro-form/registro-form.html`
- `src/app/features/auth/components/registro-form/registro-form.css`
- `src/app/features/auth/components/registro-form/registro-form.spec.ts`

**Detalle:**
1. FormGroup con: email, userName, password, confirmPassword, fechaNacimiento.
2. Validador `passwordStrengthValidator` (estático): [A-Z], [0-9], [!@#$%^&*].
3. Validador `passwordMatchValidator` (a nivel de FormGroup): password === confirmPassword.
4. Output `registroSubmit` emite datos al padre.
5. 5 campos con `mat-form-field appearance="outline"`.
6. Fecha con `type="date"` (selector nativo).
7. Botón "Registrarme" deshabilitado si inválido.
8. Tests (22): creación, estado inicial, validaciones de cada campo, mismatch, formulario válido, botón disabled/enabled, emit/no-emit.

**Criterio de aceptación:** Formulario valida todos los campos correctamente. 22 tests pasan.

---

## Task 3: Crear página RegistroPage como orquestador (4 archivos)

**Archivos:**
- `src/app/features/auth/pages/registro-page/registro-page.ts`
- `src/app/features/auth/pages/registro-page/registro-page.html`
- `src/app/features/auth/pages/registro-page/registro-page.css`
- `src/app/features/auth/pages/registro-page/registro-page.spec.ts`

**Detalle:**
1. Importa RegistroHeader y RegistroForm.
2. Layout flex column: header arriba, formulario centrado debajo.
3. Método `onRegister(data)` hace `console.log('Registro:', data)`.
4. Tests (5): creación, renderiza header, renderiza form, layout correcto, onRegister loguea.

**Criterio de aceptación:** Página ensambla ambos hijos correctamente. 5 tests pasan.

---

## Task 4: Habilitar ruta /registro en app.routes.ts

**Archivo a modificar:**
- `src/app/app.routes.ts`

**Detalle:**
1. Descomentar/reemplazar el bloque comentado de la ruta `/registro`.
2. Apuntar a `RegistroPage` con lazy loading.

**Criterio de aceptación:** Navegar a `/registro` carga la página correctamente.

---

## Task 5: Crear documentación .kiro/specs/registro-page/

**Archivos:**
- `.kiro/specs/registro-page/requirements.md`
- `.kiro/specs/registro-page/design.md`
- `.kiro/specs/registro-page/tasks.md`

**Criterio de aceptación:** Documentación completa siguiendo el formato del proyecto.

---

## Task 6: Verificación final

**Acciones:**
1. `npm test` — todos los tests pasan.
2. `ng build` — compila sin errores.
3. Chunk `registro-page` se genera como lazy.

**Criterio de aceptación:** 11+ test files, 75+ tests, todos verdes. Build sin errores.

---

## Resumen de archivos

| # | Archivo | Acción |
|---|---------|--------|
| 1 | `components/registro-header/registro-header.ts` | Crear |
| 2 | `components/registro-header/registro-header.html` | Crear |
| 3 | `components/registro-header/registro-header.css` | Crear |
| 4 | `components/registro-header/registro-header.spec.ts` | Crear |
| 5 | `components/registro-form/registro-form.ts` | Crear |
| 6 | `components/registro-form/registro-form.html` | Crear |
| 7 | `components/registro-form/registro-form.css` | Crear |
| 8 | `components/registro-form/registro-form.spec.ts` | Crear |
| 9 | `pages/registro-page/registro-page.ts` | Crear |
| 10 | `pages/registro-page/registro-page.html` | Crear |
| 11 | `pages/registro-page/registro-page.css` | Crear |
| 12 | `pages/registro-page/registro-page.spec.ts` | Crear |
| 13 | `app.routes.ts` | Modificar |
| 14 | `.kiro/specs/registro-page/requirements.md` | Crear |
| 15 | `.kiro/specs/registro-page/design.md` | Crear |
| 16 | `.kiro/specs/registro-page/tasks.md` | Crear |
