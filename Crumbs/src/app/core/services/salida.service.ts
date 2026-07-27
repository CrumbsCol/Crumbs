import { Injectable, signal, computed, inject } from '@angular/core';

import {
  Salida,
  Gasto,
  Miembro,
  Pago,
} from '../interfaces/salida.interface';
import { UserService } from './user.service';

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
    id: 'mock-user-001',
    nombre: 'Juan López',
    userName: 'juanlopez',
    email: 'juan@example.com',
    avatarUrl: null,
    tipoMetodoPago: 'clabe',
    metodoPago: '012345678901234567',
  },
  {
    id: '2',
    nombre: 'María García',
    userName: 'mariagarcia',
    email: 'maria@example.com',
    avatarUrl: null,
    tipoMetodoPago: 'tarjeta',
    metodoPago: '4152 3134 5152 6163',
  },
  {
    id: '3',
    nombre: 'Carlos Ruiz',
    userName: 'carlosruiz',
    email: 'carlos@example.com',
    avatarUrl: null,
    tipoMetodoPago: 'paypal',
    metodoPago: 'carlos@example.com',
  },
  {
    id: '4',
    nombre: 'Ana Martínez',
    userName: 'anamartinez',
    email: 'ana@example.com',
    avatarUrl: null,
  },
  {
    id: '5',
    nombre: 'Luis Pérez',
    userName: 'luisperez',
    email: 'luis@example.com',
    avatarUrl: null,
    tipoMetodoPago: 'efectivo',
  },
  {
    id: '6',
    nombre: 'Sofia Castro',
    userName: 'sofiac',
    email: 'sofia@example.com',
    avatarUrl: null,
  },
  {
    id: '7',
    nombre: 'Pedro Solís',
    userName: 'pedros',
    email: 'pedro@example.com',
    avatarUrl: null,
  },
  {
    id: '8',
    nombre: 'Marta Torres',
    userName: 'martat',
    email: 'marta@example.com',
    avatarUrl: null,
    tipoMetodoPago: 'clabe',
    metodoPago: '987654321098765432',
  }
];

/**
 * Datos mock de salidas para desarrollo.
 */
const MOCK_SALIDAS: Salida[] = [
  {
    id: '1',
    titulo: 'Viaje a la Playa',
    codigoInvitacion: 'A3B9X2',
    fechaCreacion: '2026-07-15T10:00:00',
    miembros: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[1], MOCK_MIEMBROS[2], MOCK_MIEMBROS[3], MOCK_MIEMBROS[4]],
    gastos: [
      {
        id: 'g1',
        nombre: 'Gasolina',
        descripcion: 'Tanque lleno ida y vuelta',
        monto: 1200,
        fecha: '2026-07-20T16:00:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[0], // Juan pagó
        miembrosParticipantes: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[1], MOCK_MIEMBROS[2], MOCK_MIEMBROS[3], MOCK_MIEMBROS[4]],
      },
      {
        id: 'g2',
        nombre: 'Casetas',
        descripcion: 'Peaje autopista',
        monto: 400,
        fecha: '2026-07-20T16:30:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[1], // Maria pagó
        miembrosParticipantes: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[1], MOCK_MIEMBROS[2], MOCK_MIEMBROS[3], MOCK_MIEMBROS[4]],
      },
      {
        id: 'g3',
        nombre: 'Cena Mariscos',
        descripcion: 'Cena en el puerto',
        monto: 2500,
        fecha: '2026-07-20T19:00:00',
        metodoDivision: 'manual',
        pagadoPor: MOCK_MIEMBROS[2], // Carlos pagó
        miembrosParticipantes: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[1], MOCK_MIEMBROS[2]], // Solo 3 comieron
        participantes: [
          { miembro: MOCK_MIEMBROS[0], esInvitado: false, montoManual: 1000 },
          { miembro: MOCK_MIEMBROS[1], esInvitado: true, montoManual: null }, // Maria invitada
          { miembro: MOCK_MIEMBROS[2], esInvitado: false, montoManual: 1500 }
        ]
      },
    ],
    pagos: [
      {
        id: 'p1',
        deudorId: 'mock-user-001', // Juan
        pagadorId: '3', // a Carlos
        monto: 500,
        estado: 'pagado',
        fecha: '2026-07-21T10:00:00',
        gastoId: 'g3'
      }
    ],
  },
  {
    id: '2',
    titulo: 'Cena de cumpleaños',
    codigoInvitacion: 'K7M2P1',
    fechaCreacion: '2026-07-10T08:00:00',
    miembros: [
      MOCK_MIEMBROS[0],
      MOCK_MIEMBROS[5],
      MOCK_MIEMBROS[6],
      MOCK_MIEMBROS[7],
    ],
    gastos: [
      {
        id: 'g4',
        nombre: 'Restaurante',
        descripcion: 'Cuenta total de La Trattoria',
        monto: 4000,
        fecha: '2026-07-12T21:00:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[0], // Juan pagó todo
        miembrosParticipantes: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[5], MOCK_MIEMBROS[6], MOCK_MIEMBROS[7]],
      },
    ],
    pagos: [],
  },
  {
    id: '3',
    titulo: 'Cine Fin de Semana',
    codigoInvitacion: 'J9F4L2',
    fechaCreacion: '2026-07-05T08:00:00',
    miembros: [
      MOCK_MIEMBROS[0],
      MOCK_MIEMBROS[1],
    ],
    gastos: [
      {
        id: 'g5',
        nombre: 'Boletos',
        descripcion: '2 boletos VIP',
        monto: 300,
        fecha: '2026-07-06T20:00:00',
        metodoDivision: 'equitativo',
        pagadoPor: MOCK_MIEMBROS[1], // Maria pagó
        miembrosParticipantes: [MOCK_MIEMBROS[0], MOCK_MIEMBROS[1]],
      },
    ],
    pagos: [
      {
        id: 'p2',
        deudorId: 'mock-user-001', // Juan
        pagadorId: '2', // a Maria
        monto: 150,
        estado: 'pagado',
        fecha: '2026-07-07T10:00:00',
      }
    ],
  }
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
  // TODO: Consultar el listado de salidas con todos sus datos filtrando por el usuario logueado desde el backend (DB).
  /** Signal privado con todas las salidas del usuario */
  private readonly _salidas = signal<Salida[]>([...MOCK_SALIDAS]);

  /** Signal de solo lectura con todas las salidas disponibles */
  readonly salidas = this._salidas.asReadonly();

  /** Inyectamos UserService para saber quién es el usuario logueado */
  private readonly userService = inject(UserService);

  /** Computed: Usuario actual adaptado a la interfaz Miembro (o null si no está autenticado) */
  readonly usuarioActual = computed<Miembro | null>(() => {
    const user = this.userService.currentUser();
    if (!user) return null;
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

  /** Computed: Balance global del usuario actual en todas las salidas */
  readonly balanceGlobal = computed(() => {
    const salidas = this._salidas();
    const usuario = this.usuarioActual();
    if (!usuario) return { debo: 0, meDeben: 0, balanceNeto: 0 };

    let adelantadoGlobal = 0;
    let correspondienteGlobal = 0;

    for (const salida of salidas) {
      for (const gasto of salida.gastos) {
        if (gasto.pagadoPor.id === usuario.id) {
          adelantadoGlobal += gasto.monto;
        }

        const participaciones = this.calcularParticipaciones(gasto);
        const miParticipacion = participaciones.find((p) => p.miembro.id === usuario.id);
        if (miParticipacion) {
          correspondienteGlobal += miParticipacion.monto;
        }
      }
    }

    const balanceNeto = Math.round((adelantadoGlobal - correspondienteGlobal) * 100) / 100;

    // Si balanceNeto > 0, significa que me deben. Si < 0, significa que debo.
    return {
      totalAdelantado: adelantadoGlobal,
      totalCorrespondiente: correspondienteGlobal,
      balanceNeto: balanceNeto,
      debo: balanceNeto < 0 ? Math.abs(balanceNeto) : 0,
      meDeben: balanceNeto > 0 ? balanceNeto : 0,
    };
  });

  /**
   * Carga una salida por su ID.
   */
  cargarSalida(id: string): void {
    const salida = this._salidas().find((s) => s.id === id) ?? null;
    this._salidaActual.set(salida);
  }

  /**
   * Crea una nueva salida y la agrega a la lista.
   * Devuelve la salida creada con su ID asignado.
   */
  crearSalida(datos: { titulo: string; descripcion?: string; fecha: string; miembros?: Miembro[] }): Salida {
    // TODO: Enviar o publicar esta nueva salida en el backend (DB) una vez conectado.
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
    const nuevaSalida: Salida = {
      id: String(this._salidas().length + 1),
      titulo: datos.titulo,
      codigoInvitacion: codigo,
      fechaCreacion: datos.fecha,
      miembros: datos.miembros || [],
      gastos: [],
      pagos: [],
    };

    this._salidas.update((list) => [...list, nuevaSalida]);
    return nuevaSalida;
  }

  /**
   * Busca una salida por código de invitación y la devuelve.
   * Simula unirse a una salida existente.
   */
  unirseASalida(codigo: string): Salida | null {
    // TODO: Enviar código al backend (DB) para unirse a la salida correspondiente, si existe.
    // El backend se encargará de agregar al usuario como miembro de la salida y devolverla.
    const salida = this._salidas().find(
      (s) => s.codigoInvitacion.toLowerCase() === codigo.toLowerCase()
    );

    if (salida) {
      const usuarioActual = this.usuarioActual();
      // Si el usuario no está ya en la lista, lo agregamos (Mock local)
      if (usuarioActual && !salida.miembros.some(m => m.id === usuarioActual.id)) {
        const salidasActualizadas = this._salidas().map(s =>
          s.id === salida.id ? { ...s, miembros: [...s.miembros, usuarioActual] } : s
        );
        this._salidas.set(salidasActualizadas);
        return salidasActualizadas.find(s => s.id === salida.id) ?? null;
      }
      return salida;
    }
    
    return null;
  }

  /**
   * Agrega un nuevo gasto a la salida actual.
   */
  agregarGasto(gasto: Omit<Gasto, 'id'>): void {
    // TODO: Enviar petición al backend (DB) para registrar el nuevo gasto asociado a esta salida.
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
    // TODO: Consultar desde el backend los usuarios/miembros con los que el usuario logueado interactúa frecuentemente.
    return MOCK_MIEMBROS_FRECUENTES;
  }

  /**
   * Busca un miembro por userName o email exacto.
   */
  buscarMiembro(query: string): Miembro | null {
    // TODO: Realizar petición al backend para buscar el usuario por query (username o email).
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
  registrarPago(deudorId: string, pagadorId: string, monto: number, gastoId?: string): void {
    const salida = this._salidaActual();
    if (!salida) return;

    const nuevoPago: Pago = {
      id: `p${Date.now()}`,
      deudorId,
      pagadorId,
      monto,
      estado: 'pendiente',
      fecha: new Date().toISOString(),
      gastoId,
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
