import React from "react";
import { useHistory } from "react-router-dom";

const Course = ({ title, courseData }) => {
  const history = useHistory();
  return (
    <div>
      <div className="course">
        <div className="course__top"></div>
        <div className="course__content">
          <p className="paragraph">{title}</p>
        </div>
        <p
          onClick={() =>
            history.push(`/confirm-payment/students/${courseData._id}`)
          }
          className="paragraph link"
        >
          View Student List
        </p>
      </div>
    </div>
  );
};

export default Course;
