# Etapa de construcción
FROM node:latest as builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del frontend
RUN npm install

# Copia el resto de los archivos del frontend
COPY . .

# Construye la aplicación React
RUN npm run build

# Instala serve para servir la aplicación estática
RUN npm install -g serve

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación estática
CMD ["serve", "-s", "build"]
