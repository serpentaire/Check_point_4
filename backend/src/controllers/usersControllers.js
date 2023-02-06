const jwt = require("jsonwebtoken");
const models = require("../models");
const { verifyHash } = require("../service/auth");

const validateUser = (req, res) => {
  const { utilisateur } = req.body;
  models.users
    .login(utilisateur)
    .then(async ([user]) => {
      if (user[0]) {
        if (await verifyHash(user[0].hashedPassword, req.body.mot_de_passe)) {
          const myUser = { ...user[0] };
          delete myUser.hashedPassword;
          const token = jwt.sign(myUser, process.env.JWT_SECRET, {
            expiresIn: "24h",
          });

          res
            .status(201)
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .json(myUser);
        } else {
          res.sendStatus(401);
        }
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  validateUser,
};
