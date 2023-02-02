const AbstractManager = require("./AbstractManager");

class enregistrementManager extends AbstractManager {
  constructor() {
    super({ table: "enregistrement" });
  }

  insert(enregistrement) {
    return this.connection.query(
      `insert into ${this.table} (nom, somme, facture, N_comptes_id, type_id) values (?, ?, ?, ?, ?)`,
      [
        enregistrement.nom,
        enregistrement.somme,
        enregistrement.facture,
        enregistrement.N_comptes_id,
        enregistrement.type_id,
      ]
    );
  }

  update(enregistrement) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      enregistrement,
      enregistrement.id,
    ]);
  }

  findRecettes() {
    return this.connection.query(
      `select e.nom, e.somme from  ${this.table} as e INNER JOIN types as t on t.id=e.type_id where t.nom like 'Recettes'`
    );
  }

  findDepenses() {
    return this.connection.query(
      `select e.nom, e.somme from  ${this.table} as e INNER JOIN types as t on t.id=e.type_id where t.nom like 'Dépenses'`
    );
  }
}

module.exports = enregistrementManager;
