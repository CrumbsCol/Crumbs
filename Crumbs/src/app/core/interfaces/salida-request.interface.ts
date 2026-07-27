/**
 * Interfaces DTO (Data Transfer Objects) para las peticiones al backend.
 *
 * Estas interfaces representan los payloads que el frontend envía al backend.
 * Solo incluyen los datos mínimos necesarios (IDs y valores),
 * sin objetos anidados completos.
 */

import { MetodoDivision } from './salida.interface';

// ─── AUTH ────────────────────────────────────────────────────────────────────

/**
 * Payload para registrar un nuevo usuario.
 * Se envía a POST /api/auth/register
 */
export interface RegistroRequest {
  /** Primer nombre del usuario */
  nombre: string;

  /** Apellido del usuario */
  apellido: string;

  /** Correo electrónico (único) */
  email: string;

  /** Nombre de usuario / nickname (único) */
  userName: string;

  /** Contraseña en texto plano (se hashea en el backend) */
  password: string;

  /** Fecha de nacimiento en formato ISO o dd/MM/yyyy */
  fechaNacimiento: string;
}

// ─── SALIDAS ─────────────────────────────────────────────────────────────────

/**
 * Payload para crear una nueva salida.
 * Se envía a POST /api/salidas
 */
export interface CrearSalidaRequest {
  /** Título de la salida (máx 20 caracteres) */
  titulo: string;

  /** Descripción de la salida (opcional, máx 100 caracteres) */
  descripcion?: string;

  /** Fecha de creación en formato ISO 8601 */
  fecha: string;
}

/**
 * Payload para unirse a una salida por código.
 * Se envía a POST /api/salidas/join
 */
export interface UnirseASalidaRequest {
  /** Código de invitación de 6 caracteres alfanuméricos */
  codigoInvitacion: string;
}

// ─── INTEGRANTES ─────────────────────────────────────────────────────────────

/**
 * Payload para agregar un integrante registrado a la salida.
 * Se envía a POST /api/salidas/:id/integrantes
 */
export interface AgregarIntegranteRequest {
  /** Nickname exacto del usuario a agregar (si es registrado) */
  userName?: string;

  /** Nombre del integrante fantasma (si no tiene cuenta) */
  nombreFantasma?: string;
}

// ─── GASTOS ──────────────────────────────────────────────────────────────────

/**
 * Representa un participante en un gasto (solo IDs y flags).
 */
export interface ParticipanteRequest {
  /** ID del SalidaMiembro que participa */
  salidaMiembroId: string;

  /** Si es true, este participante es invitado y no paga */
  esInvitado: boolean;

  /** Monto manual asignado (solo para método 'manual', null si equitativo) */
  montoManual: number | null;
}

/**
 * Payload para crear un nuevo gasto.
 * Se envía a POST /api/salidas/:id/gastos
 */
export interface CrearGastoRequest {
  /** Nombre/título del gasto (máx 12 caracteres) */
  nombre: string;

  /** Descripción adicional (opcional, máx 100 caracteres) */
  descripcion?: string;

  /** Monto total en pesos enteros (positivo, máx 9.999.999) */
  monto: number;

  /** Fecha del gasto en formato ISO 8601 */
  fecha: string;

  /** Método de división: 'equitativo' o 'manual' */
  metodoDivision: MetodoDivision;

  /** ID del SalidaMiembro que adelantó el dinero */
  pagadoPorMiembroId: string;

  /** Lista de participantes con sus flags */
  participantes: ParticipanteRequest[];
}

// ─── PAGOS ───────────────────────────────────────────────────────────────────

/**
 * Payload para registrar un nuevo pago/abono.
 * Se envía a POST /api/salidas/:id/pagos
 */
export interface RegistrarPagoRequest {
  /** ID del SalidaMiembro deudor (quien paga la deuda) */
  deudorId: string;

  /** ID del SalidaMiembro acreedor (a quien le deben) */
  pagadorId: string;

  /** Monto del pago en pesos enteros */
  monto: number;

  /** ID del gasto asociado (opcional) */
  gastoId?: string;
}
