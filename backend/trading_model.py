import joblib
import numpy as np

class TradingModel:
    def __init__(self, hmm_model, price_model, model):
        self.hmm_model = hmm_model
        self.price_model = price_model
        self.model = model

    def extract_hmm_features(self, X):
        return self.hmm_model.predict(X)
    
    def extract_lstm_trend(self, X):
        X_lstm = X.reshape((X.shape[0], 1, X.shape[1]))  # Reshape for LSTM
        lstm_pred = self.lstm_model.predict(X_lstm).flatten()
        return (lstm_pred > 0.5).astype(int)  # Convert to binary (0 or 1)
    
    def extract_lstm_price(self, X):
        X_lstm = X.reshape((X.shape[0], 1, X.shape[1]))  # Reshape for LSTM
        return self.price_model.predict(X_lstm).flatten()

    def predict(self, X):
        market_regime_test = self.extract_hmm_features(X)
        lstm_pred_test = self.extract_lstm_trend(X)
        predicted_price_test = self.extract_lstm_price(X)

        X_test_final = np.column_stack([X, market_regime_test, lstm_pred_test, predicted_price_test])
        return self.model.predict(X_test_final)

# Load trained models
hmm_model = joblib.load('hmm_model.pkl')
price_model = joblib.load('price_model.h5')
model = joblib.load('xgb_model.pkl')

# Create and save full model
full_model = TradingModel(hmm_model, price_model, model)
joblib.dump(full_model, 'trading_model.pkl')