# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies with caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy and build
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*.html

# Non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]