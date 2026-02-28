# DataMorph Backend

FastAPI + PostgreSQL + Redis + Celery backend for DataMorph.

## Quick Start

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Copy env file
cp .env.example .env

# 4. Run database migrations
alembic upgrade head

# 5. Start server
uvicorn app.main:app --reload --port 8000
```

## Docker (recommended)

```bash
docker-compose up -d
```
