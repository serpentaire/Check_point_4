const models = require("../models");

const browse = (req, res) => {
  models.enregistrement
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAllRecette = (req, res) => {
  models.enregistrement
    .findRecettes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAllDepense = (req, res) => {
  models.enregistrement
    .findDepenses()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.enregistrement
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const enregistrement = req.body;

  // TODO validations (length, format...)

  enregistrement.id = parseInt(req.params.id, 10);

  models.enregistrement
    .update(enregistrement)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("Bien modifié");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  let enregistrement = req.body.type_id === 2 ? req.body.data : req.body;
  const facturePdf = `assets${
    req.body.data
      ? `/${req.files.facturePdf[0].filename}`
      : "/images/favicon.png"
  }`;

  enregistrement =
    req.body.type_id === 2 ? req.body : JSON.parse(req.body.data);
  models.enregistrement
    .insert(enregistrement, facturePdf)
    .then(([result]) => {
      res
        .location(`/enregistrements/${result.insertId}`)
        .status(201)
        .send("Bien enregistré");
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.enregistrement
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send("Bien supprimée");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAll = (req, res) => {
  if (req.params.id === "8" || req.params.id === "9") {
    models.enregistrement
      .findBothCompte(8, 9)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    models.enregistrement
      .findOneCompte(req.params.id)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  findAllRecette,
  findAllDepense,
  findAll,
};
