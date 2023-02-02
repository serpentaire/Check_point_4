const express = require("express");

const router = express.Router();

const enregistrementControllers = require("./controllers/enregistrementControllers");

router.get("/enregistrements", enregistrementControllers.browse);
router.get("/enregistrements/:id", enregistrementControllers.read);
router.put("/enregistrements/:id", enregistrementControllers.edit);
router.post("/enregistrements", enregistrementControllers.add);
router.delete("/enregistrements/:id", enregistrementControllers.destroy);

module.exports = router;
