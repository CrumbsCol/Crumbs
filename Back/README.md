# Crumbs - Backend

Este es el repositorio del servidor backend para la aplicación **Crumbs**, una plataforma colaborativa para dividir gastos de manera equitativa o manual entre varios participantes.

## Stack Tecnológico 💻

- **Framework:** [NestJS](https://nestjs.com/) (Node.js) - Arquitectura escalable y mantenible inspirada en Angular.
- **Lenguaje:** TypeScript
- **Base de Datos:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/) - Acceso a datos con tipado fuerte.

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de iniciar:

- [Node.js](https://nodejs.org/es/) (v18 o superior recomendado)
- [PostgreSQL](https://www.postgresql.org/) (o una URL de conexión de un servicio en la nube como Supabase/Neon)

## Instalación

1. Instala las dependencias del proyecto:

```bash
npm install
```

2. Configura las variables de entorno. Crea un archivo `.env` en la raíz (basándote en el ejemplo provisto por Prisma) y configura la cadena de conexión a tu base de datos:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/crumbs?schema=public"
```

3. Sincroniza la base de datos con los esquemas de Prisma:

```bash
npx prisma db push
```

## Ejecución del Servidor 🚀

```bash
# Modo desarrollo (watch)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor estará corriendo por defecto en `http://localhost:3000`.

## Estructura de Endpoints (Próximamente)

El desarrollo del backend contemplará los siguientes módulos RESTful:

- `POST /auth/login` - Autenticación y generación de JWT.
- `GET /me` - Información del usuario logueado.
- `GET /salidas` - Listado de eventos/salidas compartidas.
- `POST /salidas/:id/gastos` - Registro de nuevos gastos en una salida.
- `GET /salidas/:id/balances` - Cálculo de saldos y deudas actuales entre miembros.
- `POST /salidas/:id/pagos` - Registro de pagos o saldos liquidados entre miembros.

## Pruebas

Para correr la suite de pruebas automatizadas:

```bash
# Pruebas unitarias
npm run test

# Pruebas End-to-End (e2e)
npm run test:e2e
```
