import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente presentacional: header de la página de registro.
 *
 * Muestra "Logo" a la izquierda y un enlace "Volver" a la derecha
 * que navega de vuelta a /login. Es puramente visual.
 */
@Component({
  selector: 'app-registro-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './registro-header.html',
  styleUrl: './registro-header.css',
})
export class RegistroHeader {}
