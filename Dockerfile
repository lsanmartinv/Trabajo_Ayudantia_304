# Usar la imagen base de Node.js
FROM node:20.14.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
# El asterisco (*) se utiliza para copiar todos los archivos que comiencen con "package"
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar los archivos de la aplicación
COPY . .

# Ejecutar la aplicación
CMD ["npm", "start"]
