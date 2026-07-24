import { Component, effect, input, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { User } from '../../../../core/interfaces/user.interface';

/**
 * Componente presentacional que muestra la tarjeta de perfil del usuario.
 *
 * Soporta dos modos:
 * - **Visualización** (editMode = false): Muestra los datos en form-fields readonly.
 * - **Edición** (editMode = true): Muestra inputs editables con validaciones.
 *
 * Validaciones de contraseña (mismas que en login):
 * - Mínimo 6 caracteres.
 * - Al menos 1 letra mayúscula [A-Z].
 * - Al menos 1 dígito [0-9].
 * - Al menos 1 carácter especial [!@#$%^&*].
 * - Confirmar contraseña debe coincidir con la nueva contraseña.
 *
 * Los campos editables se inicializan automáticamente cuando editMode cambia a true.
 */
@Component({
  selector: 'app-perfil-card',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './perfil-card.html',
  styleUrl: './perfil-card.css',
})
export class PerfilCard {
  /**
   * Datos del usuario a mostrar/editar en la tarjeta.
   * Es un input requerido: el componente padre debe proporcionarlo.
   */
  readonly user = input.required<User>();

  /**
   * Controla si la tarjeta está en modo edición o visualización.
   * Por defecto es false (solo lectura).
   */
  readonly editMode = input<boolean>(false);

  /**
   * Evento emitido cuando el usuario modifica sus datos en modo edición.
   * El padre decide si guardar o descartar los cambios.
   */
  readonly userChanged = output<Partial<User>>();

  /**
   * Formulario reactivo para los campos de edición del perfil.
   * Incluye validaciones de contraseña y coincidencia con confirmación.
   */
  readonly editForm = new FormGroup(
    {
      nombre: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.minLength(6),
        PerfilCard.passwordStrengthValidator,
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: PerfilCard.passwordsMatchValidator }
  );

  /**
   * FormControls de solo lectura para el modo visualización.
   * Se necesitan porque MatInput requiere un NgControl (formControl/ngModel)
   * para funcionar correctamente con MatFormField.
   */
  readonly readonlyNombre = new FormControl('');
  readonly readonlyUserName = new FormControl('');
  readonly readonlyFechaNacimiento = new FormControl('');
  readonly readonlyPassword = new FormControl('••••••••');

  constructor() {
    /**
     * Effect que se ejecuta cada vez que editMode cambia.
     * Cuando pasa a true, inicializa los campos del formulario con los valores
     * actuales del usuario automáticamente.
     * Cuando pasa a false, actualiza los controles readonly con los datos actuales.
     */
    effect(() => {
      const u = this.user();
      if (this.editMode()) {
        this.editForm.patchValue({
          nombre: u.nombre,
          userName: u.userName,
          fechaNacimiento: PerfilCard.toInputDate(u.fechaNacimiento),
          password: '',
          confirmPassword: '',
        });
        // Resetear el estado de validación de los campos de contraseña
        this.editForm.controls.password.markAsUntouched();
        this.editForm.controls.confirmPassword.markAsUntouched();
      } else {
        // Actualizar los controles readonly con datos frescos
        this.readonlyNombre.setValue(u.nombre);
        this.readonlyUserName.setValue(u.userName);
        this.readonlyFechaNacimiento.setValue(u.fechaNacimiento);
        this.readonlyPassword.setValue('••••••••');
      }
    });
  }

  // ─── VALIDADORES ────────────────────────────────────────────────────

  /**
   * Validador de fuerza de contraseña.
   * Verifica que la contraseña contenga:
   * - Al menos 1 letra mayúscula [A-Z]
   * - Al menos 1 dígito [0-9]
   * - Al menos 1 carácter especial [!@#$%^&*]
   *
   * Solo valida si hay valor (la contraseña es opcional al editar perfil).
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
   * Validador a nivel de grupo: verifica que password y confirmPassword coincidan.
   * Solo aplica si se ha escrito algo en el campo de contraseña.
   */
  static passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    // Si no hay contraseña nueva, no hay nada que confirmar
    if (!password) return null;

    return password === confirm ? null : { passwordsMismatch: true };
  }

  // ─── MÉTODOS PÚBLICOS ───────────────────────────────────────────────

  /**
   * Indica si el formulario tiene errores de contraseña que no coinciden.
   * Se usa en el template para mostrar el mensaje de error.
   */
  get passwordsMismatch(): boolean {
    return (
      this.editForm.hasError('passwordsMismatch') &&
      this.editForm.controls.confirmPassword.touched
    );
  }

  /**
   * Emite los datos editados al componente padre para que los persista.
   * Solo emite campos que hayan cambiado respecto al original.
   * No emite si las contraseñas no coinciden o hay errores de validación.
   */
  emitChanges(): void {
    // Marcar todos los campos como touched para mostrar errores
    this.editForm.markAllAsTouched();

    // Si hay contraseña pero el form tiene errores, no emitir
    const passwordValue = this.editForm.controls.password.value;
    if (passwordValue && this.editForm.invalid) {
      return;
    }

    const updates: Partial<User> = {};
    const u = this.user();
    const values = this.editForm.value;

    if (values.nombre && values.nombre !== u.nombre) {
      updates.nombre = values.nombre;
    }
    if (values.userName && values.userName !== u.userName) {
      updates.userName = values.userName;
    }
    if (values.fechaNacimiento) {
      // Convertir de yyyy-MM-dd (input date) a dd/MM/yyyy (formato de la app)
      const displayDate = PerfilCard.toDisplayDate(values.fechaNacimiento);
      if (displayDate !== u.fechaNacimiento) {
        updates.fechaNacimiento = displayDate;
      }
    }

    this.userChanged.emit(updates);
  }

  // ─── HELPERS DE FORMATO DE FECHA ────────────────────────────────────

  /**
   * Convierte fecha de formato display (dd/MM/yyyy) a formato input date (yyyy-MM-dd).
   * Si el formato no coincide, devuelve el valor original.
   */
  static toInputDate(displayDate: string): string {
    const parts = displayDate.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return displayDate;
  }

  /**
   * Convierte fecha de formato input date (yyyy-MM-dd) a formato display (dd/MM/yyyy).
   * Si el formato no coincide, devuelve el valor original.
   */
  static toDisplayDate(inputDate: string): string {
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return inputDate;
  }
}
