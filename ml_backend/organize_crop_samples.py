import os
import shutil

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ML_DIR = os.path.dirname(__file__)
BRAIN_DIR = r"C:\Users\SaiNikhil Gandrakota\.gemini\antigravity-ide\brain\bef9c5e7-688e-4e72-9e5f-991cb3c54311"

TARGET_DIRS = [
    os.path.join(PROJECT_ROOT, "crop_samples"),
    os.path.join(ML_DIR, "crop_samples")
]

CROPS = ["Wheat", "Rice", "Maize", "Sugarcane", "Jute"]

# AI generated samples mapping
AI_SAMPLES = {
    "Wheat": "wheat_crop_sample_1791721837044.jpg",
    "Rice": "rice_crop_sample_1791721860748.jpg",
    "Maize": "maize_crop_sample_1791721914618.jpg",
    "Sugarcane": "sugarcane_crop_sample_1791721887136.jpg",
    "Jute": "jute_crop_sample_1791722742913.jpg"
}

def setup_crop_samples():
    for base in TARGET_DIRS:
        os.makedirs(base, exist_ok=True)
        print(f"\nSetting up samples in {base}:")
        
        for crop in CROPS:
            crop_folder = os.path.join(base, crop)
            os.makedirs(crop_folder, exist_ok=True)
            
            # 1. First image: AI Generated High-Res Crop Image
            ai_img_name = AI_SAMPLES.get(crop)
            if ai_img_name:
                ai_src = os.path.join(BRAIN_DIR, ai_img_name)
                if os.path.exists(ai_src):
                    shutil.copy2(ai_src, os.path.join(crop_folder, f"{crop.lower()}_1_generated.jpg"))
            
            # 2. Add 4 more diverse samples from the crop_dataset
            src_dataset_dir = os.path.join(ML_DIR, "crop_dataset", crop)
            if os.path.exists(src_dataset_dir):
                dataset_files = [f for f in os.listdir(src_dataset_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
                # Pick diverse files across the dataset
                step = max(1, len(dataset_files) // 5)
                selected = [dataset_files[i * step] for i in range(1, 5) if i * step < len(dataset_files)]
                
                for idx, filename in enumerate(selected, start=2):
                    src_file = os.path.join(src_dataset_dir, filename)
                    ext = os.path.splitext(filename)[1].lower()
                    if ext == '.jpeg': ext = '.jpg'
                    dst_file = os.path.join(crop_folder, f"{crop.lower()}_{idx}{ext}")
                    shutil.copy2(src_file, dst_file)
            
            # List contents
            files = os.listdir(crop_folder)
            print(f"  • {crop}/ ({len(files)} images): {files}")

if __name__ == "__main__":
    setup_crop_samples()
