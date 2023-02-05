const express = require("express");
const multer = require("multer");

const router = express.Router();

const enregistrementControllers = require("./controllers/enregistrementControllers");
const comptesControllers = require("./controllers/comptesControllers");
const usersControllers = require("./controllers/usersControllers");
const { checkEnregistrement } = require("./middleware/checkData");
const { checkUpdateEnregistrement } = require("./middleware/checkData");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    const fileArray = file.originalname.split(".");
    const ext = fileArray.pop();
    const filename = fileArray.join("_").split(" ").join("_");
    cb(
      null,
      `${file.fieldname === "/images/"}${`${filename}_${Date.now()}.${ext}`}`
    );
  },
});
const upload = multer({ storage });

router.get("/enregistrements", enregistrementControllers.browse);
router.get("/enregistrements/:id", enregistrementControllers.read);
router.put(
  "/enregistrements/:id",
  checkUpdateEnregistrement,
  enregistrementControllers.edit
);

router.post(
  "/enregistrements",
  upload.fields([{ name: "facturePdf", maxCount: 1 }]),
  checkEnregistrement,
  enregistrementControllers.add
);

router.delete("/enregistrements/:id", enregistrementControllers.destroy);

router.get("/recettes", enregistrementControllers.findAllRecette);

router.get("/depenses", enregistrementControllers.findAllDepense);

router.get("/comptes", comptesControllers.browse);
router.get("/compte/:id/enregistrements", enregistrementControllers.findAll);
router.get("/compteId/:id", comptesControllers.readIdCompte);

router.post("/login", usersControllers.validateUser);

module.exports = router;
