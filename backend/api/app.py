from flask import Flask, request, jsonify
from flask_cors import CORS
from model_loader import predict_credit_risk

app = Flask(__name__)
CORS(app)  

@app.route("/predict", methods=["POST"])
def predict():
    """API endpoint to predict credit risk."""
    try:
        data = request.json["features"]  
        prediction = predict_credit_risk(data)

        return jsonify({"credit_risk": "Eligible" if prediction == 1 else "Not Eligible"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
