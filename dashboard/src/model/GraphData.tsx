type GraphData = {
  millis: number;
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  pressure: number;
  water_amount: number;
};

type graphPoint = {
  x: number;
  y: number;
};

const getGraphDataToPlot = <K extends keyof GraphData>(
  graphData: GraphData[],
  field: K
): graphPoint[] => {
  return graphData.map((data) => {
    return {
      x: data.millis,
      y: data[field],
    };
  });
};

export type { GraphData };
export { getGraphDataToPlot };
