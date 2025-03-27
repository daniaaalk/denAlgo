# denAlgo
## Overview
This repository contains the implementation of an algorithmic trading model for BTCUSDT Crypto Market. This is a hybrid model built using HMM, LSTM (Trend & Price Prediction) & XGBoost as well as some technical indicators. 
This project aims to predict the pattern and the movement of the market and generate trading signals based on the historical data of bitcoin (2018-2023).

## Table Of Content
1. Introduction
2. Tools Used
3. Dataset Used
4. Implementation
   - Data Preprocessing
   - Feature Scaling/Engineering
   - Model Architecture
   - Training
5. Performance Analysis & Metrics

## Introduction
DenAlgo is trained with HMM for classifying market regim, LSTM to forecast price and trend then these two added as features into final model XGboost to finalize the signal. Currently the model is only trained and tested using historical data of BTCUSDT from 2018-2023. Performance Metrics are calculated by sharpe ratio, max drawdown and trade frequency as well as profit factor.

## Tools Used
- Python: Programming language used for implementation.
- Pandas: Data manipulation and analysis.
- NumPy: Numerical operations on arrays.
- Matplotlib: Data visualization.
- Scikit-learn: Machine learning library for train-test split and data preprocessing.
- Keras (with TensorFlow backend): Building and training the LSTM model.
- Joblib: Export models

## Dataset Used
Historical dataset of BTCUSDT from 2018-2023.

## Implementation
Data Preprocessing
The raw dataset is gathered from CryptoQuant, Glassnode, Coinglass, and Kaggle. The data is preprocessed to handle missing values, normalize features, and ensure uniform time intervals (e.g., 4H, 1H, 10M). Feature engineering is performed to extract key indicators like ATR, Volume, and Moving Averages. The dataset is then split into training and testing sets for model development.

Model Architecture
The self-learning trading strategy utilizes machine learning models to identify implicit market indicators and generate actionable trade signals. Possible architectures include Hidden Markov Models (HMMs) for pattern recognition and CNNs to extract hidden market patterns. The model incorporates support & resistance detection, breakout confirmation using bullish/bearish engulfing patterns, and feature selection to optimize alpha generation.

Training
The model is trained on historical data, leveraging indicators and extracted features. Various machine learning techniques, such as XGBoost, k-NN, or neural networks, are considered for optimizing performance. The training process is fine-tuned using Sharpe Ratio (≥1.8), Maximum Drawdown (≥-40%), and trade frequency constraints (≥3% per data row) to ensure robust predictions.

## Performance Analysis
The trained model undergoes backtesting on historical market data to evaluate its effectiveness in generating buy/sell signals. Simulated trading scenarios are conducted to measure portfolio growth, risk-adjusted returns, and overall profitability. The model’s predictions are assessed against real market movements, ensuring alignment with intraday trading strategies using the 1H timeframe.
