# 🚀 Deploy a AWS — Guía paso a paso

Esta guía explica cómo desplegar Crumbs en AWS usando el Free Tier ($0 por 3 semanas).

---

## Prerequisitos

- Cuenta de AWS (nueva para aprovechar Free Tier)
- AWS CLI instalado y configurado (`aws configure`)
- Docker instalado localmente
- El proyecto compila sin errores

---

## Paso 1: Crear la Base de Datos (RDS)

1. Ir a AWS Console → RDS → Create Database
2. Configurar:
   - Engine: PostgreSQL
   - Template: **Free tier**
   - DB instance identifier: `crumbs-db`
   - Master username: `crumbs_admin`
   - Master password: (generar uno seguro y guardarlo)
   - Instance class: db.t3.micro
   - Storage: 20 GB gp3
   - Public access: **Yes** (temporalmente para setup, luego restringir)
   - DB name: `crumbs`
3. Esperar ~5 minutos a que esté disponible
4. Copiar el **Endpoint** (ej: `crumbs-db.xxxxx.us-east-1.rds.amazonaws.com`)

---

## Paso 2: Crear la Instancia EC2

1. Ir a AWS Console → EC2 → Launch Instance
2. Configurar:
   - Name: `crumbs-server`
   - AMI: Amazon Linux 2023
   - Instance type: **t3.micro** (Free Tier)
   - Key pair: Crear una nueva (`crumbs-ec2`) y descargar el .pem
   - Security Group: Crear uno nuevo con reglas:
     - SSH (22) desde tu IP
     - HTTP (80) desde anywhere
     - HTTPS (443) desde anywhere
3. Launch y esperar a que esté running
4. Copiar la **IP pública**

---

## Paso 3: Configurar Security Group de RDS

1. Ir al Security Group de la RDS
2. Agregar regla inbound:
   - Type: PostgreSQL (5432)
   - Source: Security Group del EC2 (sg-xxxxx)
3. Esto permite que SOLO el EC2 acceda a la DB

---

## Paso 4: Instalar Docker en EC2

```bash
# Conectarse al EC2
ssh -i crumbs-ec2.pem ec2-user@TU_IP_EC2

# Instalar Docker
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar
docker --version
docker-compose --version

# Cerrar y reconectar para que el grupo docker surta efecto
exit
ssh -i crumbs-ec2.pem ec2-user@TU_IP_EC2
```

---

## Paso 5: Crear ECR (Docker Registry)

```bash
# Desde tu máquina local
aws ecr create-repository --repository-name crumbs --region us-east-1
```

---

## Paso 6: Build y Deploy

### Desde tu máquina local:

```bash
# 1. Compilar Angular
cd Crumbs && npm run build && cd ..

# 2. Copiar build a nginx
rm -rf Back/nginx/dist
cp -r Crumbs/dist/Crumbs/browser Back/nginx/dist

# 3. Build Docker images
cd Back
docker compose -f docker-compose.prod.yml build

# 4. Tag y push a ECR
AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com

docker tag crumbs-backend $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/crumbs:backend
docker tag crumbs-nginx $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/crumbs:nginx
docker push $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/crumbs:backend
docker push $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/crumbs:nginx
```

### En el EC2:

```bash
# 1. Crear directorio
mkdir -p /home/ec2-user/crumbs && cd /home/ec2-user/crumbs

# 2. Crear .env.prod (copiar de .env.prod.example y llenar valores)
cat > .env.prod << 'EOF'
DATABASE_URL="postgresql://crumbs_admin:TU_PASSWORD@crumbs-db.xxxxx.rds.amazonaws.com:5432/crumbs?schema=public"
JWT_SECRET="$(openssl rand -base64 64)"
NODE_ENV=production
PORT=3000
EOF

# 3. Crear docker-compose.prod.yml (o copiarlo desde el repo)
# 4. Pull images y arrancar
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d

# 5. Verificar
docker compose -f docker-compose.prod.yml ps
curl http://localhost/api/me
```

---

## Paso 7: Verificar

Abrir en el navegador: `http://TU_IP_EC2`

Deberías ver la app Angular funcionando.

---

## Costos estimados (3 semanas)

| Servicio | Free Tier | Costo |
|----------|-----------|-------|
| EC2 t3.micro | 750h/mes | $0 |
| RDS db.t3.micro | 750h/mes + 20GB | $0 |
| ECR | 500MB | $0 |
| Data Transfer | 100GB/mes | $0 |
| **Total** | | **$0** |

---

## Troubleshooting

### Backend no arranca
- Verificar que `DATABASE_URL` en `.env.prod` es correcta
- Verificar que el Security Group de RDS permite conexión desde EC2
- Ver logs: `docker logs crumbs-backend`

### No se puede acceder desde el navegador
- Verificar que el Security Group del EC2 permite HTTP (80)
- Verificar que nginx está corriendo: `docker ps`
- Ver logs: `docker logs crumbs-nginx`

### Error de CORS
- Verificar que en `main.ts` del backend, CORS incluye la IP/dominio del EC2
