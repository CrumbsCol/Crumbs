# Arquitectura Crumbs — Diagramas

## Diagrama 1: Arquitectura AWS (Producción)

```mermaid
graph TB
    subgraph Internet
        USER["👤 Usuarios"]
    end

    subgraph AWS["☁️ AWS - Free Tier"]
        subgraph VPC["VPC (Red Privada)"]
            subgraph PublicSubnet["Subnet Pública"]
                EC2["🖥️ EC2 t3.micro - Docker Compose"]

                subgraph DockerCompose["docker-compose.yml"]
                    NGINX["📦 Nginx :80/:443 - Reverse Proxy + SPA Angular"]
                    BACKEND["📦 NestJS :3000 - API REST + JWT"]
                end
            end

            subgraph PrivateSubnet["Subnet Privada"]
                RDS["🐘 RDS PostgreSQL - db.t3.micro - 20GB gp3"]
            end
        end

        ECR["📦 ECR - Docker Images"]
    end

    subgraph CICD["🔄 CI/CD"]
        GH["GitHub Repo"]
        GHA["GitHub Actions"]
    end

    USER -->|"HTTP/HTTPS :80/:443"| NGINX
    NGINX -->|"proxy_pass /api"| BACKEND
    BACKEND -->|"postgresql :5432"| RDS
    GH -->|"push main"| GHA
    GHA -->|"build & push image"| ECR
    GHA -->|"SSH deploy"| EC2
    ECR -->|"docker pull"| EC2
```

---

## Diagrama 2: Arquitectura Local (Desarrollo)

```mermaid
graph TB
    subgraph LocalDev["💻 Máquina del Desarrollador"]
        subgraph DockerLocal["docker-compose.dev.yml"]
            DB_LOCAL["📦 PostgreSQL :5432"]
        end

        NEST_DEV["🔥 NestJS - npm run start:dev - :3000 hot reload"]
        ANG_DEV["🅰️ Angular - npm start - :4200 hot reload"]
        PRISMA["⚡ Prisma Studio :5555"]
    end

    subgraph Browser["🌐 Navegador"]
        APP["localhost:4200"]
    end

    APP -->|"proxy /api → :3000"| NEST_DEV
    NEST_DEV -->|"DATABASE_URL localhost:5432"| DB_LOCAL
    ANG_DEV -->|"serve dev"| APP
    PRISMA -->|"inspeccionar DB"| DB_LOCAL
```

---

## Diagrama 3: Flujo de Deploy (CI/CD)

```mermaid
sequenceDiagram
    participant DEV as 👨‍💻 Desarrollador
    participant GH as GitHub
    participant GHA as GitHub Actions
    participant ECR as AWS ECR
    participant EC2 as AWS EC2

    DEV->>GH: git push main
    GH->>GHA: Trigger workflow

    GHA->>GHA: npm test (backend)
    GHA->>GHA: ng build (frontend SPA)
    GHA->>GHA: docker build (backend + nginx/frontend)
    GHA->>ECR: docker push images
    GHA->>EC2: SSH → docker compose pull && up -d

    EC2->>ECR: Pull nuevas imágenes
    EC2->>EC2: Restart containers
    EC2-->>DEV: ✅ Deploy completo
```

---

## Diagrama 4: Visión General (Local + Producción)

```mermaid
graph LR
    subgraph DEV["🏠 DESARROLLO LOCAL"]
        FE_DEV["Angular :4200"]
        BE_DEV["NestJS :3000"]
        DB_DEV["PostgreSQL :5432 Docker"]

        FE_DEV -->|"/api proxy"| BE_DEV
        BE_DEV --> DB_DEV
    end

    subgraph PROD["☁️ AWS PRODUCCIÓN"]
        subgraph EC2_BOX["EC2 t3.micro"]
            NGX["Nginx :80"]
            BE_PROD["NestJS :3000"]
        end
        RDS_PROD["RDS PostgreSQL :5432"]

        NGX -->|"/api"| BE_PROD
        BE_PROD --> RDS_PROD
    end

    subgraph USERS["🌍 USUARIOS"]
        BROWSER["Navegador"]
    end

    BROWSER -->|"HTTPS"| NGX
```

---

## Resumen de costos (3 semanas)

| Servicio | Free Tier | Costo |
|----------|-----------|-------|
| EC2 t3.micro | 750 h/mes gratis | $0 |
| RDS db.t3.micro | 750 h/mes + 20GB | $0 |
| ECR | 500MB gratis | $0 |
| Data Transfer | 100GB/mes gratis | $0 |
| **Total** | | **$0** |
