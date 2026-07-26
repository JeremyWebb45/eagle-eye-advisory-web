# G & J Wedding

Full-stack monorepo for G & J Wedding website.

## Project Structure

```
├── frontend/          # React SPA with Vite + React Router
├── api/               # Flask API
├── db/                # PostgreSQL database
└── package.json       # Workspace root
```

## Frontend Setup

The frontend is a React SPA bundled with Vite and uses React Router for navigation.

### Development

```bash
npm run frontend:dev
```

### Build

```bash
npm run frontend:build
```

## API Setup

The API is built with Flask. Port your existing Flask application into the `api/` directory.

## Database Setup

The database uses PostgreSQL. Port your existing database configuration into the `db/` directory.

## Getting Started

1. Install root dependencies (if using npm workspaces):
   ```bash
   npm install
   ```

2. Navigate to the frontend and install dependencies:
   ```bash
   cd frontend && npm install
   ```

3. Start the development server:
   ```bash
   npm run frontend:dev
   ```

4. Port in your existing Flask API into the `api/` directory
5. Port in your existing PostgreSQL configuration into the `db/` directory
