import React from "react";
import Notification from "../Notification/Notification";

const DropDown = ({ open, notifications }) => {
  return (
    <div className={`drop-down ${open ? "open" : "close"}`}>
      <ul className="drop-down__list">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="drop-down__item">
              <Notification
                content={notification.content}
                link={notification.link}
              />
            </li>
          ))
        ) : (
          <li className="drop-down__item">
            <p className="paragraph">No Notifications.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DropDown;
