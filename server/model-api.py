from fastapi import FastAPI, UploadFile, File , Request , Header
from bson.binary import Binary
import pymongo
import numpy as np
from PIL import Image
import io
import tensorflow as tf 
from dotenv import load_dotenv
import os
from tensorflow import keras
from bson.objectid import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.resnet50 import preprocess_input
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


app = FastAPI()



# Add CORS middleware to app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
collection_missing = db['missingFeatures']
collection_sighted = db['sightedFeatures']

# Define a function to extract the feature vector from an image
def extract_features(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((224, 224))
    image_array = np.array(image)
    image_array = preprocess_input(image_array)
    feature_vector = model.predict(np.expand_dims(image_array, axis=0))
    return feature_vector.flatten()

# Define the API endpoint
@app.post("/search_image/{sightedChildId}")
async def search_image(sightedChildId: str):
    # get feature vector from sightedFeatures collection
    document = collection_sighted.find_one({"_id": ObjectId(sightedChildId)})
    if document is None:
        return {"result": "not found"}
    
    query_feature_vector = document["feature_vector"]
    cursor = collection_missing.find({})
    for document in cursor:
        db_feature_vector = document["feature_vector"]
        similarity = np.dot(db_feature_vector, query_feature_vector) / (np.linalg.norm(db_feature_vector) * np.linalg.norm(query_feature_vector))
        if similarity > 0.8:
            return {"result": "found"}

    return {"result": "not found"}





# Print the "connected" message
print("Successfully connected to MongoDB Atlas")

@app.post("/extract_feature_vector/{child_id}")
async def extract_feature_vector(child_id: str):
    # Get a reference to the database and collection
    db = client['authDB']
    collection = db['missingchildren']
    # Convert the child_id string to a BSON object
    bson_child_id = ObjectId(child_id)
    
    # Search for the child ID in the database and retrieve the image
    child = collection.find_one({'_id': bson_child_id})
    if child is None:
        return {'error': 'Child ID not found'}
    
    # Extract the image binary data and extract features
    image_bytes = child['img']['data']
    query_feature_vector = extract_features(image_bytes)
    my_object = {'FeatureVector': query_feature_vector.tolist()}
    encoded_object = jsonable_encoder(my_object)
    
    return encoded_object

#extract feature vectors from sighted children
@app.post("/extract_feature_vector_sighted/{child_id}")
async def extract_feature_vector(child_id: str):
    # Get a reference to the database and collection
    db = client['authDB']
    collection = db['sightedchildren']
    # Convert the child_id string to a BSON object
    bson_child_id = ObjectId(child_id)
    
    # Search for the child ID in the database and retrieve the image
    child = collection.find_one({'_id': bson_child_id})
    if child is None:
        return {'error': 'Child ID not found'}
    
    # Extract the image binary data and extract features
    image_bytes = child['img']['data']
    query_feature_vector = extract_features(image_bytes)
    my_object = {'FeatureVector': query_feature_vector.tolist()}
    encoded_object = jsonable_encoder(my_object)
    
    return encoded_object

# store missing children feature vector
@app.post("/store_feature_vector/{missing_child_id}")
async def store_feature_vector(missing_child_id: str, feature_vector: dict):
    feature_vector_data = feature_vector['feature_vector']['data']
    collection_missing.insert_one({'missing_child_id': missing_child_id, 'feature_vector': feature_vector_data})
    print(feature_vector_data)
    my_object = {"message": "Feature vector stored successfully"}
    encoded_object = jsonable_encoder(my_object)


    # Return a success message as a response with headers
    return JSONResponse(content=encoded_object)

#store sighted children feature vector
@app.post("/store_feature_vector_sighted/{sighted_child_id}")
async def store_feature_vector(sighted_child_id: str, feature_vector: dict):
    feature_vector_data = feature_vector['feature_vector']['data']
    collection_sighted.insert_one({'sighted_child_id': sighted_child_id, 'feature_vector': feature_vector_data})
    print(feature_vector_data)
    my_object = {"message": "Feature vector stored successfully"}
    encoded_object = jsonable_encoder(my_object)


    # Return a success message as a response with headers
    return JSONResponse(content=encoded_object)





if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
