# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación Next.js en modo de producción
RUN npm run build

# Copiar la carpeta "pages/api" al directorio de trabajo en el contenedor
COPY ./pages/api ./pages/api

# Exponer el puerto 3000 en el contenedor
EXPOSE 3000

# Ejecutar el comando para iniciar la aplicación
CMD ["npm", "start"]