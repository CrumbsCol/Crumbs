# Crumbs

**Divide gastos de salidas grupales sin fricción.** Crea una salida, agrega integrantes, registra quién pagó cada gasto, y la app calcula exactamente quién le debe a quién.

---

## Arquitectura

```
┌────────────────────────────────────────────────────┐
│  Docker Compose (producción)                      │
│  ┌────────────────────────────────────────────┐  │
│  │  Nginx :80                                    │  │
│  │  • Sirve Angular SPA (archivos estáticos)     │  │
│  │  • Proxy /api → Backend :3000                 │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │  NestJS Backend :3000                         │  │
│  │  • API REST + JWT                             │  │
│  │  • Prisma ORM → PostgreSQL                    │  │
│  └────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
                        │
                        │ :5432
              ┌─────────┴─────────┐
              │  PostgreSQL (RDS)  │
              └───────────────────┘
```

---

## Estructura del Monorepo

```
Crumbs/
├── Crumbs/          ← Frontend (Angular 21)
├── Back/            ← Backend (NestJS 11 + Prisma v7)
├── docs/            ← Documentación (setup, deploy, arquitectura)
└── scripts/         ← Scripts de build y deploy
```

---

## Quick Start (Desarrollo Local)

### 1. Base de datos
```bash
cd Back
cp .env.example .env        # Configurar variables
docker compose -f docker-compose.dev.yml up -d  # PostgreSQL
npx prisma db push          # Crear tablas
```

### 2. Backend
```bash
cd Back
npm install
npm run start:dev           # http://localhost:8000/api
```

### 3. Frontend
```bash
cd Crumbs
npm install
npm start                   # http://localhost:4200
```

---

## Docker (Producción Local)

Para probar la versión dockerizada igual a como correrá en AWS:

```bash
# 1. Compilar frontend
cd Crumbs && npm run build && cd ..

# 2. Copiar build a nginx
cp -r Crumbs/dist/Crumbs/browser Back/nginx/dist

# 3. Configurar env de producción
cp Back/.env.prod.example Back/.env.prod
# Editar .env.prod con tus valores

# 4. Build y levantar
cd Back
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# App disponible en http://localhost
# También accesible desde celular: http://TU_IP_LOCAL
```

Para detener: `docker compose -f docker-compose.prod.yml down`

---

## Deploy a AWS

Ver [docs/DEPLOY-AWS.md](docs/DEPLOY-AWS.md) para la guía completa de deploy en AWS Free Tier ($0).

---

## Stack Completo

| Capa | Tecnología |
|------|------------|
| Frontend | Angular 21 + Material M3 + Tailwind 4 |
| Backend | NestJS 11 + TypeScript |
| ORM | Prisma v7 |
| Base de datos | PostgreSQL 16 |
| Auth | JWT (bcrypt + passport) |
| Contenedores | Docker + Docker Compose |
| Cloud | AWS (EC2 + RDS + ECR) |
| CI/CD | GitHub Actions |

---

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [docs/SETUP-LOCAL.md](docs/SETUP-LOCAL.md) | Guía detallada de setup local |
| [docs/DEPLOY-AWS.md](docs/DEPLOY-AWS.md) | Deploy paso a paso en AWS |
| [docs/arquitectura-crumbs.md](docs/arquitectura-crumbs.md) | Diagramas de arquitectura |
| [Back/README.md](Back/README.md) | Documentación del backend |
| [Crumbs/README.md](Crumbs/README.md) | Documentación del frontend |
