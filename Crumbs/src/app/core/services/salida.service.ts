import { Injectable, signal, computed } from '@angular/core';

import {
  Salida,
  Gasto,
  Miembro,
  Pago,
} from '../interfaces/salida.interface';

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
 * Datos mock de miembros para desarrollo.
 */
const MOCK_MIEMBROS: Miembro[] = [
  {
    id: '1',
    nombre: 'Juan López',
    userName: 'juanlopez',
    email: 'juan@example.com',
    avatarUrl: null,
  },
  {
    id: '2',
    nombre: 'María García',
    userName: 'mariagarcia',
    email: 'maria@example.com',
    avatarUrl: null,
  },
  {
    id: '3',
    nombre: 'Carlos Rdz',
    userName: 'carlosrodriguez',
    email: 'carlos@example.com',
    avatarUrl: null,
  },
  {
    id: '4',
    nombre: 'Ana Martínez',
    userName: 'anamartinez',
    email: 'ana@example.com',
    avatarUrl: null,
  },
];

/**
 * Datos mock de salidas para desarrollo.
 */
const MOCK_SALIDAS: Salida[] = [
  {
    id: '1',
    titulo: 'Cine / Spiderman',
    codigoInvitacion: 'A3B9X2',
    fechaCreacion: '2026-07-15T10:00:00',
    miembros: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[1], MOCK_MIEMBROS[2]],
    gastos: [
      {
        id: 'g1',
        nombre: 'Boletos cine',
        descripcion: '3 boletos sala IMAX',
        monto: 450,
        fecha: '2026-07-20T16:00:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[0],
        miembrosParticipantes: [
          MOCK_MIEMBROS[0],
          MOCK_MIEMBROS[1],
          MOCK_MIEMBROS[2],
        ],
      },
      {
        id: 'g2',
        nombre: 'Palomitas',
        descripcion: 'Combo grande para compartir',
        monto: 280,
        fecha: '2026-07-20T16:30:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[1],
        miembrosParticipantes: [
          MOCK_MIEMBROS[0],
          MOCK_MIEMBROS[1],
          MOCK_MIEMBROS[2],
        ],
      },
      {
        id: 'g3',
        nombre: 'Estacionamien',
        descripcion: 'Estacionamiento del centro comercial',
        monto: 60,
        fecha: '2026-07-20T19:00:00',
        metodoDivision: 'manual',
        pagadoPor: MOCK_MIEMBROS[2],
        miembrosParticipantes: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[2]],
      },
    ],
    pagos: [],
  },
  {
    id: '2',
    titulo: 'Cena de cumpleaños',
    codigoInvitacion: 'K7M2P1',
    fechaCreacion: '2026-07-10T08:00:00',
    miembros: [
      MOCK_MIEMBROS[0],
      MOCK_MIEMBROS[1],
      MOCK_MIEMBROS[2],
      MOCK_MIEMBROS[3],
    ],
    gastos: [
      {
        id: 'g4',
        nombre: 'Restaurante',
        descripcion: 'Restaurante La Trattoria',
        monto: 1200,
        fecha: '2026-07-12T21:00:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[0],
        miembrosParticipantes: MOCK_MIEMBROS,
      },
    ],
    pagos: [],
  },
];

/**
 * Miembros frecuentes mock (usuarios que han sido añadidos en salidas anteriores).
 */
const MOCK_MIEMBROS_FRECUENTES: Miembro[] = [...MOCK_MIEMBROS];

/**
 * Servicio de gestión de Salidas en la aplicación Crumbs.
 *
 * Utiliza signals de Angular para mantener un estado reactivo.
 * Actualmente provee datos mock, pero está diseñado para que en el futuro
 * se reemplace por llamadas HTTP sin modificar los componentes consumidores.
 */
@Injectable({ providedIn: 'root' })
export class SalidaService {
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

  /** Computed: desglose por gasto (quién pagó y cuánto le toca a cada uno) */
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

    // Inicializar todos los miembros
    for (const m of salida.miembros) {
      miembrosMap.set(m.id, { adelantado: 0, correspondiente: 0 });
    }

    // Calcular por cada gasto
    for (const gasto of salida.gastos) {
      // El pagador adelantó el monto total
      const pagadorData = miembrosMap.get(gasto.pagadoPor.id);
      if (pagadorData) {
        pagadorData.adelantado += gasto.monto;
      }

      // Calcular lo que le corresponde a cada participante
      const participaciones = this.calcularParticipaciones(gasto);
      for (const p of participaciones) {
        const data = miembrosMap.get(p.miembro.id);
        if (data) {
          data.correspondiente += p.monto;
        }
      }
    }

    return salida.miembros.map((miembro) => {
      const data = miembrosMap.get(miembro.id) ?? { adelantado: 0, correspondiente: 0 };
      return {
        miembro,
        totalAdelantado: data.adelantado,
        totalCorrespondiente: data.correspondiente,
        balanceNeto: Math.round((data.adelantado - data.correspondiente) * 100) / 100,
      };
    });
  });

  /**
   * Carga una salida por su ID.
   */
  cargarSalida(id: string): void {
    const salida = MOCK_SALIDAS.find((s) => s.id === id) ?? null;
    this._salidaActual.set(salida);
  }

  /**
   * Agrega un nuevo gasto a la salida actual.
   */
  agregarGasto(gasto: Omit<Gasto, 'id'>): void {
    const salida = this._salidaActual();
    if (!salida) return;

    const nuevoGasto: Gasto = {
      ...gasto,
      id: `g${Date.now()}`,
    };

    this._salidaActual.set({
      ...salida,
      gastos: [...salida.gastos, nuevoGasto],
    });
  }

  /**
   * Agrega miembros a la salida actual.
   */
  agregarMiembros(nuevos: Miembro[]): void {
    const salida = this._salidaActual();
    if (!salida) return;

    const idsExistentes = new Set(salida.miembros.map((m) => m.id));
    const miembrosFiltrados = nuevos.filter((m) => !idsExistentes.has(m.id));

    if (miembrosFiltrados.length === 0) return;

    this._salidaActual.set({
      ...salida,
      miembros: [...salida.miembros, ...miembrosFiltrados],
    });
  }

  /**
   * Obtiene la lista de miembros frecuentes para sugerir al agregar integrantes.
   */
  obtenerMiembrosFrecuentes(): Miembro[] {
    return MOCK_MIEMBROS_FRECUENTES;
  }

  /**
   * Busca un miembro por userName o email exacto.
   */
  buscarMiembro(query: string): Miembro | null {
    const normalizado = query.toLowerCase().trim();
    return (
      MOCK_MIEMBROS.find(
        (m) =>
          m.userName.toLowerCase() === normalizado ||
          m.email.toLowerCase() === normalizado
      ) ?? null
    );
  }

  /**
   * Registra un nuevo pago (estado pendiente).
   */
  registrarPago(deudorId: string, pagadorId: string, monto: number): void {
    const salida = this._salidaActual();
    if (!salida) return;

    const nuevoPago: Pago = {
      id: `p${Date.now()}`,
      deudorId,
      pagadorId,
      monto,
      estado: 'pendiente',
      fecha: new Date().toISOString(),
    };

    this._salidaActual.set({
      ...salida,
      pagos: [...salida.pagos, nuevoPago],
    });
  }

  /**
   * Confirma un pago pendiente (cambia estado a 'pagado').
   */
  confirmarPago(pagoId: string): void {
    const salida = this._salidaActual();
    if (!salida) return;

    const pagosActualizados = salida.pagos.map((p) =>
      p.id === pagoId ? { ...p, estado: 'pagado' as const } : p
    );

    this._salidaActual.set({
      ...salida,
      pagos: pagosActualizados,
    });
  }

  /**
   * Calcula las participaciones de un gasto.
   * En modo equitativo, divide entre todos los no-invitados.
   * En modo manual, usa los montos asignados.
   */
  private calcularParticipaciones(gasto: Gasto): { miembro: Miembro; monto: number }[] {
    // Si tiene participantes con info extendida, usarla
    if (gasto.participantes && gasto.participantes.length > 0) {
      const noInvitados = gasto.participantes.filter((p) => !p.esInvitado);

      if (gasto.metodoDivision === 'manual') {
        return noInvitados.map((p) => ({
          miembro: p.miembro,
          monto: p.montoManual ?? 0,
        }));
      }

      // Equitativo: dividir entre no-invitados
      const count = noInvitados.length || 1;
      const montoPorPersona = Math.round((gasto.monto / count) * 100) / 100;
      return noInvitados.map((p) => ({
        miembro: p.miembro,
        monto: montoPorPersona,
      }));
    }

    // Fallback: usar miembrosParticipantes (sin info de invitados)
    const count = gasto.miembrosParticipantes.length || 1;
    const montoPorPersona = Math.round((gasto.monto / count) * 100) / 100;
    return gasto.miembrosParticipantes.map((m) => ({
      miembro: m,
      monto: montoPorPersona,
    }));
  }
}
