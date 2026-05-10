@echo off
REM TruthLens Quick Setup Script
REM This script sets up the project environment automatically

echo.
echo ====================================
echo   TruthLens - Quick Setup
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.9+ from https://www.python.org
    pause
    exit /b 1
)

echo ✓ Python found

REM Create virtual environment
echo.
echo Creating virtual environment...
if not exist venv (
    python -m venv venv
    echo ✓ Virtual environment created
) else (
    echo ✓ Virtual environment already exists
)

REM Activate virtual environment
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo.
echo Upgrading pip...
python -m pip install --upgrade pip >nul 2>&1

REM Install requirements
echo.
echo Installing dependencies from requirements.txt...
echo This may take a few minutes...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install packages
    pause
    exit /b 1
)

echo.
echo ====================================
echo   ✅ SETUP COMPLETE!
echo ====================================
echo.
echo Next steps:
echo   1. Download dataset from Kaggle (see SETUP.md)
echo   2. Run: jupyter notebook notebooks/week1_eda.ipynb
echo   3. Follow the notebook to complete EDA analysis
echo.
echo Virtual environment is already activated.
echo.
pause
