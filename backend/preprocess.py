import re
from pathlib import Path
from typing import List, Optional

import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

from sklearn.feature_extraction.text import TfidfVectorizer


def download_nltk_resources() -> None:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('omw-1.4', quiet=True)


def load_dataset(data_dir: Optional[Path] = None):
    if data_dir is None:
        data_dir = Path(__file__).resolve().parents[1] / 'data'
    else:
        data_dir = Path(data_dir)

    real_path = data_dir / 'True.csv'
    fake_path = data_dir / 'Fake.csv'

    if not real_path.exists() or not fake_path.exists():
        raise FileNotFoundError('True.csv or Fake.csv not found in data directory')

    real_df = pd.read_csv(real_path)
    fake_df = pd.read_csv(fake_path)

    real_df['label'] = 0
    fake_df['label'] = 1

    return pd.concat([real_df, fake_df], ignore_index=True)


def normalize_text(text: str) -> str:
    if not isinstance(text, str):
        return ''
    text = text.lower()
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def get_stopwords() -> set:
    return set(stopwords.words('english'))


def clean_text(text: str, lemmatizer: Optional[WordNetLemmatizer] = None, stopwords_set: Optional[set] = None) -> str:
    if lemmatizer is None:
        lemmatizer = WordNetLemmatizer()
    if stopwords_set is None:
        stopwords_set = get_stopwords()

    text = normalize_text(text)
    tokens = nltk.word_tokenize(text)
    cleaned_tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stopwords_set and len(token) > 1]
    return ' '.join(cleaned_tokens)


def build_tfidf(corpus: List[str], max_features: int = 5000, ngram_range=(1, 2)) -> TfidfVectorizer:
    vectorizer = TfidfVectorizer(max_features=max_features, ngram_range=ngram_range)
    vectorizer.fit(corpus)
    return vectorizer
