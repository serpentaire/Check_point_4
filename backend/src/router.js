const express = require("express");

const router = express.Router();

const enregistrementControllers = require("./controllers/enregistrementControllers");
const comptesControllers = require("./controllers/comptesControllers");

router.get("/enregistrements", enregistrementControllers.browse);
router.get("/enregistrements/:id", enregistrementControllers.read);
router.put("/enregistrements/:id", enregistrementControllers.edit);
router.post("/enregistrements", enregistrementControllers.add);
router.delete("/enregistrements/:id", enregistrementControllers.destroy);

router.get("/recettes", enregistrementControllers.findAllRecette);

router.get("/depenses", enregistrementControllers.findAllDepense);

router.get("/comptes", comptesControllers.browse);
router.get("/compte/:id/enregistrements", enregistrementControllers.findAll);
router.get("/compteId/:id", comptesControllers.readIdCompte);

module.exports = router;
