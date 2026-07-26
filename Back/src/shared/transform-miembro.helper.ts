/**
 * Transforma un SalidaMiembro (con User join) en objeto plano para el frontend.
 * Usado por salidas.service y pagos.service.
 */
export function transformMiembro(salidaMiembro: any) {
  if (salidaMiembro.esFantasma) {
    return {
      id: salidaMiembro.id,
      nombre: salidaMiembro.nombreFantasma || '',
      apellido: '',
      userName: '',
      email: '',
      avatarUrl: null,
      esFantasma: true,
      rol: salidaMiembro.rol,
    };
  }

  const user = salidaMiembro.user;
  return {
    id: salidaMiembro.id,
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    userName: user?.userName || '',
    email: user?.email || '',
    avatarUrl: user?.avatarUrl || null,
    esFantasma: false,
    rol: salidaMiembro.rol,
  };
}
