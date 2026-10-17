import os

base_path = r"C:\Users\SaiNikhil Gandrakota\.cache\kagglehub\datasets\aman2000jaiswal\agriculture-crop-images\versions\12"

print("--- crop_images ---")
crop_images_path = os.path.join(base_path, "crop_images")
if os.path.exists(crop_images_path):
    for item in os.listdir(crop_images_path):
        sub = os.path.join(crop_images_path, item)
        count = len(os.listdir(sub)) if os.path.isdir(sub) else 1
        print(f"  {item}: {count} items")

print("\n--- kag2 ---")
kag2_path = os.path.join(base_path, "kag2")
if os.path.exists(kag2_path):
    for item in os.listdir(kag2_path):
        sub = os.path.join(kag2_path, item)
        count = len(os.listdir(sub)) if os.path.isdir(sub) else 1
        print(f"  {item}: {count} items")

print("\n--- Crop_details.csv preview ---")
csv_path = os.path.join(base_path, "Crop_details.csv")
if os.path.exists(csv_path):
    with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
        for i in range(10):
            line = f.readline()
            if not line: break
            print(" ", line.strip())
