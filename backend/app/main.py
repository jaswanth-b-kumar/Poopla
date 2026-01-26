from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from app.db import check_db_health

app = FastAPI(title="Poopla API")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db/health")
def db_health():
    ok, error = check_db_health()
    if ok:
        return {"status": "ok"}
    return {"status": "error", "detail": error}
