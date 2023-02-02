import React, { useState, useEffect } from "react";
import apiConnexion from "@services/apiConnexion";

function depensesTable() {
  const [depensess, setdepensess] = useState([]);

  const getdepensess = () => {
    apiConnexion
      .get(`/depenses`)
      .then((data) => {
        setdepensess(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getdepensess();
  }, []);

  const sousTotal = () => {
    const ssTotal = depensess.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    return ssTotal.toFixed(2);
  };

  return (
    <div className="depensesTable">
      <div className="w-full">
        <table className="table-fixed w-full border-collapse mb-10">
          <thead>
            <tr>
              <th className="text-center ">Déscription</th>
              <th className="text-center">Somme</th>
            </tr>
          </thead>
          <tbody>
            {depensess &&
              depensess.map((depenses) => (
                <tr>
                  <td className="text-center border-b-2 hover:text-darkPink text-xs md:text-base lg:text-lg ">
                    {depenses.nom}
                  </td>
                  <td className="text-center border-b-2 text-xs md:text-base lg:text-lg text-black">
                    {`${depenses.somme} €`}
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

export default depensesTable;
