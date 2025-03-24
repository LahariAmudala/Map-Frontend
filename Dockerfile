FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Use Nginx for serving the built React app
FROM nginx:1.23
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port for Cloud Run (uses environment variable PORT)
EXPOSE 8080
CMD ["/bin/sh", "-c", "envsubst '$$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default_tmp.conf && mv /etc/nginx/conf.d/default_tmp.conf /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]