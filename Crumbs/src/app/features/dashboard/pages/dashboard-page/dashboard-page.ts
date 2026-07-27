import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
import { SalidaService } from '../../../../core/services/salida.service';
import { Miembro } from '../../../../core/interfaces/salida.interface';
import { WelcomeHeaderComponent } from '../../components/welcome-header/welcome-header';
import { DashboardActionsComponent } from '../../components/dashboard-actions/dashboard-actions';
import { ActiveSalidasListComponent, Salida } from '../../components/active-salidas-list/active-salidas-list';
import { CrearSalidaComponent } from '../../components/modales/crear-salida/crear-salida.component';
import { AgregarSalidaComponent } from '../../components/modales/agregar-salida/agregar-salida.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    WelcomeHeaderComponent,
    DashboardActionsComponent,
    ActiveSalidasListComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly salidaService = inject(SalidaService);

  readonly nickName = computed<string>(() => {
    const user = this.userService.currentUser();
    if (!user) return 'Viajero';
    return user.nombre.split(' ')[0];
  });

  /** Lista de salidas activas derivada del SalidaService */
  readonly salidasActivas = computed<Salida[]>(() => {
    return this.salidaService.salidas().map((s) => ({
      id: s.id,
      label: s.titulo,
      description: `${s.miembros.length} integrantes · ${s.gastos.length} gastos`,
      fecha: s.fechaCreacion,
    }));
  });

  readonly isEmpty = computed<boolean>(() => this.salidasActivas().length === 0);

  /**
   * Navega al detalle de la salida seleccionada.
   */
  onSalidaClick(salida: Salida): void {
    this.router.navigate(['/salidas', salida.id]);
  }

  /** Abre el modal de creación de salida */
  onCrearSalida(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.dialog.open(CrearSalidaComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'modal-salida',
      autoFocus: true,
    }).afterClosed().subscribe((result: { nombre: string; descripcion: string; fecha: Date; integrantes?: Miembro[] } | undefined) => {
      if (result?.nombre) {
        // Crear la salida a través del servicio para que quede registrada
        this.salidaService.crearSalida({
          titulo: result.nombre,
          descripcion: result.descripcion || '',
          fecha: new Date(result.fecha).toISOString(),
          miembros: result.integrantes || [],
        });
      }
    });
  }

  /** Abre el modal de agregar salida existente (por código) */
  onAgregarSalida(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.dialog.open(AgregarSalidaComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'modal-salida',
      autoFocus: true,
    }).afterClosed().subscribe((result: { id: string } | undefined) => {
      if (result?.id) {
        // Redirigir a la salida a la que nos acabamos de unir
        this.router.navigate(['/salidas', result.id]);
      }
    });
  }
}
