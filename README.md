# G & J Wedding

Full-stack monorepo for G & J Wedding website.

## Project Structure

```
├── frontend/          # React SPA with Vite + React Router
├── api/               # Flask API
├── db/                # PostgreSQL database
└── package.json       # Workspace root
```

## Setup

This monorepo uses **pnpm workspaces** and **Turbo** for task orchestration and build caching.

### Installation

```bash
# Install all workspace dependencies
pnpm install

# Install Turbo globally (optional, recommended)
pnpm add -g turbo
```

## Development

### Run all services in parallel

```bash
# Frontend, API, and DB services all start together
pnpm dev
```

### Run individual services

```bash
# Frontend only (React SPA with Vite + React Router)
pnpm dev:frontend

# API only (Flask application)
pnpm dev:api

# Database only (PostgreSQL)
pnpm dev:db
```

## Building

### Build all packages

```bash
# Turbo handles dependency ordering and caching
pnpm build
```

### Build frontend only

```bash
pnpm build:frontend
```

## Linting

```bash
# Lint all packages with caching
pnpm lint

# Lint frontend only
pnpm lint:frontend
```

## Workspace Scripts

The following scripts are available at the root level and utilize pnpm workspace filtering:

- `pnpm dev` — Run all services (uses Turbo for parallel execution)
- `pnpm build` — Build all packages with dependency ordering
- `pnpm lint` — Lint all packages
- `pnpm dev:frontend` — Develop frontend only
- `pnpm dev:api` — Develop API only
- `pnpm dev:db` — Start database container
- `pnpm build:frontend` — Build frontend only
- `pnpm lint:frontend` — Lint frontend only

## Monorepo Structure

```
├── frontend/          # React SPA with Vite + React Router
│   └── package.json
├── api/               # Flask API
│   └── package.json
├── db/                # PostgreSQL database
│   └── package.json
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── turbo.json             # Turbo build orchestration
└── package.json           # Root workspace package
```

## Adding Dependencies

```bash
# Add to frontend
pnpm --filter frontend add <package>

# Add to API (Python via pip, not pnpm)
pnpm --filter api exec pip install <package>

# Add dev dependency to root
pnpm add -D <package>
```
