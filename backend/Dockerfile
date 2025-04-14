# Stage 1: Build
FROM node:18.17.1-alpine3.18 as builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the files
COPY . .

# Stage 2: Runtime
FROM node:18.17.1-alpine3.18

WORKDIR /app

# Copy from builder
COPY --from=builder /app .

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 5000

CMD ["npm", "start"]