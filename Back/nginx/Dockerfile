FROM nginx:alpine

# Copiar build de Angular (se copia durante el proceso de build)
COPY dist/ /usr/share/nginx/html/

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
