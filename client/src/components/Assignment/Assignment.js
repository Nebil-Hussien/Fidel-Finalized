import React from "react";
import { AssignmentOutlined } from "@material-ui/icons/";
import { isTutor } from "../../utils/token";

const Assignment = ({ title, onDownload }) => {
  return (
    <div className="assignment">
      <div className="assignment__box">
        <AssignmentOutlined className="assignment__icon" />
      </div>
      <p className="paragraph">{title}</p>
      {!isTutor && (
        <p onClick={onDownload} className="paragraph link">
          Download
        </p>
      )}
    </div>
  );
};

export default Assignment;
