import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ size, color }) => {
  return (
    <div className="loader">
      <div>
        <CircularProgress className="loader__indicator" />
      </div>
    </div>
  );
};
export default Loader;
