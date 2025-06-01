const colaboradorController = require("../controllers/colaboradorController")

const router = require("express").Router()

router
  .route("/public/colaboradores")
  .get((req, res) => colaboradorController.getAllFeirante(req, res));

router
  .route("/public/colaborador/:id")
  .get((req, res) => colaboradorController.getFeirante(req, res));

router
  .route("/public/colaborador/:id/produtos")
  .get((req, res) => colaboradorController.getProduto(req, res));

router
  .route("/public/colaborador/:id/descricao")
  .get((req, res) => colaboradorController.getDescricao(req, res));



module.exports = router