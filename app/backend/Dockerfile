# 1. Usamos una imagen de Node ligera
FROM node:20-alpine

# 2. Establecemos el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# 3. Copiamos los archivos de configuración de todo el monorepo
COPY package*.json ./
COPY tsconfig*.json ./

# 4. Copiamos las carpetas de los proyectos
COPY domain ./domain
COPY app/backend ./app/backend

# 5. Instalamos dependencias (en la raíz, para todo el monorepo)
RUN npm install

# 6. Generamos el cliente de Prisma
WORKDIR /usr/src/app/app/backend

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm install && npm install tsconfig-paths

RUN npx prisma generate

# 7. Compilamos el Dominio primero (desde la raíz)
WORKDIR /usr/src/app
RUN npm run build

# 8. Exponemos el puerto
EXPOSE 3000

# 9. Comando para iniciar el backend (usamos el script start que definimos antes)
# Nota: Asegúrate de que en app/backend/package.json el script "start" sea: 
# "start": "node -r tsconfig-paths/register dist/index.js"
WORKDIR /usr/src/app/app/backend
CMD ["npm", "run", "start"]