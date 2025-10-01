import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import DateForm from "./component/DateForm";
import ScatterGraph from "./component/ScatterGraph";
import { useLocation, useNavigate } from "react-router-dom";

const History = () => {
  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);

  const startParam = queryParams.get("start");
  const endParam = queryParams.get("end");

  const [startDate, setStartDate] = useState<Nullable<Date>>(
    startParam ? new Date(parseInt(startParam)) : null
  );
  const [endDate, setEndDate] = useState<Nullable<Date>>(
    endParam ? new Date(parseInt(endParam)) : null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (startDate?.getTime())
      searchParams.set("start", startDate.getTime().toString());
    if (endDate?.getTime())
      searchParams.set("end", endDate.getTime().toString());

    navigate({
      search: searchParams.toString(),
    });
  }, [startDate, endDate, navigate]);

  return (
    <div className="history-content">
      <DateForm
        start={startDate}
        setStart={setStartDate}
        end={endDate}
        setEnd={setEndDate}
        backButton={false}
      />
      <div className="graph-view">
        <ScatterGraph
          start={startDate}
          end={endDate}
          field="temperature"
          color="rgba(255, 99, 132, 1)"
          currentParams={queryParams}
        />
        <ScatterGraph
          start={startDate}
          end={endDate}
          field="humidity"
          color="rgba(3, 69, 252, 1)"
          currentParams={queryParams}
        />
      </div>
      <div className="graph-view">
        <ScatterGraph
          start={startDate}
          end={endDate}
          field="wind_speed"
          color="rgba(5, 173, 8, 1)"
          currentParams={queryParams}
        />
        <ScatterGraph
          start={startDate}
          end={endDate}
          field="wind_direction"
          color="rgba(250, 147, 2, 1)"
          currentParams={queryParams}
        />
      </div>
      <div className="graph-view">
        <ScatterGraph
          start={startDate}
          end={endDate}
          field="pressure"
          color="rgba(176, 2, 250, 1)"
          currentParams={queryParams}
        />
        <ScatterGraph
          start={startDate}
          end={endDate}
          field="water_amount"
          color="rgba(2, 250, 171, 1)"
          currentParams={queryParams}
        />
      </div>
    </div>
  );
};

export default History;
