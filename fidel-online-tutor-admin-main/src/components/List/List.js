import { AccountCircle } from "@mui/icons-material";
import React from "react";

const List = ({ name, trailing }) => {
  return (
    <div className="list">
      <AccountCircle className="list__icon" />
      <p className="paragraph">{name}</p>
      <div className="list__trailing">{trailing}</div>
    </div>
  );
};

export default List;
