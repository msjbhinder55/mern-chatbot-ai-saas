# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install TypeScript globally and dependencies
RUN npm install -g typescript
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source files
COPY src ./src
COPY tsconfig.json ./

# Build TypeScript
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy from builder
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

# Expose port and run
EXPOSE 5000
CMD ["npm", "start"]  # Uses the new start script