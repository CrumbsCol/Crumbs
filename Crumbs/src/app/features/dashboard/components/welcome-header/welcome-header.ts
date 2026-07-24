import { Component, input } from '@angular/core';

/**
 * Componente visual (Dumb Component) que muestra el banner de bienvenida del usuario.
 * 
 * Se encarga exclusivamente de renderizar un saludo personalizado usando
 * el nickname proporcionado. No contiene lógica de negocio ni dependencias externas.
 */
@Component({
  selector: 'app-welcome-header',
  standalone: true,
  imports: [],
  template: `
    <h1 class="welcome-title">¡Hola, {{ nickName() }}!</h1>
  `,
  styleUrl: './welcome-header.css'
})
export class WelcomeHeaderComponent {
  /** 
   * Nombre o apodo del usuario a mostrar en el título.
   * Es un input requerido (Signal Input).
   */
  nickName = input.required<string>();
}
