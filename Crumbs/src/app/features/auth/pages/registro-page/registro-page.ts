import { Component } from '@angular/core';

import { RegistroHeader } from '../../components/registro-header/registro-header';
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
  imports: [RegistroHeader, RegistroForm],
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
    console.log('Registro:', data);
  }
}
