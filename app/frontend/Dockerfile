# --- ETAPA 1: CONSTRUCCIÓN (BUILD) ---
FROM node:20-alpine as builder

WORKDIR /usr/src/app

# Copiamos configs
COPY package*.json ./
COPY tsconfig*.json ./

# Copiamos código fuente
COPY domain ./domain
COPY app/frontend ./app/frontend

# 1. Instalamos dependencias en la RAÍZ (para el dominio y scripts globales)
RUN npm install

# 2. Compilamos el DOMINIO
RUN npx tsc -b domain

# 👇 CORRECCIÓN CLAVE AQUÍ 👇

# 3. Nos movemos a la carpeta del frontend
WORKDIR /usr/src/app/app/frontend

# 4. Instalamos las dependencias del FRONTEND ESPECÍFICAMENTE
# (Esto asegura que 'vite' esté disponible aquí)
RUN npm install --legacy-peer-deps && npm install -D @rollup/rollup-linux-x64-musl --legacy-peer-deps

# 5. Compilamos el Frontend
RUN npm run build

# --- ETAPA 2: SERVIDOR DE PRODUCCIÓN (NGINX) ---
FROM nginx:alpine

COPY --from=builder /usr/src/app/app/frontend/dist /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]