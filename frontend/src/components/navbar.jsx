import React from "react";
import logo from "@assets/logo.png";

function navbar() {
  return (
    <div className="navbar">
      <div className="pb-4 flex justify-between md:justify-start">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <h1 className="p-2">Recettes</h1>
        <h1 className="p-2">Dépenses</h1>
        <h1 className="p-2">Rapport du mois</h1>
      </div>
    </div>
  );
}

export default navbar;
