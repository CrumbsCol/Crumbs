# 🚀 Setup Local — Crumbs (Backend + Frontend)

Guía para levantar el proyecto completo en tu máquina local.

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) v18+ (recomendado v22)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para PostgreSQL)
- [Git](https://git-scm.com/)

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/CrumbsCol/Crumbs.git
cd Crumbs
```

---

## 2. Levantar la Base de Datos (PostgreSQL)

```bash
cd Back

# Copiar variables de entorno (primera vez)
cp .env.example .env
# Editar .env con tus valores

# Levantar PostgreSQL
docker compose -f docker-compose.dev.yml up -d
```

Esto levanta PostgreSQL en `localhost:5432` con los valores definidos en tu `.env`.

Para verificar que está corriendo:
```bash
docker compose -f docker-compose.dev.yml ps
```

---

## 3. Configurar el Backend

```bash
cd Back

# Instalar dependencias
npm install

# Crear las tablas en la base de datos
npx prisma db push

# (Opcional) Ver las tablas con Prisma Studio
npx prisma studio
```

### Variables de entorno (.env)

El archivo `.env` ya existe con la configuración local. Si necesitas recrearlo:

```env
DATABASE_URL="postgresql://postgres:mellon3791@localhost:5432/crumbs?schema=public"
JWT_SECRET=crumbs-jwt-secret-dev-2026
```

### Iniciar el backend

```bash
npm run start:dev
```

El backend estará corriendo en: **http://localhost:8000/api**

Rutas disponibles:
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/me | Perfil del usuario (requiere token) |
| GET | /api/salidas | Listar salidas del usuario |
| POST | /api/salidas | Crear salida |
| GET | /api/salidas/:id | Detalle de salida |
| POST | /api/salidas/join | Unirse por código |
| POST | /api/salidas/:id/integrantes | Agregar integrante |
| POST | /api/salidas/:id/gastos | Registrar gasto |
| POST | /api/salidas/:id/pagos | Registrar pago |
| PATCH | /api/salidas/:id/pagos/:pagoId/confirmar | Confirmar pago |
| GET | /api/salidas/:id/balances | Ver balances |

---

## 4. Configurar el Frontend

```bash
cd Crumbs

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

El frontend estará corriendo en: **http://localhost:4200**

> **Nota:** El frontend se conecta directamente al backend en `localhost:8000/api`. Los mocks están desactivados.

---

## 5. Probar la integración

1. Abrir http://localhost:4200
2. Ir a "Registrarse" → llenar el formulario → se crea el usuario en la DB real
3. Iniciar sesión con las credenciales registradas
4. Crear una salida → se genera código de invitación real
5. Agregar integrantes, gastos → todo persiste en PostgreSQL

---

## Comandos útiles

| Comando | Ubicación | Descripción |
|---------|-----------|-------------|
| `docker compose -f docker-compose.dev.yml up -d` | `Back/` | Levantar PostgreSQL |
| `docker compose -f docker-compose.dev.yml down` | `Back/` | Detener PostgreSQL |
| `docker compose -f docker-compose.dev.yml down -v` | `Back/` | Detener + borrar datos |
| `npx prisma db push` | `Back/` | Sincronizar schema → DB |
| `npx prisma studio` | `Back/` | GUI para explorar la DB |
| `npx prisma db seed` | `Back/` | (Futuro) Cargar datos de ejemplo |
| `npm run start:dev` | `Back/` | Backend con hot reload |
| `npm start` | `Crumbs/` | Frontend con hot reload |
| `npm test` | `Crumbs/` | Tests del frontend (Vitest) |

---

## Estructura de servicios en local

```
┌─────────────────────────────────────────────────────┐
│  Tu máquina                                          │
│                                                      │
│  🌐 http://localhost:4200  (Angular - Frontend)      │
│       │                                              │
│       │ HTTP requests a /api                         │
│       ▼                                              │
│  🔥 http://localhost:8000  (NestJS - Backend)        │
│       │                                              │
│       │ DATABASE_URL                                 │
│       ▼                                              │
│  🐘 localhost:5432         (PostgreSQL - Docker)     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Solución de problemas

### "Connection refused" en el backend
- PostgreSQL no está corriendo. Ejecuta: `docker compose -f docker-compose.dev.yml up -d`

### "relation does not exist" o errores de tabla
- Las tablas no se crearon. Ejecuta: `npx prisma db push`

### "CORS error" en el frontend
- Verifica que el backend esté corriendo en puerto 8000
- Verifica que `environment.development.ts` tiene `apiUrl: 'http://localhost:8000/api'`

### "Unauthorized" al hacer requests
- El token JWT expiró o es inválido. Haz logout y login de nuevo.
- Verifica que `JWT_SECRET` en `.env` no haya cambiado entre sesiones.

### Resetear la base de datos completamente
```bash
cd Back
docker compose -f docker-compose.dev.yml down -v   # Borra el volumen
docker compose -f docker-compose.dev.yml up -d     # Recrea limpia
npx prisma db push                                  # Recrea tablas
```

---

## Docker para producción

Para build de producción y deploy a AWS, ver [DEPLOY-AWS.md](./DEPLOY-AWS.md).
