import { Component, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SalidaService } from '../../../../../core/services/salida.service';

@Component({
  selector: 'app-agregar-salida',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './agregar-salida.component.html',
  styleUrl: './agregar-salida.component.scss',
})
export class AgregarSalidaComponent {
  // Permite volver a la pantalla anterior sin conocer la ruta exacta
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly dialogRef = inject(MatDialogRef<AgregarSalidaComponent>, { optional: true });
  private readonly salidaService = inject(SalidaService);
  // Constructor de formularios reactivos
  private readonly fb = inject(FormBuilder);

  // Formulario con el campo de código alfanumérico
  readonly form: FormGroup = this.fb.group({
    // Solo letras y números — el patrón rechaza espacios y caracteres especiales
    codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
  });

  // Signal para mostrar errores si el código no se encuentra
  readonly errorBusqueda = signal<string>('');

  // Vuelve a la pantalla anterior (dashboard)
  onCancelar(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.location.back();
    }
  }

  // Busca la salida por código y une al usuario
  onUnirme(): void {
    if (this.form.invalid) return;
    
    this.errorBusqueda.set('');
    const codigo = this.form.value.codigo;
    const salida = this.salidaService.unirseASalida(codigo);

    if (salida) {
      if (this.dialogRef) {
        this.dialogRef.close({ id: salida.id });
      } else {
        this.router.navigate(['/salidas', salida.id]);
      }
    } else {
      this.errorBusqueda.set('No se encontró ninguna salida con ese código.');
    }
  }
}
