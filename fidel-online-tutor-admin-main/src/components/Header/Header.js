import { PowerSettingsNew } from "@mui/icons-material";
import React from "react";
import Logo from "../Logo/Logo";
import Cookies from "universal-cookie";

const Header = () => {
  const logout = () => {
    const cookie = new Cookies();
    cookie.remove("_adminIdToken", { path: "/" });
    cookie.remove("_admin-data", { path: "/" });
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Logo />
        <h2 className="heading-secondary">Administrator</h2>
      </div>
      <nav className="header__nav">
        <ul className="header__nav__list">
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
