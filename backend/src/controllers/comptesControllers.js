const models = require("../models");

const browse = (req, res) => {
  models.n_comptes
    .findAllComptes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  if (req.params.id === 8 || req.params.id === 9) {
    models.n_comptes
      .findBothCompte(8, 9)
      .then(([rows]) => {
        if (rows == null) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    models.n_comptes
      .findOneCompte(req.params.id)
      .then(([rows]) => {
        if (rows == null) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const edit = (req, res) => {
  const nComptes = req.body;

  // TODO validations (length, format...)

  nComptes.id = parseInt(req.params.id, 10);

  models.nComptes
    .update(nComptes)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const nComptes = req.body;

  // TODO validations (length, format...)

  models.n_comptes
    .insert(nComptes)
    .then(([result]) => {
      res.location(`/n_comptes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.n_comptes
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readIdCompte = (req, res) => {
  models.n_comptes
    .findIdComptes(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readIdCompte,
};
