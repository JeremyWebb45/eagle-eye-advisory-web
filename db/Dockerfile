FROM postgres:16-alpine

# Build arguments from CI/CD
ARG POSTGRES_USER=admin
ARG POSTGRES_PASSWORD=password
ARG POSTGRES_DB=eagle_eye_db

# Set environment variables baked into the image
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

# Expose PostgreSQL port
EXPOSE 5432

# Use the default postgres entrypoint
