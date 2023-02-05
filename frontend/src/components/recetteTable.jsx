import React from "react";
import icone from "@assets/PDF_24287.png";

function recetteTable({ operations }) {
  const sousTotal = () => {
    const ssTotal = operations.reduce((acc, currentValue) => {
      return acc + parseFloat(currentValue.somme, 10);
    }, 0);
    return ssTotal.toFixed(2);
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
            {operations &&
              operations.map((recette) => (
                <tr key={recette.id}>
                  <td className="text-center  text-xs md:text-base lg:text-lg ">
                    {recette.nom}
                  </td>
                  <td className="text-center text-xs md:text-base lg:text-lg text-black">
                    {`${recette.somme} €`}
                  </td>
                  <td className="text-center text-xs md:text-base lg:text-lg text-black">
                    {recette.facture !== "assets/images/favicon.png" && (
                      <button type="button" className="">
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/${
                            recette.facture
                          }`}
                          download
                        >
                          <img src={icone} alt="icone" className="w-9 h-9" />
                        </a>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            <tr>
              <td className="text-center border-t-2  text-xs md:text-base lg:text-lg ">
                Sous total :
              </td>
              <td className="text-center border-t-2 text-xs md:text-base lg:text-lg text-black">
                {operations && `${sousTotal()} €`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default recetteTable;
