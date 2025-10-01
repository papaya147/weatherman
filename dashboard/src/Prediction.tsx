import MeanData from "./model/MeanData";
import useFetch from "./useFetch";
import usePost from "./usePost";
import coalesce from "./coalesce";
import { PredictionReq, PredictionRes } from "./model/PredictionModels";

const Prediction = () => {
  const {
    data: mean,
    isLoading: il1,
    error: err1,
  } = useFetch<MeanData>("http://localhost:8080/data/mean");

  const predReq: PredictionReq = {
    temparature: coalesce(0, mean?.daily_mean.mean_temperature),
    humidity: coalesce(0, mean?.daily_mean.mean_humidity),
    pressure: coalesce(0, mean?.daily_mean.mean_pressure),
    wind_speed: coalesce(0, mean?.daily_mean.mean_wind_speed),
  };

  const {
    data: prediction,
    isLoading: il2,
    error: err2,
  } = usePost<PredictionRes>("http://localhost:5000/predict", predReq);

  return (
    <div className="prediction-content">
      {il1 && <p>Loading...</p>}
      {il2 && <p>Loading...</p>}
      {err1 && <p>Error: {err1.message}</p>}
      {err2 && <p>Error: {err2.message}</p>}
      {prediction && (
        <p>
          Prediction for water is {prediction.prediction[0].toFixed(2)}{" "}
          millimeters.
        </p>
      )}
    </div>
  );
};

export default Prediction;
