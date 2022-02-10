import { CircularProgress } from "@material-ui/core";
import React from "react";

const Button = (props) => {
  const { outlined, success, danger } = props;
  return (
    <button
      {...props}
      className={`btn ${outlined && "outlined"} ${success && "success"} ${
        danger && "danger"
      } ${outlined && "outlined"}`}
    >
      {props.loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
