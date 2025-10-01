from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

class InputData(BaseModel):
    temparature: float
    humidity: float
    pressure: float
    wind_speed: float

with open('random_forest.pkl', 'rb') as f:
    model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/predict")
async def make_prediction(data: InputData):
    try:
        test_data = np.array([[data.temparature,data.humidity,data.pressure,data.wind_speed]])
        
        prediction = model.predict(test_data)
        
        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def read_root():
    return {"message": "Hello from your machine learning model API!"}
