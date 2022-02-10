import React from "react";
import LogoImage from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img className="logo__image" src={LogoImage} alt="Fidel Logo" />
    </Link>
  );
};

export default Logo;
