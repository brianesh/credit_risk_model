import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.ensemble import StackingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score


processed_data_path = os.path.join(os.path.dirname(__file__), "../data/processed_data.csv")
df = pd.read_csv(processed_data_path)


y = (df.iloc[:, -1] >= 0.5).astype(int)  
X = df.iloc[:, :-1]  

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
xgb_model = XGBClassifier(use_label_encoder=False, eval_metric="logloss", random_state=42)


stacked_model = StackingClassifier(
    estimators=[
        ('rf', rf_model),
        ('xgb', xgb_model)
    ],
    final_estimator=RandomForestClassifier(n_estimators=50, random_state=42)
)


rf_model.fit(X_train, y_train)
xgb_model.fit(X_train, y_train)
stacked_model.fit(X_train, y_train)


rf_preds = rf_model.predict(X_test)
xgb_preds = xgb_model.predict(X_test)
stacked_preds = stacked_model.predict(X_test)


def evaluate_model(name, y_true, y_pred):
    print(f"\n{name} Model Performance:")
    print(f"Accuracy: {accuracy_score(y_true, y_pred):.4f}")
    print(f"Precision: {precision_score(y_true, y_pred):.4f}")
    print(f"Recall: {recall_score(y_true, y_pred):.4f}")
    print(f"F1-score: {f1_score(y_true, y_pred):.4f}")
    print(f"AUC-ROC: {roc_auc_score(y_true, y_pred):.4f}")


evaluate_model("Random Forest", y_test, rf_preds)
evaluate_model("XGBoost", y_test, xgb_preds)
evaluate_model("Stacking", y_test, stacked_preds)


best_model = stacked_model  
joblib.dump(best_model, os.path.join(os.path.dirname(__file__), "model.pkl"))

print("\n✅ Model training complete. Best model saved as model.pkl")
