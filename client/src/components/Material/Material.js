import React from "react";
import { DescriptionOutlined } from "@material-ui/icons/";
import { isTutor } from "../../utils/token";

const Material = ({ title, onDownload, downloadPercentage }) => {
  return (
    <div className="material">
      <div className="material__box">
        <DescriptionOutlined className="material__icon" />
      </div>
      <p className="paragraph">{title}</p>
      {!isTutor && (
        <p onClick={onDownload} className="paragraph link">
          Download {downloadPercentage}
        </p>
      )}
    </div>
  );
};

export default Material;
