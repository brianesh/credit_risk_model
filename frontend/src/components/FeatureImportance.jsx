import { useEffect, useState } from "react";
import { fetchFeatureImportance } from "../services/api";

function FeatureImportance() {
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    fetchFeatureImportance().then(setFeatures);
  }, []);

  if (!features) return <p>Loading feature importance...</p>;

  return (
    <div>
      <h2>Feature Importance</h2>
      <ul>
        {features.map(([feature, importance], index) => (
          <li key={index}>
            {feature}: {importance.toFixed(4)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeatureImportance;
