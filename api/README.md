Simple Flask API to expose invites from Postgres.

Install and run locally:

```powershell
cd api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

By default the app will attempt to load DB credentials from `../db/.env`.
When running alongside the DB container, ensure the DB is accessible and the
credentials in `db/.env` match.

Endpoint:

- `GET /invites` — returns JSON array of invites with `id`, `email`, and `guests`.
