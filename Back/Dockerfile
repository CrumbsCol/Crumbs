# === Stage 1: Build ===
FROM node:22-alpine AS builder
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente, prisma schema y configs
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Generar Prisma Client y compilar NestJS
RUN npx prisma generate
RUN npm run build

# Verificar estructura del build
RUN ls -la dist/ && ls -la dist/src/ 2>/dev/null || ls -la dist/

# === Stage 2: Runtime ===
FROM node:22-alpine
WORKDIR /app

# Copiar solo lo necesario para ejecutar
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Entrypoint: arrancar el backend
CMD ["node", "dist/src/main.js"]
