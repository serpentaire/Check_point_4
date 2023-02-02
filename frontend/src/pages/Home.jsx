import React from "react";
import RecetteTable from "@components/recetteTable";
import DepenseTable from "@components/depenseTable";

export default function Home() {
  return (
    <div>
      <h1>Voici la situation comptable :</h1>
      <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mb-5 mx-14">
        <h1>Recettes :</h1>
        <RecetteTable />
      </div>
      <div className="flex flex-col md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center justify-center mb-5 mx-14">
        <h1>Dépenses :</h1>
        <DepenseTable />
      </div>
      <h1>Solde :</h1>
      <h1>Etat par compte :</h1>
    </div>
  );
}
