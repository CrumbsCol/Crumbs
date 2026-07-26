import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Salida,
  Gasto,
  Miembro,
  Pago,
} from '../interfaces/salida.interface';
import { CrearGastoRequest, RegistrarPagoRequest } from '../interfaces/salida-request.interface';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

/** Respuesta del endpoint GET /api/balance-detallado */
export interface BalanceDetalladoResponse {
  totalMeDeben: number;
  totalDebo: number;
  balanceNeto: number;
  creditos: { persona: string; monto: number; salida: string; salidaId: string }[];
  deudas: { persona: string; monto: number; salida: string; salidaId: string }[];
}

/** Resumen de un fantasma con balance y pagos pendientes */
export interface FantasmaResumen {
  miembro: { id: string; nombre: string; esFantasma: boolean; rol: string };
  balance: { totalAdelantado: number; totalCorrespondiente: number; balanceNeto: number };
  pagosPendientes: { id: string; monto: number; deudorId: string; deudorNombre: string; fecha: string }[];
}

/** Elemento de la lista de salidas del backend */
interface SalidaListItem {
  id: string;
  titulo: string;
  descripcion?: string;
  codigoInvitacion: string;
  fechaCreacion: string;
  miembros?: Miembro[];
  gastos?: Gasto[];
  pagos?: { id: string; monto: number; estado: string }[];
  _count?: { miembros: number; gastos: number };
}

/** Respuesta del endpoint POST /api/salidas/:id/pagos */
interface PagoResponse {
  id: string;
  deudorId: string;
  pagadorId: string;
  monto: number;
  estado: string;
  fecha: string;
}

/**
 * Representa el balance neto de un miembro en la salida.
 */
export interface BalanceMiembro {
  miembro: Miembro;
  /** Total adelantado (pagado por este miembro) */
  totalAdelantado: number;
  /** Total que le corresponde pagar */
  totalCorrespondiente: number;
  /** Balance neto: positivo = le deben, negativo = debe */
  balanceNeto: number;
}

/**
 * Desglose por gasto: quién pagó y cuánto le toca a cada participante.
 */
export interface DesgloseGasto {
  gasto: Gasto;
  pagador: Miembro;
  participaciones: { miembro: Miembro; monto: number }[];
}

/**
 * Servicio de gestión de Salidas conectado al backend real.
 * Usa signals de Angular para estado reactivo + HttpClient para persistencia.
 */
@Injectable({ providedIn: 'root' })
export class SalidaService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly apiUrl = environment.apiUrl;

  /** Signal privado con todas las salidas del usuario */
  private readonly _salidas = signal<Salida[]>([]);

  /** Signal de solo lectura con todas las salidas disponibles */
  readonly salidas = this._salidas.asReadonly();

  /** Computed: Usuario actual adaptado a la interfaz Miembro */
  readonly usuarioActual = computed<Miembro | null>(() => {
    const user = this.userService.currentUser();
    if (!user) return null;

    // Si hay una salida cargada, buscar el SalidaMiembro correspondiente al user
    const salida = this._salidaActual();
    if (salida) {
      const miembro = salida.miembros.find((m) => m.userName === user.userName);
      if (miembro) return miembro;
    }

    // Fallback: construir desde datos del User (para vistas sin salida activa)
    return {
      id: user.id,
      nombre: user.nombre,
      userName: user.userName,
      email: user.email ?? '',
      avatarUrl: user.avatarUrl ?? null,
      tipoMetodoPago: user.tipoMetodoPago,
      metodoPago: user.metodoPago,
    };
  });

  /** Signal privado que almacena la salida actualmente seleccionada */
  private readonly _salidaActual = signal<Salida | null>(null);

  /** Signal de solo lectura con la salida actualmente seleccionada */
  readonly salidaActual = this._salidaActual.asReadonly();

  /** Computed: gastos de la salida actual ordenados cronológicamente (más reciente primero) */
  readonly gastosOrdenados = computed(() => {
    const salida = this._salidaActual();
    if (!salida) return [];
    return [...salida.gastos].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  });

  /** Computed: miembros de la salida actual */
  readonly miembros = computed(() => {
    const salida = this._salidaActual();
    return salida?.miembros ?? [];
  });

  /** Computed: pagos de la salida actual */
  readonly pagos = computed(() => {
    const salida = this._salidaActual();
    return salida?.pagos ?? [];
  });

  /** Computed: desglose por gasto */
  readonly desgloseGastos = computed<DesgloseGasto[]>(() => {
    const salida = this._salidaActual();
    if (!salida) return [];

    return salida.gastos.map((gasto) => {
      const participaciones = this.calcularParticipaciones(gasto);
      return {
        gasto,
        pagador: gasto.pagadoPor,
        participaciones,
      };
    });
  });

  /** Computed: balances netos consolidados por miembro */
  readonly balances = computed<BalanceMiembro[]>(() => {
    const salida = this._salidaActual();
    if (!salida) return [];

    const miembrosMap = new Map<string, { adelantado: number; correspondiente: number }>();

    for (const m of salida.miembros) {
      miembrosMap.set(m.id, { adelantado: 0, correspondiente: 0 });
    }

    for (const gasto of salida.gastos) {
      const pagadorData = miembrosMap.get(gasto.pagadoPor.id);
      if (pagadorData) {
        pagadorData.adelantado += gasto.monto;
      }

      const participaciones = this.calcularParticipaciones(gasto);
      for (const p of participaciones) {
        const data = miembrosMap.get(p.miembro.id);
        if (data) {
          data.correspondiente += p.monto;
        }
      }
    }

    // Ajustar por pagos confirmados
    for (const pago of salida.pagos) {
      if (pago.estado === 'pagado') {
        const deudorData = miembrosMap.get(pago.deudorId);
        const acreedorData = miembrosMap.get(pago.pagadorId);
        if (deudorData) deudorData.correspondiente -= pago.monto;
        if (acreedorData) acreedorData.adelantado -= pago.monto;
      }
    }

    return salida.miembros.map((miembro) => {
      const data = miembrosMap.get(miembro.id) ?? { adelantado: 0, correspondiente: 0 };
      return {
        miembro,
        totalAdelantado: data.adelantado,
        totalCorrespondiente: data.correspondiente,
        balanceNeto: data.adelantado - data.correspondiente,
      };
    });
  });

  /** Signal con salidas cargadas con detalle completo (para balance global) */
  private readonly _salidasCompletas = signal<Salida[]>([]);

  /** Computed: Balance global del usuario actual en TODAS sus salidas */
  readonly balanceGlobal = computed(() => {
    const user = this.userService.currentUser();
    if (!user) return { debo: 0, meDeben: 0, balanceNeto: 0, totalAdelantado: 0, totalCorrespondiente: 0 };

    const salidas = this._salidasCompletas();
    if (salidas.length === 0) return { debo: 0, meDeben: 0, balanceNeto: 0, totalAdelantado: 0, totalCorrespondiente: 0 };

    let adelantadoGlobal = 0;
    let correspondienteGlobal = 0;

    for (const salida of salidas) {
      // Encontrar el SalidaMiembro que corresponde al user en esta salida
      const miMiembro = salida.miembros.find((m) => m.userName === user.userName);
      if (!miMiembro) continue;

      for (const gasto of salida.gastos) {
        if (!gasto || !gasto.pagadoPor) continue;

        if (gasto.pagadoPor.id === miMiembro.id) {
          adelantadoGlobal += gasto.monto;
        }

        const participaciones = this.calcularParticipaciones(gasto);
        const miParticipacion = participaciones.find((p) => p.miembro?.id === miMiembro.id);
        if (miParticipacion) {
          correspondienteGlobal += miParticipacion.monto;
        }
      }

      // Ajustar por pagos confirmados
      for (const pago of salida.pagos) {
        if (pago.estado === 'pagado') {
          if (pago.deudorId === miMiembro.id) {
            correspondienteGlobal -= pago.monto;
          }
          if (pago.pagadorId === miMiembro.id) {
            adelantadoGlobal -= pago.monto;
          }
        }
      }
    }

    const balanceNeto = adelantadoGlobal - correspondienteGlobal;

    return {
      totalAdelantado: adelantadoGlobal,
      totalCorrespondiente: correspondienteGlobal,
      balanceNeto,
      debo: balanceNeto < 0 ? Math.abs(balanceNeto) : 0,
      meDeben: balanceNeto > 0 ? balanceNeto : 0,
    };
  });

  // ─── MÉTODOS PÚBLICOS (HTTP) ──────────────────────────────────────────

  /**
   * Carga todas las salidas del usuario autenticado desde el backend.
   * El backend retorna _count en vez de arrays completos para el listado.
   */
  cargarSalidas(): void {
    this.http.get<SalidaListItem[]>(`${this.apiUrl}/salidas`).subscribe({
      next: (salidas) => {
        // Mapear respuesta del backend al formato que espera el frontend
        const mapped: Salida[] = salidas.map((s) => ({
          id: s.id,
          titulo: s.titulo,
          descripcion: s.descripcion,
          codigoInvitacion: s.codigoInvitacion,
          fechaCreacion: s.fechaCreacion,
          // Guardar los conteos para display, arrays vacíos (no undefined)
          miembros: s.miembros ?? [],
          gastos: s.gastos ?? [],
          pagos: (s.pagos ?? []) as Pago[],
          _count: s._count ?? { miembros: 0, gastos: 0 },
        }));
        this._salidas.set(mapped);
      },
      error: () => this._salidas.set([]),
    });
  }

  /**
   * Carga el detalle completo de una salida por su ID.
   */
  cargarSalida(id: string): void {
    this.http.get<Salida>(`${this.apiUrl}/salidas/${id}`).subscribe({
      next: (salida) => this._salidaActual.set(salida),
      error: () => this._salidaActual.set(null),
    });
  }

  /** Signal con balance detallado del backend */
  private readonly _balanceDetallado = signal<BalanceDetalladoResponse | null>(null);
  readonly balanceDetallado = this._balanceDetallado.asReadonly();

  /**
   * Carga el balance detallado del usuario (por persona y salida).
   */
  cargarBalanceDetallado(): void {
    this.http.get<BalanceDetalladoResponse>(`${this.apiUrl}/balance-detallado`).subscribe({
      next: (data) => this._balanceDetallado.set(data),
      error: () => this._balanceDetallado.set(null),
    });
  }

  /**
   * Carga el detalle de todas las salidas para calcular el balance global.
   * Primero carga la lista, luego el detalle de cada una.
   */
  cargarBalanceGlobal(): void {
    this.http.get<SalidaListItem[]>(`${this.apiUrl}/salidas`).subscribe({
      next: (salidas) => {
        if (salidas.length === 0) {
          this._salidasCompletas.set([]);
          return;
        }
        // Cargar detalle de cada salida
        const detalles: Salida[] = [];
        let loaded = 0;
        for (const s of salidas) {
          this.http.get<Salida>(`${this.apiUrl}/salidas/${s.id}`).subscribe({
            next: (detalle) => {
              detalles.push(detalle);
              loaded++;
              if (loaded === salidas.length) {
                this._salidasCompletas.set(detalles);
              }
            },
            error: () => {
              loaded++;
              if (loaded === salidas.length) {
                this._salidasCompletas.set(detalles);
              }
            },
          });
        }
      },
      error: () => this._salidasCompletas.set([]),
    });
  }

  /**
   * Crea una nueva salida en el backend.
   */
  crearSalida(datos: { titulo: string; descripcion?: string; fecha: string }, miembrosIniciales?: Miembro[]): void {
    this.http.post<Salida>(`${this.apiUrl}/salidas`, {
      titulo: datos.titulo,
      descripcion: datos.descripcion,
    }).subscribe({
      next: (salida) => {
        this._salidas.update((list) => [...list, salida]);

        // Si hay integrantes iniciales, agregarlos uno por uno
        if (miembrosIniciales && miembrosIniciales.length > 0) {
          for (const m of miembrosIniciales) {
            const body = m.userName
              ? { userName: m.userName }
              : { nombreFantasma: m.nombre };
            this.http.post(`${this.apiUrl}/salidas/${salida.id}/integrantes`, body).subscribe();
          }
        }
      },
    });
  }

  /**
   * Unirse a una salida por código de invitación.
   */
  unirseASalida(codigo: string): void {
    this.http.post<{ message: string }>(`${this.apiUrl}/salidas/join`, { codigoInvitacion: codigo }).subscribe({
      next: () => this.cargarSalidas(),
    });
  }

  /**
   * Agrega un nuevo gasto a la salida actual vía HTTP.
   */
  agregarGasto(request: CrearGastoRequest): void {
    const salida = this._salidaActual();
    if (!salida) return;

    this.http.post(`${this.apiUrl}/salidas/${salida.id}/gastos`, request).subscribe({
      next: () => {
        // Recargar la salida completa para tener datos frescos
        this.cargarSalida(salida.id);
      },
    });
  }

  /**
   * Agrega miembros a la salida actual.
   */
  agregarMiembros(nuevos: Miembro[]): void {
    const salida = this._salidaActual();
    if (!salida) return;

    for (const m of nuevos) {
      const body = m.userName
        ? { userName: m.userName }
        : { nombreFantasma: m.nombre };
      this.http.post(`${this.apiUrl}/salidas/${salida.id}/integrantes`, body).subscribe({
        next: () => {
          // Recargar después del último
          if (m === nuevos[nuevos.length - 1]) {
            this.cargarSalida(salida.id);
          }
        },
      });
    }
  }

  /**
   * Registra un nuevo pago (estado pendiente).
   */
  registrarPago(deudorId: string, pagadorId: string, monto: number, gastoId?: string): void {
    const salida = this._salidaActual();
    if (!salida) return;

    const body: RegistrarPagoRequest = { deudorId, pagadorId, monto, gastoId };
    this.http.post(`${this.apiUrl}/salidas/${salida.id}/pagos`, body).subscribe({
      next: () => this.cargarSalida(salida.id),
    });
  }

  /**
   * Confirma un pago pendiente (cambia estado a 'pagado').
   */
  confirmarPago(pagoId: string): void {
    const salida = this._salidaActual();
    if (!salida) return;

    this.http.patch(`${this.apiUrl}/salidas/${salida.id}/pagos/${pagoId}/confirmar`, {}).subscribe({
      next: () => this.cargarSalida(salida.id),
    });
  }

  /**
   * Salda la deuda de un fantasma: registra pago + lo confirma automáticamente.
   * El fantasma es el deudor, y el creador (usuario actual) es el acreedor.
   */
  saldarDeudaFantasma(fantasmaMiembroId: string, monto: number): void {
    const salida = this._salidaActual();
    const usuario = this.usuarioActual();
    if (!salida || !usuario) return;

    // Crear el pago (fantasma → creador)
    const body = {
      deudorId: fantasmaMiembroId,
      pagadorId: usuario.id, // El creador es el acreedor
      monto,
    };

    this.http.post<PagoResponse>(`${this.apiUrl}/salidas/${salida.id}/pagos`, body).subscribe({
      next: (pago) => {
        // Confirmar inmediatamente
        this.http.patch(`${this.apiUrl}/salidas/${salida.id}/pagos/${pago.id}/confirmar`, {}).subscribe({
          next: () => this.cargarSalida(salida.id),
        });
      },
    });
  }

  /** Signal con datos de fantasmas de la salida actual */
  private readonly _fantasmas = signal<FantasmaResumen[]>([]);
  readonly fantasmas = this._fantasmas.asReadonly();

  /**
   * Carga el resumen de fantasmas de una salida (solo para el creador).
   */
  cargarFantasmas(salidaId: string): void {
    this.http.get<FantasmaResumen[]>(`${this.apiUrl}/salidas/${salidaId}/fantasmas`).subscribe({
      next: (data) => this._fantasmas.set(data),
      error: () => this._fantasmas.set([]),
    });
  }

  /**
   * Obtiene la lista de miembros frecuentes (usuarios de salidas anteriores).
   */
  obtenerMiembrosFrecuentes(): Miembro[] {
    // Por ahora retorna vacío — se puede implementar un endpoint específico
    return [];
  }

  /**
   * Busca un miembro por userName o email.
   * TODO: Implementar endpoint de búsqueda en el backend.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buscarMiembro(_query: string): Miembro | null {
    // No disponible sin endpoint — retorna null
    return null;
  }

  // ─── MÉTODOS PRIVADOS ─────────────────────────────────────────────────

  /**
   * Calcula las participaciones de un gasto.
   */
  private calcularParticipaciones(gasto: Gasto): { miembro: Miembro; monto: number }[] {
    if (gasto.participantes && gasto.participantes.length > 0) {
      const noInvitados = gasto.participantes.filter((p) => p && p.miembro && !p.esInvitado);

      if (noInvitados.length === 0) return [];

      if (gasto.metodoDivision === 'manual') {
        return noInvitados.map((p) => ({
          miembro: p.miembro,
          monto: p.montoManual ?? 0,
        }));
      }

      const count = noInvitados.length;
      const cuota = Math.floor(gasto.monto / count);
      const residuo = gasto.monto - cuota * count;

      return noInvitados.map((p, index) => ({
        miembro: p.miembro,
        monto: index === 0 ? cuota + residuo : cuota,
      }));
    }

    // Fallback: usar miembrosParticipantes
    const members = gasto.miembrosParticipantes?.filter((m) => m && m.id) ?? [];
    if (members.length === 0) return [];

    const count = members.length;
    const cuota = Math.floor(gasto.monto / count);
    const residuo = gasto.monto - cuota * count;

    return members.map((m, index) => ({
      miembro: m,
      monto: index === 0 ? cuota + residuo : cuota,
    }));
  }
}
