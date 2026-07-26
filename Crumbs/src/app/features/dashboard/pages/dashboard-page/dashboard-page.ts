import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
import { SalidaService } from '../../../../core/services/salida.service';
import { WelcomeHeaderComponent } from '../../components/welcome-header/welcome-header';
import { DashboardActionsComponent } from '../../components/dashboard-actions/dashboard-actions';
import { ActiveSalidasListComponent, Salida } from '../../components/active-salidas-list/active-salidas-list';
import { CrearSalidaComponent } from '../../components/modales/crear-salida/crear-salida.component';
import { AgregarSalidaComponent } from '../../components/modales/agregar-salida/agregar-salida.component';

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
export class DashboardPage implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly salidaService = inject(SalidaService);

  ngOnInit(): void {
    // Cargar las salidas del usuario desde el backend (solo en browser)
    if (isPlatformBrowser(this.platformId)) {
      this.salidaService.cargarSalidas();
    }
  }

  readonly nickName = computed<string>(() => {
    const user = this.userService.currentUser();
    if (!user) return 'Viajero';
    return user.nombre;
  });

  /** Lista de salidas activas derivada del SalidaService */
  readonly salidasActivas = computed<Salida[]>(() => {
    return this.salidaService.salidas().map((s: any) => ({
      id: s.id,
      label: s.titulo,
      description: `${s._count?.miembros ?? s.miembros?.length ?? 0} integrantes · ${s._count?.gastos ?? s.gastos?.length ?? 0} gastos`,
      fecha: new Date(s.fechaCreacion).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
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
    }).afterClosed().subscribe((result: { nombre: string; descripcion: string; fecha: Date; integrantes?: any[] } | undefined) => {
      if (result?.nombre) {
        // Crear la salida a través del servicio con los integrantes seleccionados
        this.salidaService.crearSalida(
          {
            titulo: result.nombre,
            descripcion: result.descripcion || '',
            fecha: new Date(result.fecha).toISOString(),
          },
          result.integrantes
        );
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
    }).afterClosed().subscribe((result: { codigo: string } | undefined) => {
      if (result?.codigo) {
        this.salidaService.unirseASalida(result.codigo);
      }
    });
  }
}
