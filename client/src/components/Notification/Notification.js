import { Avatar } from "@material-ui/core";
import React from "react";
import Button from "../Button/Button";

const Notification = ({ content, link }) => {
  return (
    <div className="notification">
      <div>
        <Avatar>T</Avatar>
        <p className="notification__content">
          {content}.{" "}
          {link && (
            <>
              <br />
              <a href={link} target="_blank" rel="noreferrer">
                Click Here
              </a>
            </>
          )}
        </p>
      </div>
      <Button>Ok</Button>
    </div>
  );
};

export default Notification;
