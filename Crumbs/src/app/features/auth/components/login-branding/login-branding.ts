import { Component } from '@angular/core';

/**
 * Componente presentacional: panel de branding para la página de login.
 *
 * Muestra el nombre de la app "Crumbs" y un subtítulo descriptivo.
 * Es puramente visual — no tiene lógica, servicios ni dependencias externas.
 * Se usa como panel izquierdo en el layout split de la página de login.
 */
@Component({
  selector: 'app-login-branding',
  standalone: true,
  imports: [],
  templateUrl: './login-branding.html',
  styleUrl: './login-branding.css',
})
export class LoginBranding {}
