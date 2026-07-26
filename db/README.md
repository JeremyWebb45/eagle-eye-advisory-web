Run a local PostgreSQL instance for development and initialize the `invites` table.

Commands:

```powershell
cd db
docker-compose up -d
```

The database will be available on localhost:5432 with credentials from `.env`.
The initialization SQL is in `init/init.sql` and will create the `invites` table with a `guests` JSONB column matching the app types.
