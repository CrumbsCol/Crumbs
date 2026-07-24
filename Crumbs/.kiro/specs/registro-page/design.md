# Design: Página de Registro (Módulo Auth)

#[[file:requirements.md]]

---

## Arquitectura de Componentes

```
src/app/features/auth/
├── pages/
│   └── registro-page/              # Orquestador: layout 1 col, conecta eventos
├── components/
│   ├── registro-header/            # Presentacional: Logo + Volver
│   └── registro-form/              # Presentacional: formulario 5 campos + validaciones
```

---

## Decisiones Técnicas

### 1. Layout de 1 columna (no split)

**Decisión**: A diferencia del login (split 2 cols), el registro usa 1 columna centrada.

**Razón**: El formulario de registro tiene 5 campos — necesita más espacio vertical. Un split reduciría el ancho disponible y obligaría scroll en mobile. El header propio ("Logo" + "Volver") da identidad sin necesitar el panel de branding.

### 2. Validador de contraseñas a nivel de formulario

**Decisión**: `passwordMatchValidator` se aplica al `FormGroup`, no a un control individual.

**Razón**: La validación de coincidencia necesita acceder a 2 controles simultáneamente (`password` y `confirmPassword`). Los validadores a nivel de grupo reciben el `AbstractControl` del grupo completo y pueden comparar valores entre controles.

```typescript
static passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
```

### 3. Selector de fecha nativo (`type="date"`)

**Decisión**: Usar `<input type="date">` nativo en vez de `mat-datepicker`.

**Razón**: El mockup especifica "Selector nativo". Es más ligero (no requiere importar `MatDatepickerModule` ni `MatNativeDateModule`), funciona bien en mobile, y reduce el bundle del componente.

### 4. Reutilización del validador de fuerza de contraseña

**Decisión**: Duplicar `passwordStrengthValidator` en `registro-form.ts` como método estático.

**Razón**: Aunque la lógica es idéntica al de `login-form.ts`, extraerla a un archivo compartido ahora sería over-engineering — solo 2 componentes la usan. Cuando haya un tercer uso, se puede refactorizar a `shared/validators/password-strength.validator.ts`.

### 5. Header propio del registro (no el shared Header)

**Decisión**: Crear `registro-header` como componente propio del feature auth, no usar el `shared/components/header`.

**Razón**: El header de registro es completamente diferente al header compartido de la app (que tiene tabs de navegación). Este solo tiene "Logo" y "Volver" — es específico del flujo de auth.

---

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│  RegistroPage (orquestador)                                 │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  RegistroHeader                                       │  │
│  │  [Logo]                              [Volver → /login]│  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  RegistroForm                                         │  │
│  │                                                       │  │
│  │  [email]                                              │  │
│  │  [userName]                                           │  │
│  │  [password]                                           │  │
│  │  [confirmPassword]                                    │  │
│  │  [fechaNacimiento]                                    │  │
│  │  [Registrarme] (btn)                                  │  │
│  │                                                       │  │
│  │  output: registroSubmit ─────────────────────────────────→ onRegister()
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  onRegister(data) → console.log (futuro: AuthService)       │
└─────────────────────────────────────────────────────────────┘
```

---

## Modelo de Datos (evento emitido)

```typescript
interface RegistroData {
  email: string;
  userName: string;
  password: string;
  fechaNacimiento: string;  // formato yyyy-MM-dd (del input type=date)
}
```

---

## Validadores

| Validador | Nivel | Campos | Error key |
|-----------|-------|--------|-----------|
| required | Control | Todos | `required` |
| email | Control | email | `email` |
| minLength(6) | Control | password | `minlength` |
| passwordStrength | Control | password | `missingUppercase`, `missingNumber`, `missingSpecial` |
| passwordMatch | FormGroup | password + confirmPassword | `passwordMismatch` |
