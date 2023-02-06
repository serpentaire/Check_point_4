import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "@services/toastiConfig";
import apiConnexion from "@services/apiConnexion";
import icone from "@assets/drawing.png";

function UpdateTable({ operations }) {
  const [selectOperation, setSelectOperation] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);

  const updateOperation = () => {};

  const handleselectoperation = (operation) => {
    setOpenUpdate(true);
    setSelectOperation(operation);
  };

  const handleoperations = (place, value) => {
    const newSelectOperation = { ...selectOperation };
    newSelectOperation[place] = value;
    setSelectOperation(newSelectOperation);
  };

  const handleUpdateOperations = (e) => {
    e.preventDefault();
    setOpenUpdate(false);
    if (operations[0].id) {
      apiConnexion
        .put(`/enregistrements/${selectOperation.id}`, selectOperation)
        .then(() => {
          updateOperation();
          setOpenUpdate(false);
          toast.success(`L'enregistrement a bien été modifié.`, toastiConfig);
        })
        .catch((err) => {
          toast.error(`Une erreur s'est produite`, toastiConfig);
          console.warn(err);
        });
    }
  };

  return (
    <div className="flex justify-center md:pr-40">
      <div className="mt-4 w-11/12 md:w-9/12 lg:px-14 lg:ml-8">
        <div className="w-full">
          <table className="table-fixed w-full border-collapse mb-10">
            <thead>
              <tr>
                <th className="text-center text-darkPink">Désignation</th>
                <th className="text-center text-darkPink">Somme</th>
                <th className="text-center text-darkPink">Modifier</th>
              </tr>
            </thead>
            <tbody>
              {operations &&
                operations.map((operation) => (
                  <tr>
                    <td className="text-center text-xs md:text-base lg:text-lg text-black">
                      {operation.nom}
                    </td>
                    <td className="text-center text-xs md:text-base lg:text-lg text-black">
                      {operation.somme}
                    </td>
                    <td className="text-center w-4 text-black pl-6 pt-2">
                      <button
                        type="button"
                        className="hover:text-darkPink hover:underline"
                        onClick={() => handleselectoperation(operation)}
                      >
                        <img src={icone} alt="icone" className="w-9 h-9" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {openUpdate && (
            <div className="">
              <input
                required
                className=" px-5 w-full md:w-1/3 h-8 border border-2 border-blue rounded-2xl"
                type="text"
                name="nom"
                value={selectOperation.nom}
                onChange={(e) =>
                  handleoperations(e.target.name, e.target.value)
                }
              />
              <div className="pt-5 flex justify-center">
                <input
                  required
                  className=" px-5 w-40 h-8 border border-2 border-blue rounded-2xl"
                  type="text"
                  name="somme"
                  value={selectOperation.somme}
                  onChange={(e) =>
                    handleoperations(e.target.name, e.target.value)
                  }
                />
                <h1 className="mt-1 ml-2">€</h1>
              </div>
              <div className="flex justify-center pt-5">
                <button
                  className=" p-1 px-5 border border-2 border-blue rounded-full"
                  type="button"
                  onClick={(e) => handleUpdateOperations(e)}
                >
                  Modifier
                </button>
              </div>
            </div>
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
    </div>
  );
}

export default UpdateTable;
