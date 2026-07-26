import { Component, signal, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { Miembro } from '../../../../../core/interfaces/salida.interface';
import { DrawerAgregarIntegrantes } from '../../../../salidas/components/drawer-agregar-integrantes/drawer-agregar-integrantes';

/**
 * Validador personalizado para el campo de hora.
 * Acepta formato exacto XX:XX con hora entre 01–12 y minutos entre 00–59.
 */
function horaValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) return null;
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return { horaFormato: true };
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 1 || h > 12) return { horaRango: true };
  if (m < 0 || m > 59) return { minutosRango: true };
  return null;
}

@Component({
  selector: 'app-crear-salida',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    DrawerAgregarIntegrantes,
  ],
  templateUrl: './crear-salida.component.html',
  styleUrl: './crear-salida.component.scss',
})
export class CrearSalidaComponent {
  // Referencia al diálogo para poder cerrarlo
  private readonly dialogRef = inject(MatDialogRef<CrearSalidaComponent>);
  // Constructor de formularios reactivos
  private readonly fb = inject(FormBuilder);

  // Calcula la hora actual en formato 12h para los valores por defecto
  private readonly now = new Date();
  private readonly currentHour12 = this.now.getHours() % 12 || 12;
  private readonly currentMinutes = this.now.getMinutes();
  private readonly currentPeriod = this.now.getHours() >= 12 ? 'PM' : 'AM';
  private readonly defaultHora = `${this.currentHour12.toString().padStart(2, '0')}:${this.currentMinutes.toString().padStart(2, '0')}`;

  // Definición del formulario — fecha y hora se autocompletean con la actual
  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    fecha: [new Date(), Validators.required],
    hora: [this.defaultHora, [Validators.required, horaValidator]],
    horaPeriodo: [this.currentPeriod],
  });

  // Opciones del selector AM/PM
  readonly periodos = ['AM', 'PM'];

  /** Lista de integrantes seleccionados para la salida (Miembro del dominio) */
  readonly integrantes = signal<Miembro[]>([]);

  /** Controla si el drawer de agregar integrantes está visible */
  readonly drawerIntegrantesAbierto = signal(false);

  /** Abre el drawer de agregar integrantes */
  abrirDrawerIntegrantes(): void {
    this.drawerIntegrantesAbierto.set(true);
  }

  /** Cierra el drawer de agregar integrantes */
  cerrarDrawerIntegrantes(): void {
    this.drawerIntegrantesAbierto.set(false);
  }

  /** Recibe los integrantes seleccionados desde el drawer y los agrega a la lista */
  onIntegrantesAgregados(nuevos: Miembro[]): void {
    this.integrantes.update((actuales) => {
      const idsExistentes = new Set(actuales.map((m) => m.id));
      const filtrados = nuevos.filter((m) => !idsExistentes.has(m.id));
      return [...actuales, ...filtrados];
    });
    this.cerrarDrawerIntegrantes();
  }

  /** Elimina un integrante de la lista por su id */
  removeIntegrante(id: string): void {
    this.integrantes.update((list) => list.filter((i) => i.id !== id));
  }

  // Cierra el modal sin guardar
  onCancelar(): void {
    this.dialogRef.close();
  }

  // Cierra el modal y devuelve los datos del formulario + integrantes al dashboard
  onAgregar(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.dialogRef.close({
        nombre: this.form.get('nombre')?.value,
        descripcion: this.form.get('descripcion')?.value,
        fecha: this.form.get('fecha')?.value,
        integrantes: this.integrantes(),
      });
    }
  }

  /**
   * Controla el campo de hora con formato fijo HH:MM.
   * El ':' en posición 2 es permanente — no se puede borrar.
   * Solo se pueden modificar los dígitos en posiciones 0, 1, 3, 4.
   */
  onHoraKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const pos = input.selectionStart ?? 0;

    const controlKeys = [
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Tab', 'Enter', 'Escape', 'Home', 'End',
    ];

    // Permitir teclas de navegación siempre
    if (controlKeys.includes(event.key)) {
      return;
    }

    // Bloquear Delete y Backspace — no se puede borrar, solo reemplazar
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      return;
    }

    // Solo permitir dígitos
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    // Si estamos en posición 2 (el ':'), saltar al siguiente dígito
    const insertPos = pos === 2 ? 3 : pos;

    // No permitir escribir más allá de posición 4
    if (insertPos > 4) {
      event.preventDefault();
      return;
    }

    // Reemplazar el dígito en la posición actual
    event.preventDefault();
    const currentValue = input.value;
    const chars = currentValue.split('');
    chars[insertPos] = event.key;
    const newValue = chars.join('');
    input.value = newValue;
    this.form.get('hora')?.setValue(newValue, { emitEvent: true });

    // Mover el cursor a la siguiente posición editable
    let nextPos = insertPos + 1;
    if (nextPos === 2) nextPos = 3;
    setTimeout(() => input.setSelectionRange(nextPos, nextPos));
  }

  /**
   * Restaura el formato si el input se corrompe (ej: paste).
   * Asegura que siempre sea XX:XX.
   */
  onHoraInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');
    digits = digits.slice(0, 4).padEnd(4, '0');
    const formatted = digits.slice(0, 2) + ':' + digits.slice(2, 4);
    input.value = formatted;
    this.form.get('hora')?.setValue(formatted, { emitEvent: true });
  }
}
