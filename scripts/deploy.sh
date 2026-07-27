#!/bin/bash
# Script de deploy a AWS EC2
# Prerequisitos: AWS CLI configurado, EC2 corriendo, ECR creado

set -e

# === CONFIGURAR ESTAS VARIABLES ===
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="TU_ACCOUNT_ID"
ECR_REPO="crumbs"
EC2_HOST="TU_IP_PUBLICA_EC2"
EC2_USER="ec2-user"
EC2_KEY="~/.ssh/crumbs-ec2.pem"
# ==================================

ECR_URL="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

echo "🔑 Login en ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL

echo ""
echo "📤 Subiendo imágenes a ECR..."
docker tag crumbs-backend:latest $ECR_URL/$ECR_REPO:backend-latest
docker tag crumbs-nginx:latest $ECR_URL/$ECR_REPO:nginx-latest
docker push $ECR_URL/$ECR_REPO:backend-latest
docker push $ECR_URL/$ECR_REPO:nginx-latest
echo "✅ Imágenes subidas"

echo ""
echo "🚀 Desplegando en EC2..."
ssh -i $EC2_KEY $EC2_USER@$EC2_HOST << 'EOF'
  cd /home/ec2-user/crumbs
  aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URL
  docker compose -f docker-compose.prod.yml pull
  docker compose -f docker-compose.prod.yml up -d
  echo "Deploy completado!"
EOF

echo ""
echo "✅ Deploy exitoso! La app está en http://$EC2_HOST"
