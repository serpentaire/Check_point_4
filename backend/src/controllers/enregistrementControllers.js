const models = require("../models");
const sendMail = require("./emailControleurs");

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

const sendEmail = (req, res) => {
  const recette = req.body.filter((num) => num.type_id === 2);
  const depense = req.body.filter((num) => num.type_id === 1);

  const email = {
    name: "LEMOINE",
    surname: "Gaëtan",
    phone: "0761074681",
    email: "glemoine@hotmail.fr",
    message: "Bonjour, ci-dessous l'état du compte à ce jour :",
  };

  const mailOptions = {
    from: "glemoine@hotmail.fr",
    to: email.email, // this is the address to which the email will be sent
    subject: "Rapport comptable",
    attachments: [
      {
        filename: "Logo-Externatic.png",
        path: "public/assets/images/favicon.png",
        cid: "logo",
      },
    ],
    text: `${email.message} \n\n Phone: ${email.phone} \n\n Name: ${email.name} \n\n Surname: ${email.surname} \n\n Email: ${email.email}`,
    html: `
    <p>${email.message}</p>
    <table style="border: 1px solid black;">
      <thead>
        <tr>
          <th style="border: 1px solid black;">Recette</th>
          <th style="border: 1px solid black;">Somme</th>
        </tr>
      </thead>
      <tbody>
      ${recette.map(
        (row) =>
          `<tr>
          <td style="border: 1px solid black;">${row.nom}</td>
          <td style="border: 1px solid black;">${row.somme} €</td>
        </tr>
        `
      )}
      </tbody>
    </table>
    <br>
    <table style="border: 1px solid black;">
    <thead>
      <tr>
        <th style="border: 1px solid black;">Dépenses</th>
        <th style="border: 1px solid black;">Somme</th>
      </tr>
    </thead>
    <tbody>
    ${depense.map(
      (rowdep) =>
        `<tr>
        <td style="border: 1px solid black;">${rowdep.nom}</td>
        <td style="border: 1px solid black;">${rowdep.somme} €</td>
      </tr>
      `
    )}
    </tbody>
  </table>

    <br>
    <img src="cid:logo" height="100"
  `,
  };

  sendMail(mailOptions);
  res.sendStatus(200);
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
  sendEmail,
};
