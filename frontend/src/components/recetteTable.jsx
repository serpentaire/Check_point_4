import React, { useState, useEffect } from "react";
import apiConnexion from "@services/apiConnexion";

function recetteTable() {
  const [recettes, setRecettes] = useState([]);

  const getRecettes = () => {
    apiConnexion
      .get(`/recettes`)
      .then((data) => {
        setRecettes(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getRecettes();
  }, []);

  const sousTotal = () => {
    const ssTotal = recettes.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    return ssTotal;
  };

  return (
    <div className="recetteTable">
      <div className="w-full">
        <table className="table-fixed w-full border-collapse mb-10">
          <thead>
            <tr>
              <th className="text-center ">Déscription</th>
              <th className="text-center">Somme</th>
            </tr>
          </thead>
          <tbody>
            {recettes &&
              recettes.map((recette) => (
                <tr>
                  <td className="text-center border-b-2 hover:text-darkPink text-xs md:text-base lg:text-lg ">
                    {recette.nom}
                  </td>
                  <td className="text-center border-b-2 text-xs md:text-base lg:text-lg text-black">
                    {`${recette.somme} €`}
                  </td>
                </tr>
              ))}
            <h1>Sous total :</h1>
            {sousTotal()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default recetteTable;
