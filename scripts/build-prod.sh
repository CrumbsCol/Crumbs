#!/bin/bash
# Script de build para producción
# Compila Angular + construye imágenes Docker

set -e

echo "📦 Compilando Angular (frontend)..."
cd ../Crumbs
npm run build
echo "✅ Frontend compilado"

echo ""
echo "📦 Copiando build de Angular a nginx/dist/..."
rm -rf ../Back/nginx/dist
cp -r dist/Crumbs/browser ../Back/nginx/dist
echo "✅ Build copiado"

echo ""
echo "🐳 Construyendo imágenes Docker..."
cd ../Back
docker compose -f docker-compose.prod.yml build
echo "✅ Imágenes construidas"

echo ""
echo "🚀 Listo para deploy. Ejecuta scripts/deploy.sh para subir a AWS."
