from fastapi import FastAPI, UploadFile, File
from bson.binary import Binary
import pymongo
import numpy as np
from PIL import Image
import io
import tensorflow as tf 
from dotenv import load_dotenv
import os
from tensorflow import keras

app = FastAPI()

load_dotenv() #load environment variables from .env file

db_url = os.getenv("DB_URL")

# Load the VGGFace model
model = tf.keras.applications.VGG16(
    include_top=True,
    weights="imagenet",
    input_tensor=None,
    input_shape=None,
    pooling=None,
    classes=1000,
    classifier_activation="softmax",
)

# Create a MongoDB client and connect to the cluster
client = pymongo.MongoClient(db_url)

# Get a reference to the database and collection
db = client['authDB']
collection = db['missingFeatures']

# Define a function to extract the feature vector from an image
def extract_features(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((224, 224))
    image_array = np.array(image)
    image_array = preprocess_input(image_array, version=2)
    feature_vector = model.predict(np.expand_dims(image_array, axis=0))
    return feature_vector.flatten()

# Define the API endpoint
@app.post("/search_image/")
async def search_image(image_file: UploadFile = File(...)):
    image_bytes = await image_file.read()
    query_feature_vector = extract_features(image_bytes)
    cursor = collection.find({})
    for document in cursor:
        db_feature_vector = document['feature_vector']
        similarity = np.dot(db_feature_vector, query_feature_vector) / (np.linalg.norm(db_feature_vector) * np.linalg.norm(query_feature_vector))
        if similarity > 0.8:
            return {"result": "found"}
    return {"result": "not found"}

# Print the "connected" message
print("Successfully connected to MongoDB Atlas")

@app.post("/extract_feature_vector")
async def extract_feature_vector(image_file: UploadFile = File(...)):
    image_bytes = await image_file.read()
    query_feature_vector = extract_features(image_bytes)
    return {"Feature Vector":query_feature_vector}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
