# SETUP GUIDE - TruthLens Project

## Step 1: Install Dependencies

```bash
# Navigate to project directory
cd d:\Truthlens

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# Install all packages
pip install -r requirements.txt
```

## Step 2: Download Dataset

### Option A: Using Kaggle CLI (Recommended)
```bash
# Install Kaggle CLI if not already installed
pip install kaggle

# Download and extract dataset
kaggle datasets download -d clementbisaillon/fake-and-real-news-dataset
unzip fake-and-real-news-dataset.zip -d data/

# Files extracted: train.csv, test.csv
```

### Option B: Manual Download
1. Go to: https://www.kaggle.com/datasets/clementbisaillon/fake-and-real-news-dataset
2. Download the files
3. Extract to: `d:\Truthlens\data\`

### Option C: Download via Python
```python
import pandas as pd
import os

# If using Google Colab, run instead:
# !kaggle datasets download -d clementbisaillon/fake-and-real-news-dataset
# !unzip fake-and-real-news-dataset.zip -d ../data/

# For local: use Kaggle CLI or manual download
```

## Step 3: Verify Installation

```bash
# Check Python version
python --version

# List installed packages
pip list | findstr "pandas numpy torch transformers fastapi"

# Test imports
python -c "import pandas; import torch; import transformers; print('✓ All packages installed!')"
```

## Step 4: Start Week 1 EDA

```bash
# Start Jupyter Notebook
jupyter notebook notebooks/week1_eda.ipynb
```

Then follow the notebook cells:
1. Load dataset
2. Exploratory data analysis
3. Create visualizations
4. Document observations

## Directory Structure After Setup

```
d:\Truthlens\
├── notebooks/
│   ├── week1_eda.ipynb          ← START HERE
│   ├── week2_preprocessing.ipynb (Next)
│   ├── week3_models.ipynb
│   └── week4_bert.ipynb
├── backend/
│   ├── models/
│   ├── main.py
│   ├── model.py
│   └── requirements.txt
├── frontend/
│   └── (React app - Week 5)
├── data/
│   ├── train.csv               ← Downloaded from Kaggle
│   └── test.csv
├── venv/                        ← Virtual environment
├── requirements.txt
├── README.md
└── .gitignore
```

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'pandas'"
**Solution**: 
```bash
# Make sure virtual environment is activated
# Then reinstall requirements
pip install -r requirements.txt
```

### Issue: Kaggle API Authentication Error
**Solution**:
1. Go to: https://www.kaggle.com/settings/account
2. Click "Create New API Token"
3. Place `kaggle.json` in `C:\Users\<username>\.kaggle\`
4. Run: `kaggle datasets download ...`

### Issue: Jupyter Notebook Not Opening
**Solution**:
```bash
# Install jupyter explicitly
pip install jupyter

# Start notebook in project directory
jupyter notebook
```

### Issue: GPU Not Available (for Week 4)
**Solution**: 
- BERT fine-tuning can work on CPU but will be slower
- For GPU, use Google Colab (free T4): https://colab.research.google.com/

## Next: Week 1 Checklist

- [ ] Virtual environment created & activated
- [ ] All packages installed from requirements.txt
- [ ] Dataset downloaded to `data/` folder
- [ ] Jupyter installed and working
- [ ] Week 1 notebook opens without errors
- [ ] Dataset loads successfully in notebook
- [ ] Ready to run EDA analysis

---

**Questions?** Check README.md or re-run `pip install -r requirements.txt`
