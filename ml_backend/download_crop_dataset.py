import os
import shutil
import kagglehub

print("Downloading 'aman2000jaiswal/agriculture-crop-images'...")
path = kagglehub.dataset_download("aman2000jaiswal/agriculture-crop-images")
print("Path to dataset files:", path)

# Inspect the directory structure
print("\nInspecting contents:")
for item in os.listdir(path):
    item_path = os.path.join(path, item)
    if os.path.isdir(item_path):
        print(f"Folder: {item} (contains {len(os.listdir(item_path))} items)")
    else:
        print(f"File: {item}")
