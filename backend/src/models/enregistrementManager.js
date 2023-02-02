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
}

module.exports = enregistrementManager;
