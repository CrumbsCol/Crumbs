# 🍞 Crumbs

**Dividí gastos de salidas grupales sin fricción.**

Crumbs es una aplicación web para gestionar los gastos compartidos de salidas en grupo. Creá una salida, sumá integrantes (registrados o "fantasmas"), registrá quién pagó cada gasto, y la app calcula automáticamente quién le debe a quién — simplificando las deudas al mínimo número de transferencias.

---

## ✨ Features

- 🎉 **Crear salidas grupales** con código de invitación único (6 caracteres)
- 👥 **Agregar integrantes** — usuarios registrados o "fantasmas" (personas sin cuenta)
- 💸 **Registrar gastos** con división equitativa o manual
- 🧮 **Motor de cálculo automático** de deudas optimizadas
- 💳 **Gestión de pagos** con confirmación por parte del acreedor
- 🔐 **Autenticación JWT** con registro y login seguro (bcrypt)
- 📱 **Diseño responsive** mobile-first con Material Design 3
- 🚀 **Deploy automático** via GitHub Actions a AWS

---

## 🏗️ Arquitectura

### Desarrollo Local

```
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│  Angular Dev Server  │       │  NestJS Backend      │       │  PostgreSQL      │
│  :4200               │──────▶│  :8000               │──────▶│  :5432 (Docker)  │
└──────────────────────┘       └──────────────────────┘       └──────────────────┘
```

### Producción (Docker Compose en AWS EC2)

```
┌─────────────────────────────────────────────────────────┐
│  EC2 t3.micro (Amazon Linux 2023)                       │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Nginx container (:80)                            │  │
│  │  • Sirve Angular SPA (archivos estáticos)         │  │
│  │  • Proxy reverso /api → backend:3000              │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────┴────────────────────────────┐  │
│  │  NestJS Backend container (:3000)                 │  │
│  │  • REST API (17 endpoints) + JWT auth             │  │
│  │  • Prisma ORM → PostgreSQL                        │  │
│  └──────────────────────┬────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────┘
                          │ :5432
              ┌───────────┴───────────┐
              │  AWS RDS PostgreSQL   │
              │  db.t3.micro          │
              │  (Free Tier)          │
              └───────────────────────┘
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | Angular + Material M3 + Tailwind | 21.2 / 21.2 / 4.1 |
| Testing Frontend | Vitest | 4.1 |
| Backend | NestJS + TypeScript | 11 / 5.9 |
| ORM | Prisma | 7.9 |
| Base de datos | PostgreSQL | 16 |
| Auth | JWT + bcrypt + Passport | — |
| Contenedores | Docker + Docker Compose | — |
| Cloud | AWS (EC2 + RDS + ECR) | Free Tier |
| CI/CD | GitHub Actions | Node 22 |

---

## 📁 Estructura del Monorepo

```
Crumbs/
├── Crumbs/                  ← Frontend (Angular 21)
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/      ← Componentes orquestadores (smart)
│   │   │   ├── components/ ← Componentes presentacionales (dumb)
│   │   │   ├── services/   ← Lógica de negocio y HTTP
│   │   │   └── guards/     ← Auth guards
│   │   └── environments/   ← Configuración por entorno
│   └── package.json
├── Back/                    ← Backend (NestJS 11 + Prisma v7)
│   ├── src/
│   │   ├── auth/           ← Módulo de autenticación
│   │   ├── users/          ← Módulo de usuarios
│   │   ├── salidas/        ← Módulo de salidas grupales
│   │   ├── gastos/         ← Módulo de gastos
│   │   ├── pagos/          ← Módulo de pagos
│   │   └── prisma/         ← Módulo Prisma (DB)
│   ├── prisma/
│   │   └── schema.prisma   ← Modelo de datos (6 entidades)
│   ├── nginx/              ← Config Nginx para producción
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   └── package.json
├── docs/                    ← Documentación extendida
│   ├── SETUP-LOCAL.md
│   ├── DEPLOY-AWS.md
│   └── arquitectura-crumbs.md
├── scripts/                 ← Scripts de build y deploy
│   ├── build-prod.sh       ← Build local de producción
│   └── deploy.sh           ← Deploy manual a AWS
└── .github/
    └── workflows/
        └── deploy.yml       ← CI/CD pipeline
```

---

## 🚀 Quick Start (Desarrollo Local)

### Prerequisitos

- Node.js 22+
- npm
- Docker y Docker Compose

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd Crumbs
```

### 2. Base de datos (PostgreSQL con Docker)

```bash
cd Back
cp .env.example .env        # Configurar DATABASE_URL y JWT_SECRET
docker compose -f docker-compose.dev.yml up -d   # Levanta PostgreSQL en :5432
npx prisma db push          # Crea las tablas en la BD
```

### 3. Backend

```bash
cd Back
npm install                  # Instala deps + genera Prisma Client (postinstall)
npm run start:dev            # Inicia en modo watch → http://localhost:8000/api
```

### 4. Frontend

```bash
cd Crumbs
npm install
npm start                    # Angular dev server → http://localhost:4200
```

### 5. Verificar

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)
- El frontend apunta automáticamente al backend en desarrollo (`environment.development.ts`)

---

## 🐳 Docker — Producción Local

Para probar la versión dockerizada idéntica a producción:

```bash
# 1. Compilar el frontend
cd Crumbs
npm run build
cd ..

# 2. Copiar el build al directorio de Nginx
cp -r Crumbs/dist/Crumbs/browser Back/nginx/dist

# 3. Configurar variables de producción
cp Back/.env.prod.example Back/.env.prod
# Editar Back/.env.prod con tus valores reales

# 4. Build y levantar los contenedores
cd Back
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

**Acceder:** [http://localhost](http://localhost) (también desde celular en la misma red: `http://TU_IP_LOCAL`)

**Detener:**
```bash
docker compose -f docker-compose.prod.yml down
```

> 💡 También podés usar el script `scripts/build-prod.sh` que automatiza los pasos 1-4.

---

## 🔄 CI/CD — GitHub Actions

El pipeline se ejecuta automáticamente en cada **push a `main`**.

```
Push a main
    │
    ├─▶ test-backend ──────┐
    │   • npm ci            │
    │   • prisma generate   │
    │   • npm test          │
    │                       ├──▶ build-and-deploy
    ├─▶ test-frontend ─────┘        │
    │   • npm ci                    ├── Build Angular
    │   • ng lint                   ├── Copiar dist → nginx
    │   • ng test                   ├── Build imágenes Docker
    │                               ├── Push a ECR (crumbs-backend + crumbs-nginx)
    │                               └── SSH a EC2 → pull + restart containers
    │
    └─▶ notify-failure (si falla algún job)
```

### Secrets requeridos en GitHub

| Secret | Descripción |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Credenciales IAM para ECR |
| `AWS_SECRET_ACCESS_KEY` | Credenciales IAM para ECR |
| `EC2_HOST` | IP pública o hostname de la instancia EC2 |
| `EC2_SSH_PRIVATE_KEY` | Clave SSH privada para acceder a EC2 |

---

## ☁️ Deploy a AWS

La app corre en **AWS Free Tier ($0/mes)** con la siguiente infraestructura:

| Recurso | Servicio | Tier |
|---------|----------|------|
| Servidor | EC2 t3.micro | Free Tier (750h/mes) |
| Base de datos | RDS PostgreSQL db.t3.micro | Free Tier (750h/mes) |
| Imágenes Docker | ECR (2 repos) | 500MB gratis |

### Resumen de pasos

1. **Crear RDS** PostgreSQL (db.t3.micro, Free Tier)
2. **Crear EC2** (t3.micro, Amazon Linux 2023)
3. **Configurar Security Groups** (HTTP/HTTPS/SSH en EC2; PostgreSQL solo desde EC2 en RDS)
4. **Instalar Docker** en EC2
5. **Crear repos ECR** (`crumbs-backend` y `crumbs-nginx`)
6. **Configurar GitHub Secrets** para el pipeline
7. **Push a main** → deploy automático

> 📖 Guía completa paso a paso: [docs/DEPLOY-AWS.md](docs/DEPLOY-AWS.md)

### Deploy manual (alternativo)

```bash
# Build local
./scripts/build-prod.sh

# Push a ECR y deploy a EC2
./scripts/deploy.sh
```

---

## 🔐 Variables de Entorno

### Backend — Desarrollo (`Back/.env`)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://user:pass@localhost:5432/crumbs` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `mi-secreto-super-seguro` |
| `PORT` | Puerto del servidor NestJS | `8000` |

### Backend — Producción (`Back/.env.prod`)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Connection string al RDS | `postgresql://user:pass@rds-endpoint:5432/crumbs` |
| `JWT_SECRET` | Secreto para firmar tokens JWT | `produccion-secreto-256-bits` |
| `PORT` | Puerto interno del contenedor | `3000` |

### Frontend

La configuración del frontend se maneja mediante archivos de entorno en `Crumbs/src/environments/`:

| Archivo | `apiUrl` | `production` |
|---------|----------|--------------|
| `environment.development.ts` | `http://localhost:8000/api` | `false` |
| `environment.ts` | `/api` (proxy Nginx) | `true` |

---

## 🧪 Testing

```bash
# Backend (Jest)
cd Back
npm test              # Unit tests
npm run test:e2e      # End-to-end tests

# Frontend (Vitest)
cd Crumbs
npm test              # Unit tests
npm run lint          # ESLint
```

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [docs/SETUP-LOCAL.md](docs/SETUP-LOCAL.md) | Guía detallada de setup local |
| [docs/DEPLOY-AWS.md](docs/DEPLOY-AWS.md) | Deploy paso a paso en AWS Free Tier |
| [docs/arquitectura-crumbs.md](docs/arquitectura-crumbs.md) | Diagramas de arquitectura detallados |
| [Back/README.md](Back/README.md) | Documentación del backend (endpoints, estructura) |
| [Crumbs/README.md](Crumbs/README.md) | Documentación del frontend (componentes, convenciones) |

---

## 📝 Licencia

Proyecto privado — uso interno.
