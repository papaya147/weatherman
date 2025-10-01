type MeanData = {
  daily_mean: Mean;
  monthly_mean: Mean;
  weekly_mean: Mean;
  yearly_mean: Mean;
};

type Mean = {
  mean_humidity: number;
  mean_pressure: number;
  mean_temperature: number;
  mean_water_amount: number;
  mean_wind_direction: number;
  mean_wind_speed: number;
};

export default MeanData;
