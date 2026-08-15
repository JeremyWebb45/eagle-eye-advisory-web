FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Ensure .env.services is present (copied by workflow)
# This file contains DB connection details baked at build time

EXPOSE 5000

# Use Gunicorn for production WSGI server
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--worker-class", "sync", "--timeout", "60", "app:app"]
