import kagglehub
import os
import shutil

print("Downloading dataset...")
path = kagglehub.dataset_download("muratkokludataset/rice-image-dataset")

print("Copying dataset to local folder (this may take a minute)...")
os.makedirs('./dataset', exist_ok=True)

for folder in ['Arborio', 'Basmati', 'Ipsala', 'Jasmine', 'Karacadag']:
    src = os.path.join(path, 'Rice_Image_Dataset', folder)
    dst = f'./dataset/{folder}'

    # Check if we already copied it so we don't do it twice
    if not os.path.exists(dst):
        shutil.copytree(src, dst)

print("Dataset ready in ./dataset!")
