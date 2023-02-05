const Joi = require("joi");

const enregistrementData = Joi.object({
  id: Joi.number().presence("optional"),
  nom: Joi.string().min(3).max(255).presence("required"),
  somme: Joi.number().presence("required"),
  facture: Joi.string().max(255).presence("optional"),
  N_comptes_id: Joi.string().max(255).presence("required"),
  type_id: Joi.number().presence("required"),
});

const updateData = Joi.object({
  id: Joi.number().presence("required"),
  nom: Joi.string().min(3).max(255).presence("required"),
  somme: Joi.number().presence("required"),
});

const checkEnregistrement = (req, res, next) => {
  const enregistrement =
    req.body.type_id === 2 ? req.body : JSON.parse(req.body.data);
  const { error } = enregistrementData.validate(enregistrement, {
    abordEarly: false,
  });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const checkUpdateEnregistrement = (req, res, next) => {
  const { error } = updateData.validate(req.body, { abordEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  checkEnregistrement,
  checkUpdateEnregistrement,
};
