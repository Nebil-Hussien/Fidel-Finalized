import {
  AccountCircle,
  Notifications,
  PowerSettingsNew,
} from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "../DropDown/DropDown";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { useDetectClickOutside } from "react-detect-click-outside";
import Cookies from "universal-cookie";
import { isTutor } from "../../utils/token";
import { Badge } from "@material-ui/core";
import socketIOClient from "socket.io-client";

const Header = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const logout = () => {
    const cookie = new Cookies();
    if (isTutor) {
      cookie.remove("_tutorIdToken", { path: "/" });
      cookie.remove("_tutor-data", { path: "/" });
      cookie.remove("_role", { path: "/" });
    } else {
      cookie.remove("_idToken", { path: "/" });
      cookie.remove("_user-data", { path: "/" });
    }
    window.location.reload();
  };

  const dropDownref = useDetectClickOutside({
    onTriggered: () => setOpenDropDown(false),
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIOClient("http://192.168.1.3:3000/");
    socket.on("new_class", (classRoom) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          content: "New Class Created",
          link: classRoom.link,
        },
      ]);
    });
    return () => socket.disconnect();
  }, []);
  const search = useMemo(() => {
    return <Search />;
  }, []);

  const dropdown = useMemo(() => {
    return <DropDown notifications={notifications} open={openDropDown} />;
  }, [notifications, openDropDown]);
  return (
    <header className="header">
      <Logo />
      {search}
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li
            onClick={() => setOpenDropDown((prev) => !prev)}
            ref={dropDownref}
            className={`header__nav__item ${openDropDown && "active"}`}
          >
            <Badge
              invisible={notifications.length === 0}
              badgeContent={notifications.length}
              color="error"
            >
              <Notifications className="header__nav__item icon" />
            </Badge>
            <span>Notification</span>
            <div>{dropdown}</div>
          </li>
          <li className="header__nav__item">
            <Link to="/profile" className="header__nav__item">
              <AccountCircle className="header__nav__item icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={logout} className="header__nav__item">
            <PowerSettingsNew className="header__nav__item icon" />
            <span>Logout</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
