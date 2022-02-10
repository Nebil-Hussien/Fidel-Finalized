import React from "react";
import { Rating as Rate } from "@material-ui/core";

const Rating = ({ value, onChange, readOnly }) => {
  return (
    <div className="rating">
      <Rate
        name="half-rating"
        precision={0.5}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default Rating;
