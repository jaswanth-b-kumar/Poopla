import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img, array_to_img

# Paths
input_dir = "dataset"                   # original dataset
output_dir = "augmented_dataset"        # new dataset folder to store augmented images
num_aug = 4                              # number of augmented images per real image

# Define augmentation generator
datagen = ImageDataGenerator(
    rotation_range=25,
    width_shift_range=0.15,
    height_shift_range=0.15,
    shear_range=0.10,
    zoom_range=0.20,
    horizontal_flip=True,
    fill_mode="nearest",
)

# Create output folder if not exists
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Loop through class folders
for class_name in os.listdir(input_dir):
    class_path = os.path.join(input_dir, class_name)

    if not os.path.isdir(class_path):
        continue

    # Create same class folder in output directory
    out_class_path = os.path.join(output_dir, class_name)
    if not os.path.exists(out_class_path):
        os.makedirs(out_class_path)

    # Loop through each image
    for img_name in os.listdir(class_path):
        img_path = os.path.join(class_path, img_name)

        img = load_img(img_path)
        x = img_to_array(img)
        x = np.expand_dims(x, axis=0)

        # Generate augmented images
        aug_iter = datagen.flow(x, batch_size=1)

        for i in range(num_aug):
            aug_img = next(aug_iter)[0].astype('uint8')
            aug_img = array_to_img(aug_img)

            new_filename = f"{img_name.split('.')[0]}_aug{i}.jpg"
            save_path = os.path.join(out_class_path, new_filename)
            aug_img.save(save_path)

        print(f"Augmented: {img_name} -> {num_aug} new images")

print("\n🎉 Dataset Augmentation Completed!")
print(f"Saved to: {output_dir}")
