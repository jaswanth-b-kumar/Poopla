# Poopla

Monorepo for Poopla with separate backend, web, and mobile apps.

## Structure
- `backend/` FastAPI service (model inference API)
- `web/` React + Vite web client
- `mobile/` React Native (Expo) mobile client
- `dataset/`, `augmented_dataset/` local data (ignored in git)
- `static/`, `templates/` legacy Flask assets (optional)

## Prerequisites
- Git
- Python 3.11 or 3.12 (recommended for backend)
- Node.js 18+ (or 20+)
- npm

## Backend setup
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Health check: http://127.0.0.1:8000/health

## Web setup
```bash
cd web
npm install
npm run dev
```

## Mobile setup
```bash
cd mobile
npm install
npm run start
```

## Model file
The model file `best_model.h5` is not tracked in git. Download it separately and place it in the backend root (or follow future instructions in `backend/README.md`).

## Notes
- Large datasets and model files are ignored by `.gitignore`.
- You can reorganize legacy Flask assets under `backend/` if you plan to keep server?rendered templates.