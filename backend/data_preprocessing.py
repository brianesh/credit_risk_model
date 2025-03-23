import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from imblearn.over_sampling import SMOTE
import os


file_path = os.path.join(os.path.dirname(__file__), "../data/credit_risk_dataset_with_viability.csv")
df = pd.read_csv(file_path)


df['person_emp_length'].fillna(df['person_emp_length'].median(), inplace=True)
df['loan_int_rate'].fillna(df['loan_int_rate'].median(), inplace=True)


categorical_cols = ['person_home_ownership', 'loan_intent', 'loan_grade', 'cb_person_default_on_file', 'viable_for_loan']
label_encoders = {}

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le  


X = df.drop(columns=['loan_status', 'viable_for_loan'])  
y = df['viable_for_loan']  


smote = SMOTE(sampling_strategy='auto', random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)


scaler = StandardScaler()
X_resampled_scaled = scaler.fit_transform(X_resampled)


X_train, X_test, y_train, y_test = train_test_split(X_resampled_scaled, y_resampled, test_size=0.2, random_state=42)


processed_data_path = os.path.join(os.path.dirname(__file__), "../data/processed_data.csv")
pd.DataFrame(X_resampled_scaled).to_csv(processed_data_path, index=False)

print(f"Preprocessing complete. Processed data saved to {processed_data_path}")
print(f"Training set size: {X_train.shape}, Testing set size: {X_test.shape}")
