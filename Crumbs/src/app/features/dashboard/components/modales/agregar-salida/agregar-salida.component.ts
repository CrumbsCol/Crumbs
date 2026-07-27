import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  private readonly dialogRef = inject(MatDialogRef<AgregarSalidaComponent>, { optional: true });
  // Constructor de formularios reactivos
  private readonly fb = inject(FormBuilder);

  // Formulario con el campo de código alfanumérico
  readonly form: FormGroup = this.fb.group({
    // Solo letras y números — el patrón rechaza espacios y caracteres especiales
    codigo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
  });

  // Vuelve a la pantalla anterior (dashboard)
  onCancelar(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.location.back();
    }
  }

  // Unirse a la salida por código de invitación
  onUnirme(): void {
    if (this.form.invalid) return;

    if (this.dialogRef) {
      this.dialogRef.close({ codigo: this.form.value.codigo });
    }
  }
}
