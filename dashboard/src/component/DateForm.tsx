import React from "react";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { useNavigate } from "react-router-dom";

interface Props {
  start: Nullable<Date>;
  setStart: React.Dispatch<React.SetStateAction<Nullable<Date>>>;
  end: Nullable<Date>;
  setEnd: React.Dispatch<React.SetStateAction<Nullable<Date>>>;
  backButton: boolean;
  backUrl?: string;
}

const DateForm: React.FC<Props> = ({
  start,
  setStart,
  end,
  setEnd,
  backButton,
  backUrl,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <h2>Select Date Range</h2>
        {backButton && backUrl && (
          <button className="right" onClick={() => navigate(backUrl)}>
            Go Back
          </button>
        )}
      </div>
      <div className="form">
        <div className="form-field">
          <label>Start</label>
          <Calendar value={start} onChange={(e) => setStart(e.value)} />
        </div>
        <div className="form-field">
          <label>End</label>
          <Calendar value={end} onChange={(e) => setEnd(e.value)} />
        </div>
      </div>
    </div>
  );
};

export default DateForm;
