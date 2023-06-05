import React from "react";
import logo from "../images/logo.svg";
import NavBar from "./NavBar.js";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого Место" />
      <NavBar email={email} onLogout={onLogout} />
    </header>
  );
}

export default Header;
