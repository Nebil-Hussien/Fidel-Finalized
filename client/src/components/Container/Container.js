import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={className} style={{ padding: "0 4rem" }}>
      {children}
    </div>
  );
};

export default Container;
