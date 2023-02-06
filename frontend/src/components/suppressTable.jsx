import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastiConfig from "@services/toastiConfig";
import apiConnexion from "@services/apiConnexion";

function suppressTable({ operations, setOperations }) {
  const deleteOperation = (operation) => {
    const newOperations = [...operations];
    newOperations.splice(operations.indexOf(operation), 1);
    setOperations(newOperations);
  };

  const handleSupOperations = (operation) => {
    if (operations[0].id) {
      apiConnexion
        .delete(`/enregistrements/${operation.id}`)
        .then(() => {
          deleteOperation(operation);
          toast.success(`L'enregistrement a bien été supprimée.`, toastiConfig);
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
                <th className="text-center text-darkPink">Supprimer</th>
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
                      {`${operation.somme} €`}
                    </td>
                    <td className="text-center w-4 text-black pl-6 pt-2">
                      <button
                        type="button"
                        className="hover:text-darkPink hover:underline"
                        onClick={() => handleSupOperations(operation)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 md:w-8 md:h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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

export default suppressTable;
