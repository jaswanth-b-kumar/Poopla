import pandas as pd
import numpy as np
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric, ClassificationMetric

# Example protected attribute array (load from your dataset metadata)
protected_attribute = np.load("protected_gender.npy")  # 0/1 values

# Create dataframe for AIF360
df = pd.DataFrame({
    "label": true_labels,
    "prediction": predictions.reshape(-1),
    "protected": protected_attribute
})

# Convert to AIF360 dataset format
dataset = BinaryLabelDataset(
    df=df,
    label_names=['label'],
    protected_attribute_names=['protected']
)

# Dataset metric: bias in dataset distribution
metric_dataset = BinaryLabelDatasetMetric(dataset, privileged_groups=[{'protected': 1}], unprivileged_groups=[{'protected': 0}])

print("## Statistical Parity Difference:", metric_dataset.statistical_parity_difference())

# Classification bias metrics
metric_classifier = ClassificationMetric(
    dataset,
    dataset.copy().set_predicted_labels(df['prediction'].values),
    privileged_groups=[{'protected': 1}],
    unprivileged_groups=[{'protected': 0}]
)

print("## Disparate Impact:", metric_classifier.disparate_impact())
print("## Equal Opportunity Difference:", metric_classifier.equal_opportunity_difference())
print("## Average Odds Difference:", metric_classifier.average_odds_difference())
