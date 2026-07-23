import { Component, signal, computed, inject, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

export interface Salida {
  id: number;
  label: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule, MatRippleModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  /** Emitido como fallback cuando la navegación a /salidas/crear no es posible o falla */
  @Output() crearSalida = new EventEmitter<void>();

  /** Emitido como fallback cuando la navegación a /salidas/agregar no es posible o falla */
  @Output() agregarSalida = new EventEmitter<void>();

  /** Nick name del usuario autenticado, gestionado con Signal */
  readonly nickName = signal<string>('Viajero');

  /** Título de bienvenida derivado del nickName */
  readonly welcomeTitle = computed<string>(() => `¡Hola, ${this.nickName()}!`);

  /** Lista de salidas activas, gestionada con Signal */
  readonly salidasActivas = signal<Salida[]>([
    {
      id: 1,
      label: 'Ruta Sierra Norte',
      description: 'Senderismo por la sierra con paradas en pueblos medievales.',
    },
    {
      id: 2,
      label: 'Costa Dorada Express',
      description: 'Recorrido de 3 días por playas y calas del litoral.',
    },
    {
      id: 3,
      label: 'Pirineos Aventura',
      description: 'Travesía de alta montaña con refugios de montaña.',
    },
  ]);

  /** Indica si la lista de salidas está vacía */
  readonly isEmpty = computed<boolean>(() => this.salidasActivas().length === 0);

  async onCrearSalida(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      this.crearSalida.emit();
      return;
    }
    try {
      await this.router.navigate(['/salidas/crear']);
    } catch (err) {
      console.error('[DashboardComponent] navegación fallida:', err);
      this.crearSalida.emit();
    }
  }

  async onAgregarSalida(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      this.agregarSalida.emit();
      return;
    }
    try {
      await this.router.navigate(['/salidas/agregar']);
    } catch (err) {
      console.error('[DashboardComponent] navegación fallida:', err);
      this.agregarSalida.emit();
    }
  }
}
