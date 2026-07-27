import { Component, inject } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { RegistroHeader } from '../../components/registro-header/registro-header';
import { RegistroForm } from '../../components/registro-form/registro-form';

/**
 * Página de registro de usuario — componente orquestador.
 *
 * Responsabilidades:
 * - Define el layout de 1 columna con header arriba y formulario centrado.
 * - Ensambla los componentes presentacionales RegistroHeader y RegistroForm.
 * - Recibe el evento registroSubmit del formulario y ejecuta el registro vía AuthService.
 */
@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [RegistroHeader, RegistroForm],
  templateUrl: './registro-page.html',
  styleUrl: './registro-page.css',
})
export class RegistroPage {
  private readonly authService = inject(AuthService);

  /**
   * Maneja el evento de registro emitido por RegistroForm.
   * Llama al AuthService para registrar al usuario en el backend.
   */
  onRegister(data: {
    nombre: string;
    apellido: string;
    email: string;
    userName: string;
    password: string;
    fechaNacimiento: string;
  }): void {
    this.authService.register(data).subscribe({
      error: (err) => {
        // TODO: Mostrar error en la UI (ej: email duplicado)
        console.error('Error de registro:', err);
      },
    });
  }
}
