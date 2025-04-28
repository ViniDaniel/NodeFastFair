const router = require('express').Router();
const feiranteController = require("../controllers/feiranteController");

router.route("/feirantes").post((req, res) => feiranteController.create(req, res));

module.exports = router;