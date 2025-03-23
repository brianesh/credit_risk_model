import { useState } from "react";
import { predictRisk } from "../services/api";

function PredictionForm() {
  const [formData, setFormData] = useState({
    person_age: "",
    person_income: "",
    loan_amnt: "",
    loan_int_rate: "",
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await predictRisk(formData);
    setPrediction(result);
  };

  return (
    <div>
      <h2>Loan Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="person_age"
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <input
          name="person_income"
          placeholder="Income"
          onChange={handleChange}
          required
        />
        <input
          name="loan_amnt"
          placeholder="Loan Amount"
          onChange={handleChange}
          required
        />
        <input
          name="loan_int_rate"
          placeholder="Interest Rate"
          onChange={handleChange}
          required
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction.risk}</p>}
    </div>
  );
}

export default PredictionForm;
