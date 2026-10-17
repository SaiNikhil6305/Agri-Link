import os
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

# Configuration
# The datasets should be merged into a single 'dataset' folder
# with subfolders for each quality grade: 'Premium', 'Good', 'Fair'
DATASET_DIR = './dataset' 
BATCH_SIZE = 32
IMG_SIZE = (224, 224)
EPOCHS = 20

def build_model(num_classes):
    print("Building model using MobileNetV2 base (Transfer Learning)...")
    # Load MobileNetV2 without the top classification layer
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    # Freeze the base model layers to prevent destroying pre-trained weights
    base_model.trainable = False

    # Add our custom classification layers on top
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    predictions = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)
    
    model.compile(optimizer=Adam(learning_rate=0.001), 
                  loss='sparse_categorical_crossentropy', 
                  metrics=['accuracy'])
    return model

def train_model():
    if not os.path.exists(DATASET_DIR):
        print(f"Error: Dataset directory '{DATASET_DIR}' not found.")
        print("Please download the Kaggle datasets, extract them, and place them in 'ml_backend/dataset/'")
        print("Folder structure should be:")
        print("dataset/")
        print(" ├── Premium/ (healthy crop images)")
        print(" ├── Good/ (average crop images)")
        print(" └── Fair/ (diseased/damaged crop images)")
        return

    print("Loading image datasets...")
    # Load training data
    train_dataset = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    # Load validation data
    val_dataset = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_dataset.class_names
    print(f"Classes detected: {class_names}")

    # Optimize datasets for performance during training
    AUTOTUNE = tf.data.AUTOTUNE
    train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
    val_dataset = val_dataset.prefetch(buffer_size=AUTOTUNE)

    # Build and train model
    model = build_model(len(class_names))
    
    # Callbacks to stop early if it's not improving, and save the best model
    callbacks = [
        EarlyStopping(patience=3, restore_best_weights=True),
        ModelCheckpoint('best_crop_model.keras', save_best_only=True)
    ]

    print("Starting training process...")
    history = model.fit(
        train_dataset,
        validation_data=val_dataset,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    # Save final model
    model.save('crop_quality_model_final.keras')
    print("Training complete! Model saved to 'crop_quality_model_final.keras'.")

if __name__ == "__main__":
    train_model()
