const router = require("express").Router();
const pesquisaController = require("../controllers/pesquisaController");

router
  .route("/pesquisa")
  .get((req, res) => pesquisaController.search(req, res));

router
  .route("/sugestoes")
  .get((req, res) => pesquisaController.sugestoes(req, res));

module.exports = router;
