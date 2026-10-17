import numpy as np
from PIL import Image

def analyze_crop_quality(img_path, crop_type):
    img = Image.open(img_path).convert('RGB').resize((224, 224))
    arr = np.array(img, dtype=np.float32) / 255.0

    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]

    # Necrosis / dark spot detection (black, charred, dead tissue)
    brightness = (r + g + b) / 3.0
    dark_spots = np.mean(brightness < 0.22) * 100.0

    # Mildew / discoloration / mold detection
    # High color discrepancy with dullness
    gray_diff = np.mean(np.abs(r - g) + np.abs(g - b) + np.abs(r - b))

    # Health & Vigor Index depending on crop type
    # For green vegetative crops (Sugarcane, Jute, early Rice/Maize):
    exg = (2.0 * g - r - b)
    green_health = np.mean(np.maximum(0, exg)) * 100.0

    # For ripe golden grain crops (Wheat, ripe Rice, ripe Maize):
    # Golden ripe color: high R and G, lower B
    ripe_golden = np.mean((r > 0.45) & (g > 0.35) & (b < 0.40) & (r >= g)) * 100.0

    # Defect / Damage penalty
    damage_penalty = (dark_spots * 2.8)

    # Dynamic base score calculation
    if crop_type in ['Wheat', 'Rice']:
        vigor_score = max(green_health * 2.5, ripe_golden * 1.8)
        base_quality = min(98.0, 75.0 + vigor_score * 0.4 - damage_penalty)
    elif crop_type == 'Maize':
        vigor_score = max(green_health * 2.5, ripe_golden * 2.0)
        base_quality = min(98.0, 75.0 + vigor_score * 0.4 - damage_penalty)
    else: # Sugarcane, Jute
        base_quality = min(98.0, 65.0 + green_health * 1.5 - damage_penalty)

    # Check for cracks/fragmentation or severe necrosis
    if dark_spots > 12.0 or gray_diff < 0.08 and brightness.mean() < 0.35:
        base_quality = min(base_quality, 45.0)

    quality_score = float(np.clip(base_quality, 10.0, 99.5))

    if quality_score >= 85.0:
        grade = "Grade A (Premium Quality)"
        status = "Healthy / Prime Harvest"
        advisory = "Excellent grain/crop filling and uniform development. Ready for premium market sale."
    elif quality_score >= 65.0:
        grade = "Grade B (Good / Standard)"
        status = "Good / Moderate Weathering"
        advisory = "Commercial standard grade. Minor weathering observed; suitable for standard processing."
    else:
        grade = "Grade C (Fair / Damaged)"
        status = "High Defect / Stressed"
        advisory = "Noticeable damage, pest infestation, or mold/necrosis. Requires sorting or pesticide/fungicide treatment."

    return {
        'grade': grade,
        'status': status,
        'score': quality_score,
        'dark_spots': dark_spots,
        'advisory': advisory
    }

for sample, crop in [
    ('test_samples/wheat_sample.jpg', 'Wheat'),
    ('test_samples/rice_sample.jpg', 'Rice'),
    ('test_samples/maize_sample.jpg', 'Maize'),
    ('test_samples/sugarcane_sample.jpg', 'Sugarcane'),
    ('test_samples/defective_grain_sample.jpg', 'Maize')
]:
    res = analyze_crop_quality(sample, crop)
    print(f"\n{sample} ({crop}):")
    print(f"  Score: {res['score']:.1f}% -> {res['grade']}")
    print(f"  Status: {res['status']}")
    print(f"  Advisory: {res['advisory']}")
