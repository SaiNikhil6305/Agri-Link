import os
import shutil
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, RandomFlip, RandomRotation, RandomZoom
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

SOURCE_DIR = './maize_defect_dataset'
BALANCED_DIR = './maize_defect_balanced'
BATCH_SIZE = 32
IMG_SIZE = (224, 224)
EPOCHS = 10
SAMPLES_PER_CLASS = 250

def prepare_balanced_subset():
    os.makedirs(BALANCED_DIR, exist_ok=True)
    classes = [d for d in os.listdir(SOURCE_DIR) if os.path.isdir(os.path.join(SOURCE_DIR, d))]
    print(f"Preparing balanced subset ({SAMPLES_PER_CLASS} images/class) across {len(classes)} classes...")
    
    for c in classes:
        src_c = os.path.join(SOURCE_DIR, c)
        dst_c = os.path.join(BALANCED_DIR, c)
        os.makedirs(dst_c, exist_ok=True)
        
        all_imgs = [f for f in os.listdir(src_c) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        selected = all_imgs[:SAMPLES_PER_CLASS]
        
        for f in selected:
            dst_file = os.path.join(dst_c, f)
            if not os.path.exists(dst_file):
                shutil.copy2(os.path.join(src_c, f), dst_file)
        
        print(f"  {c}: {len(os.listdir(dst_c))} images")

def build_model(num_classes):
    data_augmentation = Sequential([
        RandomFlip("horizontal_and_vertical"),
        RandomRotation(0.15),
        RandomZoom(0.1),
    ])

    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False

    inputs = tf.keras.Input(shape=(224, 224, 3))
    x = data_augmentation(inputs)
    x = tf.keras.applications.mobilenet_v2.preprocess_input(x)
    x = base_model(x, training=False)
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.4)(x)
    outputs = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=inputs, outputs=outputs)
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def main():
    prepare_balanced_subset()

    print("\nLoading balanced training data...")
    train_dataset = tf.keras.utils.image_dataset_from_directory(
        BALANCED_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_dataset = tf.keras.utils.image_dataset_from_directory(
        BALANCED_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_dataset.class_names
    print(f"Classes: {class_names}")

    AUTOTUNE = tf.data.AUTOTUNE
    train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
    val_dataset = val_dataset.prefetch(buffer_size=AUTOTUNE)

    model = build_model(len(class_names))

    callbacks = [
        EarlyStopping(patience=3, restore_best_weights=True, monitor='val_accuracy'),
        ModelCheckpoint('best_maize_defect_model.keras', save_best_only=True, monitor='val_accuracy')
    ]

    print("\nStarting training...")
    model.fit(
        train_dataset,
        validation_data=val_dataset,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    model.save('maize_defect_model_final.keras')
    print("Training finished! Saved to best_maize_defect_model.keras")

if __name__ == "__main__":
    main()
