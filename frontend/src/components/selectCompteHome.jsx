import React from "react";

function SelectComptesHome({ selectComptes, comptes }) {
  return (
    <div>
      <div className=" mb-3 md:flex md:justify-center">
        <div className="mb-3 xl:w-96 ">
          <select
            onChange={(e) => {
              selectComptes(e.target.value);
            }}
            className="form-select appearance-none
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-blue
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option selected>Les Comptes</option>
            {comptes.map((compte) => (
              <option key={compte.id} value={compte.id}>
                {compte.nom}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SelectComptesHome;
