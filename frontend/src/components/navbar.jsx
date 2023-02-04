import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";
import User from "../context/user";

function navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(User.UserContext);
  const getLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="pb-4 flex justify-between md:justify-start">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <Link to="/recettes">
          <h1 className="p-2">Recettes</h1>
        </Link>
        <Link to="/depenses">
          <h1 className="p-2">Dépenses</h1>
        </Link>
        <h1 className="p-2">Rapport</h1>
        <button className="" type="button" onClick={() => getLogout()}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default navbar;
