/**
 * Interfaces relacionadas con el módulo de Salidas en Crumbs.
 *
 * Define las estructuras de datos para salidas, gastos y miembros
 * que se consumen en los componentes del módulo de detalle.
 */

/** Método de división de un gasto entre los miembros */
export type MetodoDivision = 'equitativo' | 'manual';

/** Estado de un pago registrado */
export type EstadoPago = 'pendiente' | 'pagado';

/**
 * Representa un miembro/integrante de una salida.
 *
 * @example
 * ```typescript
 * const miembro: Miembro = {
 *   id: '1',
 *   nombre: 'Juan López',
 *   userName: 'juanlopez',
 *   email: 'juan@example.com',
 *   avatarUrl: null,
 * };
 * ```
 */
export interface Miembro {
  /** Identificador único del miembro */
  id: string;

  /** Nombre completo del miembro */
  nombre: string;

  /** Nombre de usuario único (handle) */
  userName: string;

  /** Correo electrónico del miembro */
  email: string;

  /**
   * URL del avatar del miembro.
   * Si es null, se mostrará un placeholder genérico.
   */
  avatarUrl: string | null;

  /** Tipo de método de pago (ej. 'clabe', 'tarjeta', 'efectivo', 'paypal') */
  tipoMetodoPago?: string;

  /** Datos del método de pago (ej. número de cuenta, CLABE, o correo de paypal) */
  metodoPago?: string;
}

/**
 * Representa un participante dentro de un gasto, con información extra.
 */
export interface ParticipanteGasto {
  /** El miembro participante */
  miembro: Miembro;

  /** Si es true, el miembro es invitado en este gasto (no contribuye al pago) */
  esInvitado: boolean;

  /** Monto individual asignado en división manual (null si equitativo) */
  montoManual: number | null;
}

/**
 * Representa un pago registrado entre miembros de una salida.
 */
export interface Pago {
  /** Identificador único del pago */
  id: string;

  /** ID del miembro deudor (quien debe) */
  deudorId: string;

  /** ID del miembro acreedor (a quien le deben) */
  pagadorId: string;

  /** Monto del pago */
  monto: number;

  /** Estado del pago */
  estado: EstadoPago;

  /** Fecha del pago en formato ISO 8601 */
  fecha: string;

  /** ID del gasto asociado (opcional) */
  gastoId?: string;
}

/**
 * Representa un gasto registrado dentro de una salida.
 *
 * @example
 * ```typescript
 * const gasto: Gasto = {
 *   id: '1',
 *   nombre: 'Palomitas',
 *   descripcion: 'Palomitas grandes para todos',
 *   monto: 150.00,
 *   fecha: '2026-07-20T18:30:00',
 *   metodoDivision: 'equitativo',
 *   pagadoPor: { id: '1', nombre: 'Juan', userName: 'juanlopez', email: 'juan@example.com', avatarUrl: null },
 *   miembrosParticipantes: [],
 * };
 * ```
 */
export interface Gasto {
  /** Identificador único del gasto */
  id: string;

  /** Nombre descriptivo del gasto */
  nombre: string;

  /** Descripción adicional del gasto (opcional) */
  descripcion?: string;

  /** Monto total del gasto en moneda local */
  monto: number;

  /** Fecha y hora del gasto en formato ISO 8601 */
  fecha: string;

  /** Método de división del gasto entre los miembros */
  metodoDivision: MetodoDivision;

  /** Miembro que realizó el pago */
  pagadoPor: Miembro;

  /** Lista de miembros que participan en este gasto */
  miembrosParticipantes: Miembro[];

  /** Participantes con información extendida (invitado, monto manual) */
  participantes?: ParticipanteGasto[];
}

/**
 * Representa una salida/evento grupal en la aplicación.
 *
 * @example
 * ```typescript
 * const salida: Salida = {
 *   id: '1',
 *   titulo: 'Cine / Spiderman',
 *   codigoInvitacion: 'A3B9X2',
 *   fechaCreacion: '2026-07-15T10:00:00',
 *   miembros: [],
 *   gastos: [],
 * };
 * ```
 */
export interface Salida {
  /** Identificador único de la salida */
  id: string;

  /** Título descriptivo de la salida (Ej: "Cine / Spiderman") */
  titulo: string;

  /** Código único de invitación para compartir (Ej: "A3B9X2") */
  codigoInvitacion: string;

  /** Fecha de creación de la salida en formato ISO 8601 */
  fechaCreacion: string;

  /** Lista de miembros/integrantes de la salida */
  miembros: Miembro[];

  /** Lista cronológica de gastos registrados */
  gastos: Gasto[];

  /** Lista de pagos registrados entre miembros */
  pagos: Pago[];
}
