# Tasks: Página de Login (Módulo Auth)

#[[file:design.md]]

---

## Task 1: Instalar @angular/animations

**Archivos a modificar:**
- `package.json`
- `package-lock.json`

**Detalle:**
1. Ejecutar `npm install @angular/animations@^21.2.0`.
2. Verificar que los tests existentes siguen pasando con `npm test`.

**Criterio de aceptación:** La dependencia aparece en `package.json` y todos los tests existentes (6 suites, 23 tests) pasan sin errores.

---

## Task 2: Crear componente presentacional LoginBranding (4 archivos)

**Archivos a crear:**
- `src/app/features/auth/components/login-branding/login-branding.ts`
- `src/app/features/auth/components/login-branding/login-branding.html`
- `src/app/features/auth/components/login-branding/login-branding.css`
- `src/app/features/auth/components/login-branding/login-branding.spec.ts`

**Detalle:**
1. Componente standalone con selector `app-login-branding`.
2. Sin imports de servicios ni dependencias externas (puramente visual).
3. Template: `<section class="branding-panel">` con `<h1>Crumbs</h1>` y `<p>` subtítulo.
4. Estilos: fondo `var(--mat-sys-primary)`, texto `var(--mat-sys-on-primary)`, centrado con flex, responsive (texto más pequeño en mobile < 768px).
5. Tests: verificar creación, renderizado del título "Crumbs", renderizado del subtítulo.

**Criterio de aceptación:** El componente renderiza el panel morado con título y subtítulo. Tests (3) pasan.

---

## Task 3: Crear componente presentacional LoginForm (4 archivos)

**Archivos a crear:**
- `src/app/features/auth/components/login-form/login-form.ts`
- `src/app/features/auth/components/login-form/login-form.html`
- `src/app/features/auth/components/login-form/login-form.css`
- `src/app/features/auth/components/login-form/login-form.spec.ts`

**Detalle:**
1. Componente standalone con selector `app-login-form`.
2. Imports: `RouterLink`, `ReactiveFormsModule`, `MatButtonModule`, `MatFormFieldModule`, `MatInputModule`.
3. Output: `loginSubmit` que emite `{ emailOrUsername: string, password: string }`.
4. FormGroup con:
   - `emailOrUsername`: `Validators.required` + `Validators.email`
   - `password`: `Validators.required` + `Validators.minLength(6)` + validador custom `passwordStrengthValidator`
5. Validador custom (estático): verifica `[A-Z]`, `[0-9]`, `[!@#$%^&*]` retornando errores granulares.
6. Método `onSubmit()`: si el formulario es válido, emite `loginSubmit` con los valores.
7. Template: título "Iniciar Sesión", dos `mat-form-field appearance="outline"` con `mat-error` por cada validación, botón `mat-flat-button` deshabilitado si inválido, enlace a `/registro`.
8. Estilos: `:host` con max-width 380px, campos ancho completo, botón ancho completo.
9. Tests (18): creación, formulario inválido vacío, ambos controles existen, validaciones de email (requerido, formato), validaciones de password (requerido, minlength, mayúscula, número, especial, válido), formulario completo válido, botón disabled/enabled, emit on valid submit, no emit on invalid, enlace a registro.

**Criterio de aceptación:** El formulario valida correctamente, emite credenciales al padre, y todos los 18 tests pasan.

---

## Task 4: Modificar LoginPage como orquestador (4 archivos)

**Archivos a modificar:**
- `src/app/features/auth/pages/login-page/login-page.ts`
- `src/app/features/auth/pages/login-page/login-page.html`
- `src/app/features/auth/pages/login-page/login-page.css`
- `src/app/features/auth/pages/login-page/login-page.spec.ts`

**Detalle:**
1. Reemplazar el placeholder actual por un orquestador.
2. `.ts`: Importar `LoginBranding` y `LoginForm`. Método `onLogin(credentials)` que hace `console.log`.
3. `.html`: Grid layout con `<app-login-branding />` y `<section class="form-panel"><app-login-form (loginSubmit)="onLogin($event)" /></section>`.
4. `.css`: `:host` 100vh, grid 2 columnas, panel derecho centrado con flex, responsive a 1 columna en mobile.
5. `.spec.ts`: Tests (5) de creación, renderizado de ambos hijos, layout split, y manejo del evento onLogin.

**Criterio de aceptación:** La página ensambla correctamente ambos componentes hijos. El evento fluye de LoginForm → LoginPage → console.log. Tests (5) pasan.

---

## Task 5: Crear documentación .kiro/specs/login-page/

**Archivos a crear:**
- `.kiro/specs/login-page/requirements.md`
- `.kiro/specs/login-page/design.md`
- `.kiro/specs/login-page/tasks.md`

**Detalle:**
1. Seguir el mismo formato usado en `.kiro/specs/perfil-header/`.
2. Documentar requisitos funcionales y no funcionales.
3. Documentar decisiones técnicas y arquitectura.
4. Documentar las tasks con criterios de aceptación.

**Criterio de aceptación:** Los 3 archivos existen y documentan la feature completamente.

---

## Task 6: Verificación final — build y tests

**Acciones:**
1. Ejecutar `npm test` — todos los tests deben pasar.
2. Ejecutar `ng build` — debe compilar sin errores ni warnings.
3. Verificar que el lazy chunk `login-page` se genera correctamente.

**Criterio de aceptación:** 8+ test files, 45+ tests, todos verdes. Build sin errores. Chunk `login-page` generado.

---

## Orden de ejecución

```
Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6
  │         │         │         │         │         │
  ▼         ▼         ▼         ▼         ▼         ▼
Animations Branding  Form     Page      Docs     Verify
(dep)      (visual)  (lógica) (orquest) (specs)  (build)
```

- Task 1: Dependencia necesaria para tests con Material.
- Tasks 2-3: Componentes presentacionales independientes entre sí.
- Task 4: Orquestador que depende de Tasks 2 y 3.
- Task 5: Documentación que refleja lo implementado.
- Task 6: Validación final de todo.

---

## Resumen de archivos

| # | Archivo | Tipo | Acción |
|---|---------|------|--------|
| 1 | `package.json` | Config | Modificar (agregar animations) |
| 2 | `features/auth/components/login-branding/login-branding.ts` | Componente | Crear |
| 3 | `features/auth/components/login-branding/login-branding.html` | Template | Crear |
| 4 | `features/auth/components/login-branding/login-branding.css` | Estilos | Crear |
| 5 | `features/auth/components/login-branding/login-branding.spec.ts` | Test | Crear |
| 6 | `features/auth/components/login-form/login-form.ts` | Componente | Crear |
| 7 | `features/auth/components/login-form/login-form.html` | Template | Crear |
| 8 | `features/auth/components/login-form/login-form.css` | Estilos | Crear |
| 9 | `features/auth/components/login-form/login-form.spec.ts` | Test | Crear |
| 10 | `features/auth/pages/login-page/login-page.ts` | Componente | Modificar |
| 11 | `features/auth/pages/login-page/login-page.html` | Template | Modificar |
| 12 | `features/auth/pages/login-page/login-page.css` | Estilos | Modificar |
| 13 | `features/auth/pages/login-page/login-page.spec.ts` | Test | Modificar |
| 14 | `.kiro/specs/login-page/requirements.md` | Doc | Crear |
| 15 | `.kiro/specs/login-page/design.md` | Doc | Crear |
| 16 | `.kiro/specs/login-page/tasks.md` | Doc | Crear |

**Total: 8 archivos nuevos + 5 archivos modificados + 3 archivos de documentación = 16 archivos**
