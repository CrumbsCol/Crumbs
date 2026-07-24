import { Component, signal, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

// Modelo de datos para cada integrante de la salida
export interface Integrante {
  id: number;
  nombre: string;
  descripcion: string;
}

/**
 * Validador personalizado para el campo de hora.
 * Acepta formato HH:MM con hora entre 1–12 y minutos entre 0–59.
 * Devuelve null si el campo está vacío (opcional) o si el valor es válido.
 */
function horaValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) return null; // campo opcional — se permite vacío
  const match = value.match(/^(\d{1,2}):(\d{2})$/);
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
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
  ],
  templateUrl: './crear-salida.component.html',
  styleUrl: './crear-salida.component.scss',
})
export class CrearSalidaComponent {
  // Permite volver a la pantalla anterior sin conocer la ruta exacta
  private readonly location = inject(Location);
  private readonly dialogRef = inject(MatDialogRef<CrearSalidaComponent>, { optional: true });
  // Constructor de formularios reactivos
  private readonly fb = inject(FormBuilder);

  // Definición del formulario con sus validaciones
  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],   // Campo obligatorio
    descripcion: [''],                    // Campo opcional
    fecha: [new Date()],                  // Por defecto: fecha de hoy
    hora: ['', horaValidator],            // Formato HH:MM validado, opcional
    horaPeriodo: ['AM'],                  // AM o PM, por defecto AM
  });

  // Opciones del selector AM/PM
  readonly periodos = ['AM', 'PM'];

  /** Lista de integrantes de la salida — incluye un ejemplo eliminable hasta conectar el backend */
  readonly integrantes = signal<Integrante[]>([
    { id: 1, nombre: 'Ana García', descripcion: 'Guía de montaña' },
  ]);

  // Elimina un integrante de la lista por su id
  removeIntegrante(id: number): void {
    this.integrantes.update((list) => list.filter((i) => i.id !== id));
  }

  // Vuelve a la pantalla anterior (dashboard)
  onCancelar(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.location.back();
    }
  }

  // Por implementar: enviará el formulario al backend para crear la salida
  onAgregar(): void {
    if (this.form.invalid) return;
    
    const values = this.form.value;
    const date: Date = values.fecha;
    const dateStr = date ? date.toLocaleDateString() : '';
    
    const newSalida = {
      label: values.nombre,
      description: values.descripcion,
      fecha: dateStr
    };
    
    if (this.dialogRef) {
      this.dialogRef.close(newSalida);
    }
  }

  /**
   * Bloquea cualquier tecla que no sea dígito, '/' o tecla de control.
   * Evita que el usuario escriba letras en el campo de fecha.
   */
  onFechaKeydown(event: KeyboardEvent): void {
    const allowed = /^[\d/]$/;
    const controlKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'Tab', 'Enter', 'Escape', 'Home', 'End',
    ];
    if (!allowed.test(event.key) && !controlKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
