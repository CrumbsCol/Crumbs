import { Component, output } from '@angular/core';
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
 * Componente presentacional: formulario de registro de usuario.
 *
 * Responsabilidades:
 * - Renderiza 5 campos: email, usuario, contraseña, confirmar contraseña, fecha de nacimiento.
 * - Aplica validaciones reactivas incluyendo coincidencia de contraseñas.
 * - Emite los datos de registro al componente padre cuando el formulario es válido.
 *
 * NO inyecta servicios — el padre (RegistroPage) decide qué hacer con los datos.
 */
@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.css',
})
export class RegistroForm {
  /** Evento que emite los datos de registro al padre cuando el submit es válido */
  readonly registroSubmit = output<{
    email: string;
    userName: string;
    password: string;
    fechaNacimiento: string;
  }>();

  /**
   * Formulario reactivo con 5 campos y validador a nivel de formulario
   * para verificar que las contraseñas coincidan.
   */
  readonly registroForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        RegistroForm.passwordStrengthValidator,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
    },
    { validators: RegistroForm.passwordMatchValidator }
  );

  /**
   * Validador custom que verifica la fuerza de la contraseña.
   * Requiere al menos: 1 mayúscula, 1 número y 1 carácter especial.
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
   * Validador a nivel de formulario que verifica que password y confirmPassword coincidan.
   * Se aplica al FormGroup completo, no a un control individual.
   */
  static passwordMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Maneja el submit del formulario.
   * Solo emite el evento si el formulario es válido.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      this.registroSubmit.emit({
        email: this.registroForm.controls.email.value!,
        userName: this.registroForm.controls.userName.value!,
        password: this.registroForm.controls.password.value!,
        fechaNacimiento: this.registroForm.controls.fechaNacimiento.value!,
      });
    }
  }
}
