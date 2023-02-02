import React from "react";
import logo from "@assets/logo.png";

function footer() {
  return (
    <div className="footer ">
      <div className="pb-4 flex justify-center">
        <img src={logo} alt="logo" className="w-5 h-5 text-center" />
        <p className="pl-2">Copyright - 2023 - Tous droits réservés</p>
      </div>
    </div>
  );
}

export default footer;
