from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_all

app = FastAPI(title="TruthLens API", description="API for Fake News Detection")

# Allow CORS for React frontend (Vite defaults to 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextIn(BaseModel):
    text: str

@app.post("/predict")
def predict(body: TextIn):
    return predict_all(body.text)

@app.get("/health")
def health():
    return {"status": "healthy"}
