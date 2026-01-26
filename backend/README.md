# Backend API

FastAPI service for Poopla.

## Prerequisites
- Python 3.10+

## Setup
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run (dev)
```bash
uvicorn app.main:app --reload --port 8000
```

## Health check
Open http://127.0.0.1:8000/health