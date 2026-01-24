# --- Stage 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++ 

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM node:22-alpine AS runner

WORKDIR /app

# Install production native deps for better-sqlite3
RUN apk add --no-cache python3 make g++ 

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Re-install only production dependencies (ensures native modules match the platform)
RUN npm install --omit=dev

# Environment Defaults
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build"]
