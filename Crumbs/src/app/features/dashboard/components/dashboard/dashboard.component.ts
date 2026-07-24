import { Component, signal, computed, inject, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

// Modelo de datos para cada salida que aparece en la lista
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
  // Servicio de navegación para cambiar de ruta
  private readonly router = inject(Router);
  // Identificador de plataforma para evitar acceder al DOM en SSR
  private readonly platformId = inject(PLATFORM_ID);

  /** Emitido como fallback cuando la navegación a /salidas/crear no es posible o falla */
  @Output() crearSalida = new EventEmitter<void>();

  /** Emitido como fallback cuando la navegación a /salidas/agregar no es posible o falla */
  @Output() agregarSalida = new EventEmitter<void>();

  /** Nombre del usuario autenticado — se actualizará desde el servicio de auth en el futuro */
  readonly nickName = signal<string>('Viajero');

  /** Título de bienvenida generado automáticamente a partir del nickName */
  readonly welcomeTitle = computed<string>(() => `¡Hola, ${this.nickName()}!`);

  /** Lista de salidas activas del usuario — datos de ejemplo hasta conectar el backend */
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

  /** true cuando no hay salidas — controla qué bloque renderiza el template */
  readonly isEmpty = computed<boolean>(() => this.salidasActivas().length === 0);

  // Navega a la pantalla de creación de salida
  // Usa fallback de Output en SSR o si el router lanza un error
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

  // Navega a la pantalla de agregar salida existente
  // Usa fallback de Output en SSR o si el router lanza un error
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
