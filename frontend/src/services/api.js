const API_URL = "http://localhost:5000"; // Update with actual backend URL

export const fetchEvaluationResults = async () => {
  const response = await fetch(`${API_URL}/evaluation`);
  return response.json();
};

export const fetchFeatureImportance = async () => {
  const response = await fetch(`${API_URL}/feature-importance`);
  return response.json();
};

export const predictRisk = async (formData) => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return response.json();
};
