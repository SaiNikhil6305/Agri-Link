import os
import sys
import zipfile
import requests
import xml.etree.ElementTree as ET
from tqdm import tqdm

FIGSHARE_FILE_URL = "https://ndownloader.figshare.com/files/40737164"
ZIP_FILENAME = "maize.zip"
XML_FILENAME = "maize.xml"
OUTPUT_DIR = "maize_defect_dataset"

LABEL_MAP = {
    'NOR': 'Normal',
    'BN': 'Broken',
    'MY': 'Moldy',
    'AP': 'Insect_Damaged',
    'SD': 'Sprouted',
    'HD': 'Heat_Damaged',
    'IM': 'Immature',
    'F&S': 'Stained'
}

def download_file(url, target_path):
    print(f"Connecting to Figshare for {target_path} (6.04 GB)...")
    response = requests.get(url, stream=True, allow_redirects=True)
    response.raise_for_status()
    total_size = int(response.headers.get('content-length', 0))

    initial_pos = 0
    if os.path.exists(target_path):
        initial_pos = os.path.getsize(target_path)
        if initial_pos >= total_size and total_size > 0:
            print(f"File {target_path} already completely downloaded ({total_size / (1024**3):.2f} GB).")
            return

    block_size = 1024 * 1024 * 4 # 4MB buffer
    mode = 'ab' if initial_pos > 0 else 'wb'

    if initial_pos > 0:
        headers = {'Range': f'bytes={initial_pos}-'}
        response = requests.get(url, headers=headers, stream=True, allow_redirects=True)

    with open(target_path, mode) as f, tqdm(
        total=total_size,
        initial=initial_pos,
        unit='B',
        unit_scale=True,
        desc=target_path
    ) as pbar:
        for chunk in response.iter_content(chunk_size=block_size):
            if chunk:
                f.write(chunk)
                pbar.update(len(chunk))

    print(f"\nDownload completed: {target_path}")

def parse_xml_mapping():
    if not os.path.exists(XML_FILENAME):
        print(f"Error: {XML_FILENAME} not found.")
        return {}

    tree = ET.parse(XML_FILENAME)
    root = tree.getroot()
    id_to_class = {}
    for obj in root.findall('object'):
        obj_id = obj.findtext('ID')
        du = obj.findtext('DU_grain')
        if obj_id and du and du in LABEL_MAP:
            id_to_class[obj_id] = LABEL_MAP[du]
    return id_to_class

def extract_and_organize():
    id_to_class = parse_xml_mapping()
    print(f"Parsed {len(id_to_class)} labeled objects from {XML_FILENAME}.")

    for category in set(LABEL_MAP.values()):
        os.makedirs(os.path.join(OUTPUT_DIR, category), exist_ok=True)

    print(f"Extracting images from {ZIP_FILENAME} into categorized defect folders...")
    with zipfile.ZipFile(ZIP_FILENAME, 'r') as zf:
        file_list = zf.namelist()
        print(f"Total files in archive: {len(file_list)}")

        extracted_counts = {cat: 0 for cat in set(LABEL_MAP.values())}

        for file_info in tqdm(file_list, desc="Extracting & Categorizing"):
            name = file_info
            base_name = os.path.basename(name)
            # Remove extension to get ID
            stem, ext = os.path.splitext(base_name)

            if ext.lower() in ['.jpg', '.jpeg', '.png']:
                # Ignore mask images if any (often named *_mask or located in mask directory)
                if 'mask' in name.lower():
                    continue

                category = id_to_class.get(stem)
                if category:
                    dest_path = os.path.join(OUTPUT_DIR, category, base_name)
                    if not os.path.exists(dest_path):
                        with zf.open(file_info) as source, open(dest_path, "wb") as target:
                            target.write(source.read())
                        extracted_counts[category] += 1

    print("\nDataset extraction complete! Categorized counts:")
    for cat, count in extracted_counts.items():
        folder_count = len(os.listdir(os.path.join(OUTPUT_DIR, cat)))
        print(f"  - {cat}: {folder_count} images")

if __name__ == "__main__":
    download_file(FIGSHARE_FILE_URL, ZIP_FILENAME)
    extract_and_organize()
