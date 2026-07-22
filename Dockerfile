# Utiliza Nginx Alpine como servidor web ligero
FROM nginx:alpine

# Copia la compilación de Angular al directorio público de Nginx
COPY dist/laboratorio-pwa/browser /usr/share/nginx/html

# Documenta que el contenedor utiliza el puerto 80
EXPOSE 80