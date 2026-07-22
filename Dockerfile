# Utiliza Nginx Alpine como servidor web ligero
FROM nginx:alpine

# Elimina la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia la compilación de Angular al directorio público de Nginx
COPY dist/laboratorio-pwa/browser /usr/share/nginx/html

# Expone el puerto personalizado
EXPOSE 8081