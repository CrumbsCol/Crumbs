# === Stage 1: Build ===
FROM node:22-alpine AS builder
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# Copiar prisma schema y config
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Generar Prisma Client (prisma.config.ts lee DATABASE_URL del env)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate

# Compilar NestJS
RUN npm run build

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

CMD ["node", "dist/src/main.js"]
