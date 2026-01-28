# --- Stage 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

# Copy package files first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM node:22-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Create data directory for SQLite database
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

# Copy built application and package.json
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Re-install only production dependencies (ensures native modules match the platform)
RUN npm install --omit=dev

# Environment Defaults
ENV PORT=3000
ENV NODE_ENV=production

# Health check for Coolify monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

# Start the application
CMD ["node", "build"]
