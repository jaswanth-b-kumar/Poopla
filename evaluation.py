import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load model
model = tf.keras.models.load_model("best_model.h5")

# Path to validation/test dataset
test_dir = "augmented_dataset"  # Change your dataset directory

# Data generator
test_datagen = ImageDataGenerator(rescale=1/255.0)

test_generator = test_datagen.flow_from_directory(
    test_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='binary',
    shuffle=False
)

# Predict probabilities
pred_probabilities = model.predict(test_generator)
predictions = (pred_probabilities > 0.5).astype(int)  # Convert sigmoid to class labels

# True labels
true_labels = test_generator.classes

# Class mapping
class_indices = test_generator.class_indices
class_names = list(class_indices.keys())
print("Class Names:", class_names)

# Classification Report
print("\nClassification Report:\n")
print(classification_report(true_labels, predictions, target_names=class_names))

# Confusion Matrix
cm = confusion_matrix(true_labels, predictions)
print("\nConfusion Matrix:")
print(cm)
