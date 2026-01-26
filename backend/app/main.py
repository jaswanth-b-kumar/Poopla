from fastapi import FastAPI

app = FastAPI(title="Poopla API")

@app.get("/health")
def health():
    return {"status": "ok"}