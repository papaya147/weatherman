import { Nullable } from "primereact/ts-helpers";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DateForm from "./component/DateForm";
import ScatterGraph from "./component/ScatterGraph";
import { GraphData } from "./model/GraphData";

const SingleGraph = () => {
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

  const { graphField } = useParams();

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
        backButton={true}
        backUrl={"/history?" + queryParams.toString()}
      />
      <ScatterGraph
        start={startDate}
        end={endDate}
        field={graphField as keyof GraphData}
        color="rgba(2, 250, 171, 1)"
        currentParams={queryParams}
      />
    </div>
  );
};

export default SingleGraph;
