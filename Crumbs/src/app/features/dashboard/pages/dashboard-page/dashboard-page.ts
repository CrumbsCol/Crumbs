import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
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
export class DashboardPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserService);

  readonly nickName = computed<string>(() => {
    const user = this.userService.currentUser();
    if (!user) return 'Viajero';
    return user.nombre.split(' ')[0];
  });

  /** Lista de salidas activas — empieza vacía, se llena al crear salidas */
  readonly salidasActivas = signal<Salida[]>([]);

  readonly isEmpty = computed<boolean>(() => this.salidasActivas().length === 0);

  // Abre el modal de creación de salida
  onCrearSalida(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.dialog.open(CrearSalidaComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'modal-salida',
      autoFocus: true,
    }).afterClosed().subscribe((result: { nombre: string; descripcion: string; fecha: Date } | undefined) => {
      if (result?.nombre) {
        // Formatear la fecha del Date object a string dd/MM/yyyy
        const date = new Date(result.fecha);
        const fechaStr = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

        const newSalida: Salida = {
          id: Date.now(),
          label: result.nombre,
          description: result.descripcion || '',
          fecha: fechaStr,
        };

        // Agregar y ordenar de más antigua a más reciente
        this.salidasActivas.update((list) => {
          const updated = [...list, newSalida];
          updated.sort((a, b) => {
            // Parsear dd/MM/yyyy a Date para comparar
            const parseDate = (s: string | undefined): number => {
              if (!s) return 0;
              const [d, m, y] = s.split('/').map(Number);
              return new Date(y, m - 1, d).getTime();
            };
            return parseDate(a.fecha) - parseDate(b.fecha);
          });
          return updated;
        });
      }
    });
  }

  // Abre el modal de agregar salida existente (por código)
  onAgregarSalida(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.dialog.open(AgregarSalidaComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'modal-salida',
      autoFocus: true,
    });
  }
}
