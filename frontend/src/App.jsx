import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./App.css";

function App() {
  const featureLabels = [
    "Age (years)",
    "Annual Income (USD)",
    "Employment Status (1=Employed, 0=Unemployed)",
    "Credit Score (300-850)",
    "Loan Amount (USD)",
    "Loan Term (months)",
    "Number of Existing Loans",
    "Debt-to-Income Ratio (0-1)",
    "Has Collateral (1=Yes, 0=No)",
    "Past Defaults (1=Yes, 0=No)",
  ];

  const [features, setFeatures] = useState(Array(10).fill(""));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: features.map(Number),
      });
      setPrediction(response.data.credit_risk);
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Credit Risk Assessment</h2>
      <Form onSubmit={handleSubmit}>
        {features.map((value, index) => (
          <Form.Group key={index} className="mb-3">
            <Form.Label>{featureLabels[index]}</Form.Label>
            <Form.Control
              type="number"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            />
          </Form.Group>
        ))}

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="w-100"
        >
          {loading ? "Predicting..." : "Submit"}
        </Button>
      </Form>

      {prediction && (
        <Alert
          className="mt-4 text-center"
          variant={prediction === "Eligible" ? "success" : "danger"}
        >
          <strong>
            {prediction === "Eligible"
              ? "✅ You are eligible for credit!"
              : "❌ You are not eligible for credit."}
          </strong>
        </Alert>
      )}

      {error && (
        <Alert className="mt-4 text-center" variant="danger">
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default App;
