const router = require("express").Router();
const feiranteController = require("../controllers/feiranteController");

//criação do feirante
router
  .route("/feirantes")
  .post((req, res) => feiranteController.create(req, res));

//Busca completa
router
  .route("/feirantes")
  .get((req, res) => feiranteController.getAll(req, res));

//Busca individual
router
  .route("/feirantes/:id")
  .get((req, res) => feiranteController.get(req, res));

//Delete do feirante
router
  .route("/feirantes/:id")
  .delete((req, res) => feiranteController.delete(req, res));

//Atualização do feirante
router
  .route("/feirantes/:id")
  .put((req, res) => feiranteController.update(req, res));

module.exports = router;
