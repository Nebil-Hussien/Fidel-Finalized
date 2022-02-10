import React from "react";

const Popup = ({ open, close, children }) => {
  return (
    <>
      <div
        onClick={close}
        className={`popup__backdrop ${open && "open"}`}
      ></div>
      <div className={`popup  ${open && "open"}`}>{children}</div>
    </>
  );
};

export default Popup;
