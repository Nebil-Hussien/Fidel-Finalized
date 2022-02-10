import { AccountCircle } from "@material-ui/icons";
import React from "react";

const StudentList = ({ name }) => {
  return (
    <div className="student-list">
      <AccountCircle className="student-list__icon" />
      <p className="paragraph">{name}</p>
    </div>
  );
};

export default StudentList;
