# Reglas del Modelo de Datos — Crumbs

## Entidades y Relaciones Críticas
- SalidaMiembro es la entidad CENTRAL para integrantes (soporta fantasmas y registrados)
- Gasto.pagadoPorId → SalidaMiembro (NO User)
- GastoParticipante.salidaMiembroId → SalidaMiembro (NO User)
- Pago.deudorId y Pago.pagadorId → SalidaMiembro (NO User)

## Constraints que NUNCA se deben violar
- userId IS NOT NULL OR nombreFantasma IS NOT NULL (en SalidaMiembro)
- Montos: INTEGER, positivos, máximo 7 dígitos (9.999.999)
- codigoInvitacion: exactamente 6 caracteres, UNIQUE
- Gasto.nombre: máximo 12 caracteres
- Salida.titulo: máximo 20 caracteres
- UNIQUE(gastoId, salidaMiembroId) en GastoParticipante
- UNIQUE(salidaId, userId) en SalidaMiembro (cuando userId no es NULL)

## Reglas del Motor de División
- Equitativo: cuota = monto / no-invitados. Residuo al pagador.
- Manual: suma de montoManual == Gasto.monto (exacto, sin tolerancia)
- Invitados (esInvitado=true): montoManual=0, NO se incluyen en la división

## Reglas de Pagos
- Estado inicial SIEMPRE 'pendiente'
- Solo el acreedor (pagadorId) puede cambiar a 'pagado'
- Monto del pago no puede superar la deuda actual

## Al modificar el schema
- Generar migración o usar `npx prisma db push`
- Actualizar DTOs si cambian campos
- Verificar que los tests reflejen los nuevos campos
