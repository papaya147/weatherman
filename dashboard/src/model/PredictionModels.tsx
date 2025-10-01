type PredictionReq = {
  temparature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
};

type PredictionRes = {
  prediction: number[];
};

export type { PredictionReq, PredictionRes };
