FROM node:20-alpine

WORKDIR /usr/src/app

# 1. Copiar archivos de configuración raíz
COPY package*.json ./
COPY tsconfig*.json ./

# 2. Copiar fuentes
COPY domain ./domain
COPY app/backend ./app/backend

# 3. Instalar TODAS las dependencias desde la raíz (evita redundancia)
# Agregamos tsconfig-paths aquí para asegurar que esté
RUN npm install && npm install tsconfig-paths

# 4. Generar cliente Prisma (usando la URL dummy para build)
WORKDIR /usr/src/app/app/backend
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate

# 5. Volver a la raíz y compilar TODO el monorepo
WORKDIR /usr/src/app
# Esto usa el script "build": "tsc -b" del package.json raíz
RUN npm run build

# 6. Preparar ejecución
EXPOSE 3000
WORKDIR /usr/src/app/app/backend

# Usamos el script start del package.json del backend
CMD ["npm", "run", "start"]