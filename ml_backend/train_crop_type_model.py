import os
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, RandomFlip, RandomRotation, RandomZoom
from tensorflow.keras.models import Model, Sequential
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

DATASET_DIR = './crop_dataset'
BATCH_SIZE = 32
IMG_SIZE = (224, 224)
EPOCHS = 15

def build_model(num_classes):
    print("Building model using MobileNetV2 base with data augmentation...")
    
    # Data Augmentation layer to help generalization on agricultural photos
    data_augmentation = Sequential([
        RandomFlip("horizontal"),
        RandomRotation(0.15),
        RandomZoom(0.1),
    ], name="data_augmentation")

    # Load pre-trained MobileNetV2 base
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

def train_model():
    if not os.path.exists(DATASET_DIR):
        print(f"Error: Dataset directory '{DATASET_DIR}' not found.")
        return

    print("Loading agricultural crop datasets...")
    train_dataset = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=42,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_dataset = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=42,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_dataset.class_names
    print(f"Classes detected ({len(class_names)}): {class_names}")

    AUTOTUNE = tf.data.AUTOTUNE
    train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
    val_dataset = val_dataset.prefetch(buffer_size=AUTOTUNE)

    model = build_model(len(class_names))

    callbacks = [
        EarlyStopping(patience=4, restore_best_weights=True, monitor='val_accuracy'),
        ModelCheckpoint('best_crop_type_model.keras', save_best_only=True, monitor='val_accuracy')
    ]

    print("\nStarting training process...")
    history = model.fit(
        train_dataset,
        validation_data=val_dataset,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    # Save final model
    model.save('crop_type_model_final.keras')
    print("\nTraining complete! Best model saved to 'best_crop_type_model.keras'.")
    print("Final model saved to 'crop_type_model_final.keras'.")

if __name__ == "__main__":
    train_model()
