# Requisitos — Gestión de Fantasmas

## Objetivo
Permitir al creador de una salida gestionar los pagos de integrantes fantasma.

## Requisitos Funcionales

### RF-01: Visualizar fantasmas con balances
- Lista de fantasmas con balance neto (debe / le deben)
- Pagos confirmados se descuentan del balance

### RF-02: Saldar deuda de fantasma
- Botón "Confirmar que pagó $X" para fantasmas que deben
- Crea pago + confirma automáticamente

### RF-03: Confirmar pagos hacia fantasma
- Si hay pagos pendientes hacia el fantasma, el creador confirma recepción

### RF-04: Acceso restringido
- Solo visible si usuario es creador Y hay fantasmas en la salida
- Drawer lateral integrado en salida-detalle-page
