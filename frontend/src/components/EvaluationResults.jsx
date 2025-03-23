import { useEffect, useState } from "react";
import { fetchEvaluationResults } from "../services/api";

function EvaluationResults() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchEvaluationResults().then(setResults);
  }, []);

  if (!results) return <p>Loading evaluation results...</p>;

  return (
    <div>
      <h2>Model Evaluation Results</h2>
      <p>
        <strong>Accuracy:</strong> {results.Accuracy}
      </p>
      <p>
        <strong>Precision:</strong> {results.Precision}
      </p>
      <p>
        <strong>Recall:</strong> {results.Recall}
      </p>
      <p>
        <strong>F1 Score:</strong> {results["F1 Score"]}
      </p>
      <h3>Confusion Matrix</h3>
      <pre>{JSON.stringify(results["Confusion Matrix"], null, 2)}</pre>
    </div>
  );
}

export default EvaluationResults;
