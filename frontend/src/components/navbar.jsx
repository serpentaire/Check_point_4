import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";
import apiConnexion from "@services/apiConnexion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "@services/toastiConfig";
import User from "../context/user";

function navbar() {
  const [operations, setOperations] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(User.UserContext);
  const getLogout = () => {
    logout();
    navigate("/");
  };

  const getAllOperations = () => {
    apiConnexion
      .get(`/enregistrements`)
      .then((data) => {
        setOperations(data.data);
      })
      .catch((error) => console.error(error));
  };

  const sendEmail = () => {
    apiConnexion
      .post("/email", operations)
      .then(() => {
        toast.success(`Votre mail a bien été envoyé`, toastiConfig);
      })
      .catch((err) => {
        toast.error(`Votre mail n"a pas été envoyé`, toastiConfig);
        console.warn(err);
      });
  };

  useEffect(() => {
    getAllOperations();
  }, []);

  return (
    <div className="navbar bg-white fixed z-50 sticky top-0">
      <div className="pb-4 flex justify-between md:justify-start font-roboto">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <Link to="/recettes">
          <h1 className="p-2">Recettes</h1>
        </Link>
        <Link to="/depenses">
          <h1 className="p-2">Dépenses</h1>
        </Link>
        <button className="" type="button" onClick={() => sendEmail()}>
          Rapport
        </button>
        <button className="" type="button" onClick={() => getLogout()}>
          Déconnexion
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default navbar;
