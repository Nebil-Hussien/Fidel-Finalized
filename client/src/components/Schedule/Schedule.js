import { CalendarToday } from "@material-ui/icons";
import React from "react";

const Schedule = ({ title, date }) => {
  return (
    <div className="schedule">
      <CalendarToday className="schedule__icon" />
      <p className="paragraph">
        {title}, {date}
      </p>
    </div>
  );
};

export default Schedule;
