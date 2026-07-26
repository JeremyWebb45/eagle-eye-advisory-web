from flask import Flask, jsonify, request
import json
from flask_cors import CORS
import os
from dotenv import load_dotenv
import psycopg2
import psycopg2.extras
from pathlib import Path
from urllib.parse import urlparse

app = Flask(__name__)
# CORS: Allow localhost for dev and production domain
allowed_origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Frontend container in dev
    "https://eagleeyeadvisory.us.com",  # Production
    "https://www.eagleeyeadvisory.us.com"  # Production www
]
CORS(app, origins=allowed_origins) 

# Load environment variables
# In production (Docker): .env.services is in the same directory as app.py
# In development (local): look in parent directory
current_dir = Path(__file__).resolve().parent
repo_root = current_dir.parent

env_services_prod = current_dir / '.env.services'  # Docker path
env_services_dev = repo_root / '.env.services'     # Local dev path

if env_services_prod.exists():
    load_dotenv(env_services_prod)
elif env_services_dev.exists():
    load_dotenv(env_services_dev)

DB_HOST = os.getenv('POSTGRES_HOST')
DB_PORT = os.getenv('POSTGRES_PORT')
DB_USER = os.getenv('POSTGRES_USER')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD')
DB_NAME = os.getenv('POSTGRES_DB')


def get_conn():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        dbname=DB_NAME,
        cursor_factory=psycopg2.extras.RealDictCursor,
    )


@app.get('/invites')
def get_invites():
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute('SELECT id, email, guests FROM invites ORDER BY id')
            rows = cur.fetchall()
            # psycopg2 RealDictCursor returns dicts and decodes JSONB to Python lists
            return jsonify(rows)
    finally:
        conn.close()


@app.get('/invites/<id>')
def get_invite(id: str):
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute('SELECT id, email, guests FROM invites WHERE id = %s', (id,))
            row = cur.fetchone()
            if not row:
                return jsonify({'error': 'Invite not found'}), 404
            return jsonify(row)
    finally:
        conn.close()


@app.patch('/invites/<id>')
def patch_invite(id: str):
    data = request.get_json(silent=True)
    if not data or not isinstance(data, dict):
        return jsonify({'error': 'Invalid JSON body'}), 400

    updates = []
    params = []

    if 'email' in data:
        updates.append('email = %s')
        params.append(data.get('email') or '')

    if 'guests' in data:
        try:
            guests_json = json.dumps(data.get('guests'))
        except (TypeError, ValueError):
            return jsonify({'error': 'Invalid guests format'}), 400
        updates.append('guests = %s::jsonb')
        params.append(guests_json)

    if not updates:
        return jsonify({'error': 'No updatable fields provided (allowed: email, guests)'}), 400

    params.append(id)
    sql = f"UPDATE invites SET {', '.join(updates)} WHERE id = %s RETURNING id, email, guests"
    SUMMARY_SQL_PATH = Path(__file__).resolve().parent / 'sql' / 'update_summary_counts.sql'
    SUMMARY_SQL_TEXT = SUMMARY_SQL_PATH.read_text()
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            row = cur.fetchone()
            if not row:
                return jsonify({'error': 'Invite not found'}), 404
            cur.execute(SUMMARY_SQL_TEXT)
            conn.commit()
            return jsonify(row)
    finally:
        conn.close()

@app.get('/summaries')
def get_summaries():
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute('SELECT id, title, counts FROM summaries ORDER BY id')
            rows = cur.fetchall()
            return jsonify(rows)
    finally:
        conn.close()

if __name__ == '__main__':
    # default host=0.0.0.0 so containers can reach it
    app.run(host='0.0.0.0', port=5000, debug=True)
