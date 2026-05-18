import joblib
import torch
from transformers import pipeline
from pathlib import Path

from preprocess import download_nltk_resources, clean_text

# Ensure nltk resources are available
download_nltk_resources()

# Paths
BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"

print("Loading ML models. This might take a moment...")

# Load classical models
tfidf = joblib.load(MODELS_DIR / "tfidf_vectorizer.joblib")
rf = joblib.load(MODELS_DIR / "random_forest.joblib")

# Load BERT model
bert_pipe = pipeline("text-classification", model=str(MODELS_DIR / "distilbert-finetuned"))
print("Models loaded successfully.")

def predict_all(text: str):
    # Preprocess for classical model
    cleaned = clean_text(text)
    
    # Random Forest Prediction
    X = tfidf.transform([cleaned])
    rf_probs = rf.predict_proba(X)[0] 
    rf_fake_prob = float(rf_probs[1]) # probability of being Fake
    
    # BERT Prediction
    # Taking first 512 characters as a heuristic if text is too long,
    # though DistilBERT tokenizer truncates automatically if pipeline is setup right.
    bert_out = bert_pipe(text[:2000], truncation=True, max_length=512)[0]
    bert_label_str = bert_out['label']
    bert_score = bert_out['score']
    
    # Determine final label and confidence (Using BERT as primary)
    is_fake = "1" in bert_label_str or "fake" in bert_label_str.lower()
    
    final_label = "Fake" if is_fake else "Real"
    final_confidence = float(bert_score)
    
    return {
        "label": final_label,
        "confidence": final_confidence,
        "all_models": {
            "random_forest": rf_fake_prob,
            "bert": {
                "score": float(bert_score),
                "label": bert_label_str
            }
        }
    }
