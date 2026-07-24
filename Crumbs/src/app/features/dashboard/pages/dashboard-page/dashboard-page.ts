import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
import { WelcomeHeaderComponent } from '../../components/welcome-header/welcome-header';
import { DashboardActionsComponent } from '../../components/dashboard-actions/dashboard-actions';
import { ActiveSalidasListComponent, Salida } from '../../components/active-salidas-list/active-salidas-list';
import { CrearSalidaComponent } from '../../components/modales/crear-salida/crear-salida.component';
import { AgregarSalidaComponent } from '../../components/modales/agregar-salida/agregar-salida.component';

/**
 * Componente principal (Smart Component) de la vista de Dashboard.
 * 
 * Se encarga de:
 * - Orquestar los componentes visuales (Dumb Components) como WelcomeHeader, DashboardActions y ActiveSalidasList.
 * - Consultar al UserService para obtener los datos del usuario logueado.
 * - Mantener el estado de la lista de salidas activas del usuario.
 * - Abrir y gestionar los modales (MatDialog) para crear o unirse a salidas.
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    WelcomeHeaderComponent,
    DashboardActionsComponent,
    ActiveSalidasListComponent
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserService);

  readonly nickName = computed<string>(() => {
    const user = this.userService.currentUser();
    if (!user) return 'Viajero';
    return user.nombre.split(' ')[0];
  });

  readonly salidasActivas = signal<Salida[]>([
    {
      id: 1,
      label: 'Ruta Sierra Norte',
      description: 'Senderismo por la sierra con paradas en pueblos medievales.',
      fecha: '10/08/2026'
    },
    {
      id: 2,
      label: 'Costa Dorada Express',
      description: 'Recorrido de 3 días por playas y calas del litoral.',
      fecha: '15/08/2026'
    },
    {
      id: 3,
      label: 'Pirineos Aventura',
      description: 'Travesía de alta montaña con refugios de montaña.',
      fecha: '02/09/2026'
    },
  ]);

  readonly isEmpty = computed<boolean>(() => this.salidasActivas().length === 0);

  async onCrearSalida(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.dialog.open(CrearSalidaComponent, {
      width: '100%',
      maxWidth: '600px'
    }).afterClosed().subscribe(result => {
      if (result) {
        // En una app real, el ID vendría del backend. Aquí generamos uno temporal.
        const newSalida = { ...result, id: Date.now() };
        this.salidasActivas.update(salidas => [newSalida, ...salidas]);
      }
    });
  }

  async onAgregarSalida(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.dialog.open(AgregarSalidaComponent, {
      width: '100%',
      maxWidth: '500px'
    }).afterClosed().subscribe(result => {
      if (result) {
        const newSalida = { ...result, id: Date.now() };
        this.salidasActivas.update(salidas => [newSalida, ...salidas]);
      }
    });
  }
}
