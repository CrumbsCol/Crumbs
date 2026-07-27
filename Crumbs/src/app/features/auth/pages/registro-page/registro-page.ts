import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { RegistroForm } from '../../components/registro-form/registro-form';

/**
 * Página de registro de usuario — componente orquestador.
 *
 * Responsabilidades:
 * - Define el layout de 1 columna con header arriba y formulario centrado.
 * - Ensambla los componentes presentacionales RegistroHeader y RegistroForm.
 * - Recibe el evento registroSubmit del formulario y ejecuta la acción de registro.
 *
 * Se renderiza fuera del MainLayout (sin header compartido) porque las rutas
 * de autenticación no necesitan el header principal de la app.
 *
 * Futuro: inyectar AuthService y redirigir al login o dashboard tras registro exitoso.
 */
@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [RegistroForm, MatButtonModule, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: './registro-page.html',
  styleUrl: './registro-page.css',
})
export class RegistroPage {
  /**
   * Maneja el evento de registro emitido por RegistroForm.
   * Recibe los datos del formulario validados.
   * Por ahora solo loguea en consola — en futuro llamará a AuthService.register().
   */
  onRegister(data: {
    email: string;
    userName: string;
    password: string;
    fechaNacimiento: string;
  }): void {
    // TODO: Conectar con el backend (DB) para guardar el nuevo usuario y luego redirigir.
    console.log('Registro:', data);
  }
}
