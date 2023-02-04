import React, { useState, useEffect, useContext } from "react";
import RecetteTable from "@components/recetteTable";
import apiConnexion from "@services/apiConnexion";
import SelectComptesHome from "@components/selectCompteHome";
import ConnexionModal from "@components/ConnexionModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "@services/toastiConfig";
import User from "../context/user";

export default function Home() {
  const { user } = useContext(User.UserContext);

  const [connexionModalIsVisible, setConnexionModalIsVisible] = useState(!user);

  const [depenses, setDepenses] = useState([]);
  const [recettes, setRecettes] = useState([]);
  const [comptes, setComptes] = useState([]);
  const [oneCompte, setOneCompte] = useState();
  const [oneCompteSelected, setOneCompteSelected] = useState([]);

  const handleOnCloseConnexionModal = () => {
    setConnexionModalIsVisible(false);
  };

  const selectComptes = (id) => {
    setOneCompte(id);
  };

  const getRecettes = () => {
    apiConnexion
      .get(`/recettes`)
      .then((data) => {
        setRecettes(data.data);
      })
      .catch((error) => console.error(error));
  };

  const getDepenses = () => {
    apiConnexion
      .get(`/depenses`)
      .then((data) => {
        setDepenses(data.data);
      })
      .catch((error) => console.error(error));
  };

  const getComptes = () => {
    apiConnexion
      .get(`/comptes`)
      .then((data) => {
        const result = data.data.filter((num) => num.id !== 9);
        setComptes(result);
      })
      .catch((error) => console.error(error));
  };

  const getOneCompte = () => {
    apiConnexion
      .get(`/compte/${oneCompte}/enregistrements`)
      .then((data) => {
        setOneCompteSelected(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getRecettes();
    getDepenses();
    getComptes();
  }, []);

  useEffect(() => {
    if (oneCompte) {
      getOneCompte();
    }
  }, [oneCompte]);

  const Total = () => {
    let ssTotalDepenses = depenses.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    ssTotalDepenses = ssTotalDepenses.toFixed(2);
    let ssTotalRecettes = recettes.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    ssTotalRecettes = ssTotalRecettes.toFixed(2);
    return (ssTotalRecettes - ssTotalDepenses).toFixed(2);
  };

  const TotalCompte = () => {
    let ssTotalDepenses = oneCompteSelected
      .filter((num) => num.type_id === 1)
      .reduce((acc, currentValue) => {
        return acc + parseFloat(currentValue.somme, 10);
      }, 0);
    ssTotalDepenses = ssTotalDepenses.toFixed(2);
    let ssTotalRecettes = oneCompteSelected
      .filter((num) => num.type_id === 2)
      .reduce((acc, currentValue) => {
        return acc + parseFloat(currentValue.somme, 10);
      }, 0);
    ssTotalRecettes = ssTotalRecettes.toFixed(2);
    return (ssTotalRecettes - ssTotalDepenses).toFixed(2);
  };

  let couleurTotal = "";
  if (Total() < 0) {
    couleurTotal = "text-red";
    toast.error("Attention vous êtes à découvert", toastiConfig);
  } else {
    couleurTotal = "text-black";
  }

  let couleurTotalCompte = "";
  if (TotalCompte() < 0) {
    couleurTotalCompte = "text-red";
  } else {
    couleurTotalCompte = "text-black";
  }

  return (
    <div className="font-roboto">
      <h1 className="text-center">
        Voici votre situation comptable pour ce mois ci :
      </h1>
      <div className="md:pl-12 xl:pl-64 xl:w-full">
        <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-center justify-items-center justify-center mt-6 mx-14">
          <h1>Recettes :</h1>
          {recettes && <RecetteTable operations={recettes} />}
        </div>
        <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-center justify-items-center justify-center  mx-14">
          <h1>Dépenses :</h1>
          {depenses && <RecetteTable operations={depenses} />}
        </div>
        <div className="flex flex-col text-xl md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-center justify-items-center justify-center mb-5 mx-14">
          <h1>Solde :</h1>
          <div className={`${couleurTotal}`}>{recettes && `${Total()} €`}</div>
        </div>
      </div>
      <h1 className="md:text-center">Etat par compte :</h1>
      <SelectComptesHome selectComptes={selectComptes} comptes={comptes} />
      {oneCompteSelected !== 0 && (
        <div>
          <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mt-6 mx-14">
            <h1>Recettes :</h1>
            {oneCompteSelected && (
              <RecetteTable
                operations={oneCompteSelected.filter(
                  (num) => num.type_id === 2
                )}
              />
            )}
          </div>
          <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center  mx-14">
            <h1>Dépenses :</h1>
            {oneCompteSelected && (
              <RecetteTable
                operations={oneCompteSelected.filter(
                  (num) => num.type_id === 1
                )}
              />
            )}
          </div>
          <div className="flex flex-col text-xl md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mb-5 mx-14">
            <h1>Solde du compte :</h1>
            <div className={`${couleurTotalCompte}`}>
              {recettes && `${TotalCompte()} €`}
            </div>
          </div>
        </div>
      )}
      <ConnexionModal
        visible={connexionModalIsVisible}
        onclose={handleOnCloseConnexionModal}
      />
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
