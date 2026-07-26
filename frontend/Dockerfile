# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm (no frozen-lockfile since we're in a monorepo workspace)
RUN pnpm install --no-frozen-lockfile

# Copy source and build
COPY . .

# Build the Vite app (reads .env at build time)
RUN pnpm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install wget for healthcheck and serve for serving static files
RUN apk add --no-cache wget && npm install -g serve

# Copy built assets from builder
COPY --from=builder /app/dist /app/dist

EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
