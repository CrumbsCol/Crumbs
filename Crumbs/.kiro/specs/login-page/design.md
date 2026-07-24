# Design: Página de Login (Módulo Auth)

#[[file:requirements.md]]

---

## Arquitectura de Componentes

```
src/app/features/auth/
├── pages/
│   └── login-page/                  # Orquestador: define layout, conecta eventos
│       ├── login-page.ts
│       ├── login-page.html
│       ├── login-page.css
│       └── login-page.spec.ts
├── components/
│   ├── login-branding/              # Presentacional: panel visual de branding
│   │   ├── login-branding.ts
│   │   ├── login-branding.html
│   │   ├── login-branding.css
│   │   └── login-branding.spec.ts
│   └── login-form/                  # Presentacional: formulario + validaciones + output
│       ├── login-form.ts
│       ├── login-form.html
│       ├── login-form.css
│       └── login-form.spec.ts
```

---

## Decisiones Técnicas

### 1. Separación en 3 componentes (Branding + Form + Page)

**Decisión**: No poner todo en un solo componente monolítico.

**Razón**: Sigue el patrón establecido en `perfil/` donde `perfil-page` orquesta y `perfil-card` es presentacional. Cada componente tiene una única responsabilidad:
- `login-branding`: Solo visual, sin lógica. Fácil de cambiar diseño sin tocar formulario.
- `login-form`: Toda la lógica de validación. Reutilizable si se necesitara en otro contexto.
- `login-page`: Solo ensamblaje y manejo de eventos. Punto de inyección futuro para AuthService.

### 2. Output en vez de Service para comunicación Form → Page

**Decisión**: `LoginForm` emite un `output()` con las credenciales. No inyecta servicios.

**Razón**: Mantiene el componente presentacional puro (fácil de testear). El padre decide qué hacer con las credenciales. Cuando se integre autenticación real, solo se modifica `login-page.ts` para inyectar `AuthService` — el formulario no cambia.

```typescript
// login-form.ts — emite credenciales al padre
readonly loginSubmit = output<{ emailOrUsername: string; password: string }>();

// login-page.ts — recibe y actúa
onLogin(credentials) { console.log('Login:', credentials); }
```

### 3. Validador custom estático para fuerza de contraseña

**Decisión**: Implementar `passwordStrengthValidator` como método estático del componente.

**Razón**: Angular requiere que los validadores sean funciones puras. Un método estático permite referenciarla directamente en el array de validators sin instanciar nada. Retorna errores granulares (`missingUppercase`, `missingNumber`, `missingSpecial`) para poder mostrar mensajes específicos por cada requisito.

```typescript
static passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null; // Validators.required se encarga del vacío

  const errors: ValidationErrors = {};
  if (!/[A-Z]/.test(value)) errors['missingUppercase'] = true;
  if (!/[0-9]/.test(value)) errors['missingNumber'] = true;
  if (!/[!@#$%^&*]/.test(value)) errors['missingSpecial'] = true;

  return Object.keys(errors).length ? errors : null;
}
```

### 4. Layout con CSS Grid (no Flexbox)

**Decisión**: Usar `display: grid; grid-template-columns: 1fr 1fr;` para el split.

**Razón**: Grid permite definir columnas iguales de forma declarativa y el responsive se resuelve con un solo cambio (`grid-template-columns: 1fr`). Flexbox requeriría más código para lograr el mismo resultado con alturas iguales.

### 5. Estilos del layout en el Page, estilos internos en cada Component

**Decisión**: El CSS del `login-page` solo define el grid y el panel derecho. Cada componente hijo maneja sus propios estilos internos.

**Razón**: Encapsulación de estilos. Si se cambia el branding (colores, tipografía), solo se toca `login-branding.css`. Si se cambia el layout general, solo se toca `login-page.css`.

### 6. Angular Material con appearance="outline"

**Decisión**: Usar `mat-form-field` con `appearance="outline"` para ambos campos.

**Razón**: El outline es más limpio visualmente y funciona mejor sobre fondos claros. Es el estilo recomendado por Material Design 3 para formularios.

### 7. @angular/animations como dependencia

**Decisión**: Instalar `@angular/animations@^21.2.0` como dependencia del proyecto.

**Razón**: Angular Material requiere el módulo de animaciones para funcionar correctamente. En tests se usa `provideNoopAnimations()` para evitar animaciones reales pero la dependencia debe existir.

---

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│  LoginPage (orquestador)                                    │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │  LoginBranding      │  │  LoginForm                  │  │
│  │                     │  │                             │  │
│  │  [Crumbs]           │  │  [email input]              │  │
│  │  [subtítulo]        │  │  [password input]           │  │
│  │                     │  │  [Iniciar Sesión] (btn)     │  │
│  │  (sin lógica)       │  │  [Registrarse] (link)       │  │
│  │                     │  │                             │  │
│  │                     │  │  output: loginSubmit ──────────→ onLogin()
│  └─────────────────────┘  └─────────────────────────────┘  │
│                                                             │
│  onLogin(credentials) → console.log (futuro: AuthService)   │
└─────────────────────────────────────────────────────────────┘
```

---

## Modelo de Datos (evento)

```typescript
// Interfaz implícita del evento emitido por LoginForm
interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}
```

---

## Dependencias de Angular Material

| Módulo | Componente | Uso |
|--------|-----------|-----|
| `MatFormFieldModule` | LoginForm | Campos de texto con label y errores |
| `MatInputModule` | LoginForm | Input directive para mat-form-field |
| `MatButtonModule` | LoginForm | Botón "Iniciar Sesión" |

---

## Variables CSS del Tema Utilizadas

| Variable | Donde se usa | Propósito |
|----------|-------------|-----------|
| `--mat-sys-primary` | login-branding | Fondo del panel de branding |
| `--mat-sys-on-primary` | login-branding | Color del texto sobre fondo primario |
| `--mat-sys-surface` | login-page | Fondo del panel de formulario |
| `--mat-sys-on-surface` | login-form | Color del título del formulario |
| `--mat-sys-on-surface-variant` | login-form | Color del texto secundario (enlace) |

---

## Compatibilidad

- **SSR**: No usa APIs del browser. Los signals y FormGroup son compatibles con SSR.
- **Lazy Loading**: La ruta `/login` ya usa `loadComponent()` — el chunk se genera automáticamente.
- **Accesibilidad**: `mat-form-field` provee labels asociados, `mat-error` se anuncia vía aria-live.
