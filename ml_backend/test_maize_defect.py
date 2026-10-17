import sys
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

def test_maize_defect(img_path):
    model_path = 'best_maize_defect_model.keras'
    if not os.path.exists(model_path):
        model_path = 'maize_defect_model_final.keras'

    if not os.path.exists(model_path):
        print(f"Model file '{model_path}' not found. Please train the model first.")
        return

    model = tf.keras.models.load_model(model_path)
    # Alphabetical order as loaded by image_dataset_from_directory
    class_names = sorted(['Normal', 'Broken', 'Moldy', 'Insect_Damaged', 'Sprouted', 'Heat_Damaged', 'Immature', 'Stained'])

    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_idx = np.argmax(predictions[0])
    confidence = predictions[0][predicted_idx] * 100

    print("\n🌽 --- Maize Kernel Quality Inspection Result ---")
    print(f"Image: {img_path}")
    print(f"Kernel Grade / Status: {class_names[predicted_idx]}")
    print(f"Confidence: {confidence:.2f}%")
    print("\nDetailed Probabilities across Defect Classes:")
    for name, prob in zip(class_names, predictions[0]):
        print(f"  - {name}: {prob * 100:.2f}%")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        test_maize_defect(sys.argv[1])
    else:
        sample_path = './maize_defect_dataset/Normal'
        if os.path.exists(sample_path) and os.listdir(sample_path):
            sample_img = os.path.join(sample_path, os.listdir(sample_path)[0])
            test_maize_defect(sample_img)
        else:
            print("Usage: python test_maize_defect.py <path_to_image>")
