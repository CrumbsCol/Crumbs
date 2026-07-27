import {
  Component,
  input,
  output,
  signal,
  computed,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MetodoDivision, Miembro } from '../../../../core/interfaces/salida.interface';
import { CrearGastoRequest } from '../../../../core/interfaces/salida-request.interface';

/**
 * Panel lateral (drawer) para agregar un nuevo gasto a la salida.
 */
@Component({
  selector: 'app-drawer-agregar-gasto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './drawer-agregar-gasto.html',
  styleUrl: './drawer-agregar-gasto.css',
})
export class DrawerAgregarGasto {
  private readonly fb = inject(FormBuilder);

  /** Controla si el drawer está visible */
  readonly abierto = input<boolean>(false);

  /** Lista de miembros de la salida actual */
  readonly miembros = input<Miembro[]>([]);

  /** Evento emitido al cerrar el drawer */
  readonly cerrar = output<void>();

  /** Evento emitido al agregar un gasto exitosamente */
  readonly gastoAgregado = output<CrearGastoRequest>();

  /** Controla el toggle de método de división: false = equitativo, true = manual */
  readonly esManual = signal(false);

  /** Set de IDs de miembros seleccionados como participantes */
  readonly miembrosSeleccionados = signal<Set<string>>(new Set());

  /** Map de IDs de miembros marcados como invitados */
  readonly invitados = signal<Set<string>>(new Set());

  /** Map de montos manuales por miembro ID */
  readonly montosManual = signal<Map<string, number>>(new Map());

  /** ID del pagador seleccionado */
  readonly pagadorId = signal<string>('');

  /** Formulario reactivo para los datos del gasto */
  readonly form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
    descripcion: [''],
    monto: [null, [Validators.required, Validators.min(1), Validators.max(9999999), Validators.pattern(/^\d+$/)]],
    fecha: [null, Validators.required],
    pagador: ['', Validators.required],
  });

  /** Participantes no-invitados seleccionados */
  readonly participantesNoInvitados = computed(() => {
    const seleccionados = this.miembrosSeleccionados();
    const invitadosSet = this.invitados();
    const miembrosArr = this.miembros();
    return miembrosArr.filter(
      (m) => seleccionados.has(m.id) && !invitadosSet.has(m.id)
    );
  });

  /** Total de montos manuales ingresados */
  readonly totalManual = computed(() => {
    const montos = this.montosManual();
    let total = 0;
    montos.forEach((v) => (total += v || 0));
    return total;
  });

  /** Monto del gasto desde el formulario */
  readonly montoGasto = computed(() => {
    return this.form.get('monto')?.value ?? 0;
  });

  /** Indica si los montos manuales suman exactamente el total */
  readonly manualesValidos = computed(() => {
    if (!this.esManual()) return true;
    return this.totalManual() === (this.form.get('monto')?.value ?? 0);
  });

  /** Cambia el método de división entre equitativo y manual */
  toggleMetodoDivision(): void {
    this.esManual.update((v) => !v);
    if (!this.esManual()) {
      this.montosManual.set(new Map());
    }
  }

  /** Alterna la selección de un miembro como participante */
  toggleMiembro(id: string): void {
    this.miembrosSeleccionados.update((set) => {
      const copia = new Set(set);
      if (copia.has(id)) {
        copia.delete(id);
      } else {
        copia.add(id);
      }
      return copia;
    });
  }

  /** Verifica si un miembro está seleccionado */
  estaSeleccionado(id: string): boolean {
    return this.miembrosSeleccionados().has(id);
  }

  /** Alterna si un miembro es invitado en este gasto */
  toggleInvitado(id: string): void {
    this.invitados.update((set) => {
      const copia = new Set(set);
      if (copia.has(id)) {
        copia.delete(id);
      } else {
        copia.add(id);
      }
      return copia;
    });
  }

  /** Verifica si un miembro es invitado */
  esInvitado(id: string): boolean {
    return this.invitados().has(id);
  }

  /** Actualiza el monto manual de un participante */
  setMontoManual(id: string, valor: number): void {
    this.montosManual.update((map) => {
      const copia = new Map(map);
      copia.set(id, valor || 0);
      return copia;
    });
  }

  /** Obtiene el monto manual de un participante */
  getMontoManual(id: string): number {
    return this.montosManual().get(id) ?? 0;
  }

  /** Envía el formulario y emite el gasto creado */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const seleccionadosIds = this.miembrosSeleccionados();
    if (seleccionadosIds.size === 0) return;

    // Validate manual totals
    if (this.esManual() && !this.manualesValidos()) return;

    const valores = this.form.value;
    const miembrosArr = this.miembros();
    const participantes = miembrosArr.filter((m) => seleccionadosIds.has(m.id));
    const pagador = miembrosArr.find((m) => m.id === valores.pagador);

    if (!pagador) return;

    const metodoDivision: MetodoDivision = this.esManual()
      ? 'manual'
      : 'equitativo';

    const fecha = valores.fecha instanceof Date
      ? valores.fecha.toISOString()
      : new Date().toISOString();

    const request: CrearGastoRequest = {
      nombre: valores.nombre,
      descripcion: valores.descripcion || undefined,
      monto: valores.monto,
      fecha,
      metodoDivision,
      pagadoPorMiembroId: valores.pagador,
      participantes: participantes.map((m) => ({
        salidaMiembroId: m.id,
        esInvitado: this.esInvitado(m.id),
        montoManual: this.esManual() && !this.esInvitado(m.id)
          ? this.getMontoManual(m.id)
          : null,
      })),
    };

    this.gastoAgregado.emit(request);
    this.resetForm();
  }

  /** Cierra el drawer y resetea el formulario */
  onCerrar(): void {
    this.cerrar.emit();
    this.resetForm();
  }

  /** Resetea el formulario a su estado inicial */
  private resetForm(): void {
    this.form.reset();
    this.esManual.set(false);
    this.miembrosSeleccionados.set(new Set());
    this.invitados.set(new Set());
    this.montosManual.set(new Map());
    this.pagadorId.set('');
  }
}
