import React, { useState, useEffect, useRef } from "react";
import SelectComptesHome from "@components/selectCompteHome";
import apiConnexion from "@services/apiConnexion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "@services/toastiConfig";
import SuppressTable from "@components/suppressTable";
import UpdateTable from "@components/updateTable";

function Depenses() {
  const [depenses, setDepenses] = useState([]);
  const [comptes, setComptes] = useState([]);
  const [oneCompte, setOneCompte] = useState();
  const [setOneCompteSelected] = useState([]);
  const inputRef1 = useRef(null);
  const depenseType = {
    nom: "",
    somme: 0,
    // facture: "",
    N_comptes_id: 0,
    type_id: 1,
  };

  const [depense, setDepense] = useState(depenseType);

  const selectComptes = (id) => {
    setOneCompte(id);
  };

  const handleDepense = (place, value) => {
    const newDepense = { ...depense };
    newDepense[place] = value;
    setDepense(newDepense);
  };

  const handleClick1 = () => {
    inputRef1.current.click();
  };

  const saveDepense = (e) => {
    e.preventDefault();

    const newDepense = { ...depense, N_comptes_id: oneCompte };
    const formData = new FormData();
    formData.append("facturePdf", inputRef1.current.files[0]);
    formData.append("data", JSON.stringify(newDepense));

    apiConnexion
      .post("/enregistrements", formData)
      .then(() => {
        toast.success(`Votre depense a bien été enregistrée`, toastiConfig);
      })
      .catch((err) => {
        toast.error(`Votre depense n"a pas été enregistrée`, toastiConfig);
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

  const getDepenses = () => {
    apiConnexion
      .get(`/depenses`)
      .then((data) => {
        setDepenses(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getComptes();
    getOneCompte();
  }, []);

  useEffect(() => {
    if (depenses) {
      getDepenses();
    }
  }, []);

  return (
    <div className="recettes text-center">
      <div className="Recettes p-5 lg:ml-16  w-11/12 md:w-9/12 lg:px-14">
        <h2 className="text-center ">Ajouter une dépense</h2>
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
            value={depense.nom}
            onChange={(e) => handleDepense(e.target.name, e.target.value)}
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
            value={depense.somme}
            onChange={(e) => handleDepense(e.target.name, e.target.value)}
          />
          <h1 className="mt-1 ml-2">€</h1>
        </div>
        <div className="flex justify-center pt-5">
          <button
            className=" p-1 px-5 border border-2 border-blue rounded-full"
            type="button"
            onClick={(e) => saveDepense(e)}
          >
            Enregistrer
          </button>
          <form encType="multipart/form-data">
            <button
              className=" ml-7 p-1 px-5 border border-2 border-blue rounded-full"
              type="button"
              onClick={handleClick1}
            >
              Facture
            </button>
            <input
              className="hidden"
              type="file"
              ref={inputRef1}
              name="facture"
              style={{ display: "none" }}
              accept=".pdf"
              value={depense.facture}
            />
          </form>
        </div>
      </div>
      <div>
        <h2 className="pt-5 text-center md:text-start md:ml-20">
          Supprimer une dépense
        </h2>
        {depenses && (
          <SuppressTable operations={depenses} setOperations={setDepenses} />
        )}
      </div>
      <div>
        <h2 className=" text-center md:text-start md:ml-20">
          Modifier une depense
        </h2>
        {depenses && (
          <UpdateTable operations={depenses} setOperations={setDepenses} />
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

export default Depenses;
