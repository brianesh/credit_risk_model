import joblib
import numpy as np


model = joblib.load("../model.pkl")

def predict_credit_risk(data):
    """Make predictions on input data."""
    prediction = model.predict(np.array(data).reshape(1, -1))
    return int(prediction[0])  
