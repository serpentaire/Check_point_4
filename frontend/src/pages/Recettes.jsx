import React, { useState, useEffect } from "react";
import SelectComptesHome from "@components/selectCompteHome";
import apiConnexion from "@services/apiConnexion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "@services/toastiConfig";
import SuppressTable from "@components/suppressTable";
import UpdateTable from "@components/updateTable";

function Recettes() {
  const [recettes, setRecettes] = useState([]);
  const [comptes, setComptes] = useState([]);
  const [oneCompte, setOneCompte] = useState();
  const [setOneCompteSelected] = useState([]);
  const recetteType = {
    nom: "",
    somme: 0,
    facture: "Null",
    N_comptes_id: 0,
    type_id: 2,
  };

  const [recette, setRecette] = useState(recetteType);

  const selectComptes = (id) => {
    setOneCompte(id);
  };

  const handleRecette = (place, value) => {
    const newRecette = { ...recette };
    newRecette[place] = value;
    setRecette(newRecette);
  };

  const saveRecette = (e) => {
    e.preventDefault();

    const newRecette = { ...recette, N_comptes_id: oneCompte };
    apiConnexion
      .post("/enregistrements", newRecette)
      .then(() => {
        toast.success(`Votre recette a bien été enregistrée`, toastiConfig);
      })
      .catch((err) => {
        toast.error(`Votre recette n"a pas été enregistrée`, toastiConfig);
        console.warn(err);
      });
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

  const getRecettes = () => {
    apiConnexion
      .get(`/recettes`)
      .then((data) => {
        setRecettes(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // getDepenses();
    getComptes();
    getOneCompte();
  }, []);

  useEffect(() => {
    if (recettes) {
      getRecettes();
    }
  }, []);

  return (
    <div className="recettes text-center">
      <div className="Recettes p-5 lg:ml-16  w-11/12 md:w-9/12 lg:px-14">
        <h2 className="text-center ">Ajouter une recette</h2>
        <h1 className="mt-5">Numéro de compte :</h1>
        <SelectComptesHome selectComptes={selectComptes} comptes={comptes} />
        <div>
          <input
            required
            className="px-5 w-full md:w-1/3 h-8 border border-2 border-blue rounded-2xl"
            id="grid-nom"
            type="text"
            placeholder="Déscription"
            name="nom"
            value={recette.nom}
            onChange={(e) => handleRecette(e.target.name, e.target.value)}
          />
        </div>
        <div className="flex justify-center pt-5">
          <input
            required
            className=" px-5 w-40 h-8 border border-2 border-blue rounded-2xl"
            id="grid-nom"
            type="number"
            placeholder="Somme"
            name="somme"
            value={recette.somme}
            onChange={(e) => handleRecette(e.target.name, e.target.value)}
          />
          <h1 className="mt-1 ml-2">€</h1>
        </div>
        <div className="flex justify-center pt-5">
          <button
            className=" p-1 px-5 border border-2 border-blue rounded-full"
            type="button"
            onClick={(e) => saveRecette(e)}
          >
            Enregistrer
          </button>
        </div>
      </div>
      <div>
        <h2 className="pt-5 text-center md:text-start md:ml-20">
          Supprimer une recette
        </h2>
        {recettes && (
          <SuppressTable operations={recettes} setOperations={setRecettes} />
        )}
      </div>
      <div>
        <h2 className=" text-center md:text-start md:ml-20">
          Modifier une recette
        </h2>
        {recettes && (
          <UpdateTable operations={recettes} setOperations={setRecettes} />
        )}
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

export default Recettes;
