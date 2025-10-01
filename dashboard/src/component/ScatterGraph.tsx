import { Nullable } from "primereact/ts-helpers";
import { GraphData, getGraphDataToPlot } from "../model/GraphData";
import useFetch from "../useFetch";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  scales: {
    x: {
      ticks: {
        display: false,
      },
    },
  },
};

let graphData = {
  datasets: [
    {
      label: "Dataset",
      data: Array.from({ length: 1 }, () => ({
        x: 0,
        y: 0,
      })),
      backgroundColor: "",
    },
  ],
};

interface Props {
  start: Nullable<Date>;
  end: Nullable<Date>;
  field: keyof GraphData;
  color: string;
  currentParams: URLSearchParams;
}

const ScatterGraph: React.FC<Props> = ({
  start,
  end,
  field,
  color,
  currentParams,
}) => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch<GraphData[]>(
    "http://localhost:8080/data/data?start=" +
      (start ? start?.getTime() : 0) +
      "&end=" +
      (end ? end?.getTime() : 0)
  );

  if (data) {
    graphData = {
      datasets: [
        {
          label: field,
          data: getGraphDataToPlot(data, field),
          backgroundColor: color,
        },
      ],
    };
  }

  return (
    <div
      className="graph"
      onClick={() =>
        navigate(field + "?" + currentParams.toString(), { replace: true })
      }
    >
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && <Scatter options={options} data={graphData} />}
    </div>
  );
};

export default ScatterGraph;
