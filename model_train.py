import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.applications import MobileNetV2, ResNet50, EfficientNetB0
from tensorflow.keras.layers import GlobalAveragePooling2D
import numpy as np
import os

data_dir = "augmented_dataset"
img_size = (224, 224)
batch_size = 32
epochs = 10

datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_data = datagen.flow_from_directory(
    data_dir, target_size=img_size, batch_size=batch_size,
    class_mode='binary', subset='training'
)

val_data = datagen.flow_from_directory(
    data_dir, target_size=img_size, batch_size=batch_size,
    class_mode='binary', subset='validation'
)

# ------- MODEL 1: Simple CNN -------
cnn = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])
cnn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
history_cnn = cnn.fit(train_data, validation_data=val_data, epochs=epochs)
acc_cnn = max(history_cnn.history['val_accuracy'])

# ------- MODEL 2: MobileNetV2 -------
mobilenet = MobileNetV2(include_top=False, input_shape=(224,224,3), weights="imagenet")
model_mobilenet = Sequential([
    mobilenet,
    GlobalAveragePooling2D(),
    Dense(1, activation='sigmoid')
])
model_mobilenet.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
history_mobile = model_mobilenet.fit(train_data, validation_data=val_data, epochs=epochs)
acc_mobile = max(history_mobile.history['val_accuracy'])

# ------- MODEL 3: ResNet50 -------
resnet = ResNet50(include_top=False, input_shape=(224,224,3), weights="imagenet")
model_resnet = Sequential([
    resnet,
    GlobalAveragePooling2D(),
    Dense(1, activation='sigmoid')
])
model_resnet.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
history_resnet = model_resnet.fit(train_data, validation_data=val_data, epochs=epochs)
acc_resnet = max(history_resnet.history['val_accuracy'])

# ------- MODEL 4: EfficientNetB0 -------
effnet = EfficientNetB0(include_top=False, input_shape=(224,224,3), weights="imagenet")
model_effnet = Sequential([
    effnet,
    GlobalAveragePooling2D(),
    Dense(1, activation='sigmoid')
])
model_effnet.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
history_effnet = model_effnet.fit(train_data, validation_data=val_data, epochs=epochs)
acc_effnet = max(history_effnet.history['val_accuracy'])

# ------- CHOOSE BEST MODEL -------
accuracies = [acc_cnn, acc_mobile, acc_resnet, acc_effnet]
best_index = np.argmax(accuracies)
models = [cnn, model_mobilenet, model_resnet, model_effnet]
best_model = models[best_index]
best_model.save("best_model.h5")

print("\n===============================")
print(f"The best model is MODEL {best_index+1} with accuracy = {accuracies[best_index]}")
print("Saved as best_model.h5")
print("===============================")
