import React from "react";

const Message = ({ variant, children }) => {
  return <div className={`message message-${variant}`}>{children}</div>;
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;
