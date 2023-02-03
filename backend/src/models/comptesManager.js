const AbstractManager = require("./AbstractManager");

class nComptesManager extends AbstractManager {
  constructor() {
    super({ table: "n_comptes" });
  }

  insert(nComptes) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [nComptes.title]
    );
  }

  update(nComptes) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [nComptes.title, nComptes.id]
    );
  }

  findAllComptes() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  findOneCompte(nComptes) {
    return this.connection.query(
      `select e.nom , e.somme, t.nom as type from  ${this.table} as c INNER JOIN enregistrement as e on e.n_comptes_id=c.id INNER JOIN Types as t on t.id=e.type_id where c. = ?`,
      [nComptes]
    );
  }

  findIdComptes(nomCompte) {
    return this.connection.query(
      `select id, n_compte from  ${this.table} where nom = ?`,
      [nomCompte]
    );
  }
}

module.exports = nComptesManager;
