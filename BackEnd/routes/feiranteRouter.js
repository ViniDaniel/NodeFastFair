const router = require("express").Router();
const feiranteController = require("../controllers/feiranteController");
const loginFeiranteController = require("../controllers/loginFeiranteController");
const authFeirante = require("../middlewares/authFeirante");

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
  .get(authFeirante, (req, res) => feiranteController.get(req, res));

//Delete do feirante
router
  .route("/feirantes/:id")
  .delete((req, res) => feiranteController.delete(req, res));

//Atualização do feirante
router
  .route("/feirantes/")
  .put(authFeirante, (req, res) => feiranteController.update(req, res));

router
  .route("/feirantes/login")
  .post((req, res) => loginFeiranteController.login(req, res));

module.exports = router;
