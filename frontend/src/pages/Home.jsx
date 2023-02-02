import React, { useState, useEffect } from "react";
import RecetteTable from "@components/recetteTable";
import apiConnexion from "@services/apiConnexion";

export default function Home() {
  const [depenses, setDepenses] = useState();
  const [recettes, setRecettes] = useState();

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

  useEffect(() => {
    getRecettes();
    getDepenses();
  }, []);

  const Total = () => {
    let ssTotalDepenses = depenses.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    ssTotalDepenses = ssTotalDepenses.toFixed(2);
    let ssTotalRecettes = recettes.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    ssTotalRecettes = ssTotalRecettes.toFixed(2);
    return ssTotalRecettes - ssTotalDepenses;
  };

  return (
    <div>
      <h1>Voici votre situation comptable :</h1>
      <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mb-5 mx-14">
        <h1>Recettes :</h1>
        {recettes && <RecetteTable operations={recettes} />}
      </div>
      <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mb-5 mx-14">
        <h1>Dépenses :</h1>
        {depenses && <RecetteTable operations={depenses} />}
      </div>
      <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mb-5 mx-14">
        <h1>Solde :</h1>
        {recettes && `${Total()} €`}
      </div>
      <h1>Etat par compte :</h1>
    </div>
  );
}
