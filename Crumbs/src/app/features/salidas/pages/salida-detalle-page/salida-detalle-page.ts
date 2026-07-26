import { Component, computed, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

import { SalidaService } from '../../../../core/services/salida.service';
import { Gasto, Miembro } from '../../../../core/interfaces/salida.interface';
import { CrearGastoRequest } from '../../../../core/interfaces/salida-request.interface';
import { DrawerAgregarGasto } from '../../components/drawer-agregar-gasto/drawer-agregar-gasto';
import { DrawerAgregarIntegrantes } from '../../components/drawer-agregar-integrantes/drawer-agregar-integrantes';
import { DrawerGestionFantasmas } from '../../components/drawer-gestion-fantasmas/drawer-gestion-fantasmas';
import { GastosCard } from '../../components/gastos-card/gastos-card';
import { DesgloseGastoModal } from '../../components/modals/desglose-gasto-modal/desglose-gasto-modal';
import { AvatarGroupComponent } from '../../../../shared/components/avatar-group/avatar-group';

/**
 * Página de detalle de una salida.
 *
 * Muestra el título de la salida, el código único de invitación,
 * un panel central con la lista de gastos, un panel de balances,
 * y botones de acción para agregar gastos e integrantes.
 */
@Component({
  selector: 'app-salida-detalle-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    DrawerAgregarGasto,
    DrawerAgregarIntegrantes,
    DrawerGestionFantasmas,
    GastosCard,
    AvatarGroupComponent,
  ],
  templateUrl: './salida-detalle-page.html',
  styleUrl: './salida-detalle-page.css',
})
export class SalidaDetallePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly salidaService = inject(SalidaService);
  private readonly dialog = inject(MatDialog);
  private readonly platformId = inject(PLATFORM_ID);

  /** Signal de la salida actual cargada */
  readonly salida = this.salidaService.salidaActual;

  /** Usuario actual en sesión */
  readonly usuarioActual = this.salidaService.usuarioActual;

  /** Gastos ordenados cronológicamente (más reciente primero) */
  readonly gastos = this.salidaService.gastosOrdenados;

  /** Miembros actuales de la salida */
  readonly miembros = this.salidaService.miembros;

  /** Balances netos por miembro */
  readonly balances = this.salidaService.balances;

  /** Desglose por gasto */
  readonly desgloseGastos = this.salidaService.desgloseGastos;

  /** Pagos registrados */
  readonly pagos = this.salidaService.pagos;

  /** Controla la visibilidad del drawer de agregar gasto */
  readonly drawerGastoAbierto = signal(false);

  /** Controla la visibilidad del drawer de agregar integrantes */
  readonly drawerIntegrantesAbierto = signal(false);

  /** Controla la visibilidad del drawer de gestión de fantasmas */
  readonly drawerFantasmasAbierto = signal(false);

  /** Signal con datos de fantasmas */
  readonly fantasmas = this.salidaService.fantasmas;

  /** Computed: si el usuario actual es creador de la salida */
  readonly esCreador = computed(() => {
    const usuario = this.usuarioActual();
    return usuario?.rol === 'creador';
  });

  /** Computed: si hay miembros fantasma en la salida */
  readonly tieneFantasmas = computed(() => {
    return this.miembros().some((m: any) => m.esFantasma);
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salidaService.cargarSalida(id);
    }
  }

  /** Abre el drawer para agregar un nuevo gasto */
  abrirDrawerGasto(): void {
    this.drawerGastoAbierto.set(true);
  }

  /** Cierra el drawer de agregar gasto */
  cerrarDrawerGasto(): void {
    this.drawerGastoAbierto.set(false);
  }

  /** Abre el drawer para agregar integrantes */
  abrirDrawerIntegrantes(): void {
    this.drawerIntegrantesAbierto.set(true);
  }

  /** Cierra el drawer de agregar integrantes */
  cerrarDrawerIntegrantes(): void {
    this.drawerIntegrantesAbierto.set(false);
  }

  /** Abre el drawer de gestión de fantasmas */
  abrirDrawerFantasmas(): void {
    const salida = this.salida();
    if (salida) {
      this.salidaService.cargarFantasmas(salida.id);
    }
    this.drawerFantasmasAbierto.set(true);
  }

  /** Cierra el drawer de gestión de fantasmas */
  cerrarDrawerFantasmas(): void {
    this.drawerFantasmasAbierto.set(false);
  }

  /** Confirma un pago de fantasma y recarga datos */
  onConfirmarPagoFantasma(pagoId: string): void {
    this.salidaService.confirmarPago(pagoId);
    // Recargar fantasmas después de confirmar
    const salida = this.salida();
    if (salida) {
      setTimeout(() => this.salidaService.cargarFantasmas(salida.id), 500);
    }
  }

  /**
   * Registra y confirma automáticamente el pago de un fantasma que debe dinero.
   * El creador confirma que el fantasma ya pagó en la vida real.
   */
  onSaldarDeudaFantasma(event: { fantasmaMiembroId: string; monto: number }): void {
    this.salidaService.saldarDeudaFantasma(event.fantasmaMiembroId, event.monto);
    const salida = this.salida();
    if (salida) {
      setTimeout(() => {
        this.salidaService.cargarFantasmas(salida.id);
        this.salidaService.cargarSalida(salida.id);
      }, 500);
    }
  }

  /** Maneja el evento de gasto agregado desde el drawer */
  onGastoAgregado(gasto: CrearGastoRequest): void {
    this.salidaService.agregarGasto(gasto);
    this.cerrarDrawerGasto();
  }

  /** Maneja el evento de integrantes agregados desde el drawer */
  onIntegrantesAgregados(miembros: Miembro[]): void {
    this.salidaService.agregarMiembros(miembros);
    this.cerrarDrawerIntegrantes();
  }

  /** Registra un pago de un deudor hacia un acreedor */
  registrarPago(deudorId: string, pagadorId: string, monto: number, gastoId?: string): void {
    this.salidaService.registrarPago(deudorId, pagadorId, monto, gastoId);
  }

  /** Confirma un pago pendiente */
  confirmarPago(pagoId: string): void {
    this.salidaService.confirmarPago(pagoId);
  }

  /** Obtiene el nombre de un miembro por ID */
  getNombreMiembro(id: string): string {
    const miembro = this.miembros().find((m) => m.id === id);
    return miembro?.nombre ?? 'Desconocido';
  }

  /** Abre el modal de desglose de un gasto */
  abrirDesgloseGasto(gasto: Gasto): void {
    const usuario = this.usuarioActual();
    if (!usuario) return;

    // Calcular las participaciones para pasarlas al modal
    // Esto es un parche porque no tenemos expuesto calcularParticipaciones públicamente en el servicio,
    // pero podemos obtenerlas del desglose de gastos global:
    const desgloses = this.desgloseGastos();
    const desglose = desgloses.find(d => d.gasto.id === gasto.id);
    const participaciones = desglose ? desglose.participaciones : [];

    const dialogRef = this.dialog.open(DesgloseGastoModal, {
      width: '450px',
      data: {
        gasto,
        usuarioActual: usuario,
        pagos: this.pagos(),
        participaciones
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'registrar_pago') {
        const payload = result.payload;
        this.registrarPago(payload.deudorId, payload.pagadorId, payload.monto, payload.gastoId);
      }
    });
  }
}
