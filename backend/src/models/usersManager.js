const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  login(utilisateur) {
    return this.connection.query(`select * from ${this.table} where nom = ?`, [
      utilisateur,
    ]);
  }
}

module.exports = UsersManager;
