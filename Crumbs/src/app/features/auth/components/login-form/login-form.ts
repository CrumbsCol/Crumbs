import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Componente presentacional: formulario de inicio de sesión.
 *
 * Responsabilidades:
 * - Renderiza los campos de email/usuario y contraseña usando Angular Material.
 * - Aplica validaciones reactivas (requerido, email, fuerza de contraseña).
 * - Emite las credenciales al componente padre cuando el formulario es válido.
 *
 * NO inyecta servicios ni decide qué hacer con las credenciales.
 * El padre (LoginPage) decide la acción post-submit.
 */
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  /** Evento que se emite al padre con las credenciales cuando el submit es válido */
  readonly loginSubmit = output<{ emailOrUsername: string; password: string }>();

  /**
   * Formulario reactivo con dos campos:
   * - emailOrUsername: requerido + formato email válido
   * - password: requerido + mínimo 6 chars + mayúscula + número + especial
   */
  readonly loginForm = new FormGroup({
    emailOrUsername: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      LoginForm.passwordStrengthValidator,
    ]),
  });

  /**
   * Validador custom que verifica la fuerza de la contraseña.
   * Retorna errores individuales para cada requisito no cumplido:
   * - missingUppercase: falta al menos 1 letra mayúscula [A-Z]
   * - missingNumber: falta al menos 1 dígito [0-9]
   * - missingSpecial: falta al menos 1 carácter especial [!@#$%^&*]
   *
   * Si el valor está vacío, retorna null (lo maneja Validators.required).
   */
  static passwordStrengthValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
      errors['missingUppercase'] = true;
    }
    if (!/[0-9]/.test(value)) {
      errors['missingNumber'] = true;
    }
    if (!/[!@#$%^&*]/.test(value)) {
      errors['missingSpecial'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  /**
   * Maneja el submit del formulario.
   * Solo emite el evento si el formulario es válido.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginSubmit.emit({
        emailOrUsername: this.loginForm.controls.emailOrUsername.value!,
        password: this.loginForm.controls.password.value!,
      });
    }
  }
}
