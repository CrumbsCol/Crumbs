# Diseño — Gestión de Fantasmas

## Componentes
- DrawerGestionFantasmas (presentacional)
- Integrado en SalidaDetallePage (orquestador)

## Flujo de datos
1. Botón visible si esCreador() && tieneFantasmas()
2. Al abrir: GET /api/salidas/:id/fantasmas
3. Muestra cards con balance y pagos pendientes
4. Al saldar: POST pago + PATCH confirmar (en cadena)
5. Recarga datos de fantasmas y salida

## Backend
- GET /salidas/:id/fantasmas calcula balance considerando pagos confirmados
- PATCH confirmar permite al creador confirmar pagos de fantasmas
