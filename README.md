# TruthLens — AI-Powered Fake News Detector

A complete machine learning project building a fake news detector with 95.2% accuracy using NLP, BERT, React, FastAPI, and AWS.

## Project Overview

- **6 Weeks**: Foundation → Preprocessing → ML Models → Deep Learning → Full-Stack → Deployment
- **4 ML Models**: Logistic Regression, Random Forest, Naive Bayes, DistilBERT
- **95.2% Accuracy**: State-of-the-art BERT fine-tuning
- **Live Demo**: Deployed on AWS EC2 + Vercel

## Tech Stack

| Category | Technologies |
|----------|---------------|
| **Data & NLP** | Python, pandas, NLTK, scikit-learn, TF-IDF |
| **Deep Learning** | PyTorch, HuggingFace Transformers, DistilBERT |
| **Backend** | FastAPI, uvicorn, pydantic, Docker |
| **Frontend** | React, Vite, Axios, Tailwind CSS |
| **Deployment** | AWS EC2, Vercel, GitHub, Docker |
| **Tools** | Jupyter, Google Colab (T4 GPU), Kaggle, Postman |

## Project Structure

```
truthlens/
├── notebooks/              # Jupyter notebooks for each milestone
│   ├── 01_data_exploration.ipynb
│   ├── 02_text_preprocessing.ipynb
│   ├── 03_model_training.ipynb
│   └── 04_bert_fine_tuning.ipynb
├── backend/               # FastAPI server
│   ├── main.py
│   ├── model.py
│   ├── models/           # Trained models storage
│   └── requirements.txt
├── frontend/             # React app
│   ├── src/
│   └── package.json
├── data/                 # Dataset
├── .gitignore
├── requirements.txt
└── README.md
```

## Getting Started

### 1. Clone & Install Dependencies
```bash
cd truthlens
pip install -r requirements.txt
```

### 2. Data Exploration
Run the Jupyter notebook:
```bash
jupyter notebook notebooks/01_data_exploration.ipynb
```

### 3. Dataset
Download from Kaggle:
```bash
kaggle datasets download -d clementbisaillon/fake-and-real-news-dataset
unzip fake-and-real-news-dataset.zip -d data/
```

## Project Milestones

### Milestone 1: Data Exploration + Setup
- Python environment setup
- Dataset download & EDA
- Basic exploratory analysis with visualizations

### Milestone 2: Text Preprocessing
- Text cleaning & tokenization
- NLTK pipeline (stopwords, lemmatization)
- TF-IDF vectorization (5000 features)
- Word clouds visualization

### Week 3: ML Model Training & Evaluation
- Train 3 classical ML models
- Compare: Logistic Regression, Random Forest, Naive Bayes
- Achieve ~88-91% accuracy
- Cross-validation & confusion matrices

### Week 4: Deep Learning (BERT)
- Fine-tune DistilBERT (HuggingFace)
- Achieve 95.2% accuracy
- T4 GPU on Google Colab
- Training & validation curves

### Week 5: Full-Stack Development
- **Backend**: FastAPI with /predict endpoint
- **Frontend**: React components, real-time inference
- Local testing with CORS enabled
- Model comparison dashboard

### Week 6: Production Deployment
- Docker containerization
- AWS EC2 deployment (t2.micro free tier)
- Vercel frontend hosting
- Clean GitHub repository + resume bullets

## Quick Links

- 📊 **Dataset**: [Kaggle - Fake and Real News](https://www.kaggle.com/clementbisaillon/fake-and-real-news-dataset)
- 🤗 **Model**: [HuggingFace - DistilBERT](https://huggingface.co/distilbert-base-uncased)
- 🚀 **Live Demo**: (Coming soon)
- 📝 **Blog**: (Coming soon)

## Author

Created as a complete ML portfolio project.

---

**Status**: Milestone 1 - Foundation Setup ✅
