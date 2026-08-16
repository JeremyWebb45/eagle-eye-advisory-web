# PostgreSQL Docker Setup

This folder contains the PostgreSQL database configuration for the Eagle Eye Advisory application.

## Prerequisites

- Docker and Docker Compose installed
- A `.env` file in the project root (see `../.env.services.template` for reference)

## Setup

### 1. Create the Docker Network (first time only)

```bash
docker network create eagle_eye_network
```

### 2. Start PostgreSQL

From this `db/` directory:

```bash
docker-compose up -d
```

To view logs:

```bash
docker-compose logs -f postgres
```

### 3. Verify the Container is Running

```bash
docker ps | grep eagle_eye_postgres
```

Check the health status:

```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
```

## Configuration

The PostgreSQL container reads environment variables from `.env` in the project root:

- `POSTGRES_USER`: Database user (default: `admin`)
- `POSTGRES_PASSWORD`: Database password (default: `password`)
- `POSTGRES_DB`: Database name (default: `eagle_eye_db`)
- `POSTGRES_PORT`: Port to expose (default: `5432`)

## Connecting to the Database

From the application, use this connection string:

```
postgresql://admin:password@localhost:5432/eagle_eye_db
```

Or use environment variables:

```
postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

## Data Persistence

Database data is stored in a Docker volume named `postgres_data`. This persists even if the container is stopped or removed.

To see volumes:

```bash
docker volume ls | grep postgres
```

To remove the volume (⚠️ deletes all data):

```bash
docker volume rm db_postgres_data
```

## Stopping and Cleanup

Stop the container:

```bash
docker-compose down
```

Stop and remove the volume (⚠️ deletes all data):

```bash
docker-compose down -v
```

## Troubleshooting

### Container won't start

Check logs:

```bash
docker-compose logs postgres
```

### Network error

Make sure the network exists:

```bash
docker network create eagle_eye_network
```

### Port already in use

Change `POSTGRES_PORT` in `.env` or stop the conflicting container:

```bash
docker ps
docker stop <container_id>
```

### Access denied

Verify credentials in `.env` file match the connection string in your application.
