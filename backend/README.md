# Backend API

FastAPI service for Poopla.

## Prerequisites
- Python 3.10+ (for local dev)
- Docker Desktop

## Option B (recommended): Docker Compose for API + DB
From the repo root:
```bash
docker compose up -d
```

Health checks:
- http://127.0.0.1:8000/health
- http://127.0.0.1:8000/db/health

## Local dev (without Docker for API)
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` in `backend/` using:
```env
DATABASE_URL=postgresql+pg8000://poopla:poopla@localhost:5432/poopla
```

Run:
```bash
uvicorn app.main:app --reload --port 8000
```

## Windows ARM64 note
This project uses the pure-Python `pg8000` driver for compatibility.
