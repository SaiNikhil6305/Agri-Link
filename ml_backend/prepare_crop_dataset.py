import os
import shutil

base_cache = r"C:\Users\SaiNikhil Gandrakota\.cache\kagglehub\datasets\aman2000jaiswal\agriculture-crop-images\versions\12"
target_base = os.path.join(os.path.dirname(__file__), "crop_dataset")

# Standardized class names
classes = ["jute", "maize", "rice", "sugarcane", "wheat"]

for c in classes:
    os.makedirs(os.path.join(target_base, c.capitalize()), exist_ok=True)

source_dirs = [
    os.path.join(base_cache, "crop_images"),
    os.path.join(base_cache, "kag2"),
    os.path.join(base_cache, "some_more_images", "some_more_images")
]

copied_counts = {c.capitalize(): 0 for c in classes}

for src_dir in source_dirs:
    if not os.path.exists(src_dir):
        continue
    for folder in os.listdir(src_dir):
        lower_folder = folder.lower()
        if lower_folder in classes:
            dest_category = lower_folder.capitalize()
            folder_path = os.path.join(src_dir, folder)
            if os.path.isdir(folder_path):
                for filename in os.listdir(folder_path):
                    src_file = os.path.join(folder_path, filename)
                    if os.path.isfile(src_file) and src_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                        # Avoid name collisions
                        dest_file = os.path.join(target_base, dest_category, f"{os.path.basename(src_dir)}_{filename}")
                        if not os.path.exists(dest_file):
                            shutil.copy2(src_file, dest_file)
                            copied_counts[dest_category] += 1

print("Dataset prepared successfully in 'ml_backend/crop_dataset'!")
print("Image counts per class:")
for k, v in copied_counts.items():
    print(f"  - {k}: {len(os.listdir(os.path.join(target_base, k)))} images")
