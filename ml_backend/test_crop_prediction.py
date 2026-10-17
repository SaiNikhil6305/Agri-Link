import sys
import os

# Fix Windows console UTF-8 encoding
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import numpy as np
import tensorflow as tf
from PIL import Image
from tensorflow.keras.preprocessing import image

# Suppress TF logging noise
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

CROP_MODEL_PATH = 'best_crop_type_model.keras'
DEFECT_MODEL_PATH = 'best_maize_defect_model.keras'

CROP_CLASSES = ['Jute', 'Maize', 'Rice', 'Sugarcane', 'Wheat']
DEFECT_CLASSES = ['Broken', 'Heat_Damaged', 'Immature', 'Insect_Damaged', 'Moldy', 'Normal', 'Sprouted', 'Stained']

# Load models once
crop_model = None
defect_model = None

if os.path.exists(CROP_MODEL_PATH):
    crop_model = tf.keras.models.load_model(CROP_MODEL_PATH)
if os.path.exists(DEFECT_MODEL_PATH):
    defect_model = tf.keras.models.load_model(DEFECT_MODEL_PATH)

def evaluate_crop_and_quality(img_path):
    if not os.path.exists(img_path):
        print(f"Error: Image '{img_path}' not found.")
        return

    # Load and preprocess image for DL models
    raw_img = Image.open(img_path).convert('RGB')
    resized_img = raw_img.resize((224, 224))
    img_array = np.expand_dims(image.img_to_array(resized_img), axis=0)

    # 1. Predict Crop Type
    crop_name = "Unknown"
    crop_conf = 0.0
    crop_probs = {}

    if crop_model is not None:
        preds = crop_model.predict(img_array, verbose=0)[0]
        crop_idx = int(np.argmax(preds))
        crop_name = CROP_CLASSES[crop_idx]
        crop_conf = float(preds[crop_idx] * 100.0)
        crop_probs = {c: float(p * 100.0) for c, p in zip(CROP_CLASSES, preds)}

    # 2. Quality Evaluation
    grade = ""
    quality_score = 0.0
    primary_condition = ""
    advisory = ""
    defect_detail = None

    # Check if this image is a grain / seed / kernel sample vs a field crop photo
    is_grain_sample = any(k in img_path.lower() for k in ['grain', 'kernel', 'defect', 'seed', 'maize_defect'])

    # If it's a grain kernel sample, run the Deep Learning Grain Defect Model
    if defect_model is not None and is_grain_sample:
        defect_preds = defect_model.predict(img_array, verbose=0)[0]
        defect_idx = int(np.argmax(defect_preds))
        defect_name = DEFECT_CLASSES[defect_idx]
        defect_conf = float(defect_preds[defect_idx] * 100.0)
        defect_detail = {c: float(p * 100.0) for c, p in zip(DEFECT_CLASSES, defect_preds)}

        if defect_name == 'Normal':
            grade = "Grade A (Premium Quality)"
            quality_score = 92.0 + (defect_conf * 0.07)
            primary_condition = "Sound & Healthy Grain (Unblemished)"
            advisory = "Pristine harvest quality. Meets Grade-1 grain export specifications. Ready for premium market pricing."
        elif defect_name in ['Immature', 'Stained']:
            grade = "Grade B (Good / Commercial Standard)"
            quality_score = 72.0 + (defect_conf * 0.12)
            primary_condition = f"Minor Imperfection: {defect_name.replace('_', ' ')}"
            advisory = "Good commercial grade. Mild natural weathering or slightly premature harvesting. Suitable for standard mill processing."
        else:
            grade = "Grade C (Substandard / Defective)"
            quality_score = max(15.0, 50.0 - (defect_conf * 0.35))
            primary_condition = f"Defect Detected: {defect_name.replace('_', ' ')}"
            advisory = f"High damage rate due to {defect_name.lower()}. Immediate mechanical sorting and air-drying required to prevent batch contamination."
    else:
        # Botanical Visual Quality Analysis for Field Crops (Wheat, Rice, Sugarcane, Jute)
        np_arr = np.array(resized_img, dtype=np.float32) / 255.0
        r, g, b = np_arr[:, :, 0], np_arr[:, :, 1], np_arr[:, :, 2]

        # Calculate Excess Green Index & Vegetative Vigor
        exg = (2.0 * g - r - b)
        green_vigor = np.mean(np.maximum(0, exg)) * 100.0

        # Golden Ripeness Index (for ripe cereal grains: Wheat, Rice)
        golden_ripe = np.mean((r > 0.45) & (g > 0.35) & (b < 0.40) & (r >= g)) * 100.0

        # Uniformity & Color Coherence
        std_dev = np.std(np_arr)
        color_uniformity = max(0.0, 100.0 - std_dev * 180.0)

        # Baseline calculation
        if crop_name in ['Wheat', 'Rice']:
            harvest_readiness = max(green_vigor * 1.8, golden_ripe * 2.2)
            quality_score = min(98.5, 82.0 + harvest_readiness * 0.2 + color_uniformity * 0.1)
        else: # Sugarcane, Jute
            quality_score = min(98.5, 80.0 + green_vigor * 1.2 + color_uniformity * 0.08)

        quality_score = float(np.clip(quality_score, 40.0, 99.0))

        if quality_score >= 85.0:
            grade = "Grade A (Premium Quality)"
            primary_condition = "Vibrant & Well-Developed (Healthy Crop)"
            advisory = "Robust vegetative vigor and high chlorophyll/maturity. Excellent crop health; prime market valuation."
        elif quality_score >= 68.0:
            grade = "Grade B (Good / Standard Grade)"
            primary_condition = "Healthy with Minor Field Stress"
            advisory = "Standard commercial quality. Minor environmental weathering; keep moisture and irrigation optimal."
        else:
            grade = "Grade C (Fair / Stress Detected)"
            primary_condition = "Discoloration or Foliar Stress"
            advisory = "Signs of nutrient deficiency, dehydration, or foliar stress detected. Recommend soil testing and inspection."

    # Print Formatted Inspection Report
    print("=" * 65)
    print("         AGRI-LINK CROP & QUALITY INSPECTION REPORT")
    print("=" * 65)
    print(f" Image Evaluated : {img_path}")
    print(f" Detected Crop   : {crop_name} ({crop_conf:.2f}% Confidence)")
    print("-" * 65)
    print(f" QUALITY GRADE   : {grade}")
    print(f" Quality Score   : {quality_score:.1f} / 100")
    print(f" Health Status   : {primary_condition}")
    print(f" Farmer Advisory : {advisory}")
    print("-" * 65)

    if defect_detail:
        print(" Grain Defect Breakdown (Deep Learning):")
        for d_name, d_prob in sorted(defect_detail.items(), key=lambda x: x[1], reverse=True)[:4]:
            print(f"   * {d_name.ljust(15)}: {d_prob:5.2f}%")
        print("-" * 65)

    print(" Crop Classification Probabilities:")
    for c_name, c_prob in sorted(crop_probs.items(), key=lambda x: x[1], reverse=True):
        print(f"   * {c_name.ljust(12)}: {c_prob:5.2f}%")
    print("=" * 65 + "\n")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        evaluate_crop_and_quality(sys.argv[1])
    else:
        sample = './test_samples/wheat_sample.jpg'
        if os.path.exists(sample):
            evaluate_crop_and_quality(sample)
        else:
            print("Usage: python test_crop_prediction.py <image_path>")
