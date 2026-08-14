# Production stage - expects dist/ to be built by CI/CD workflow
FROM node:22-alpine

WORKDIR /app

# Install wget for healthcheck and serve for serving static files
RUN apk add --no-cache wget && npm install -g serve

# Copy pre-built assets from CI/CD workflow
COPY dist /app/dist

EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
