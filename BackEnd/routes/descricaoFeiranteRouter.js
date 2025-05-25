const router = require("express").Router();
const descricaoFeiranteController = require("../controllers/descricaoFeiranteController");
const authFeirante = require("../middlewares/authFeirante");

router
  .route("/feirante/descricao/")
  .post(authFeirante, (req, res) =>
    descricaoFeiranteController.create(req, res)
  );

router
  .route("/feirante/descricao/")
  .get((req, res) => descricaoFeiranteController.getAll(req, res));

router
  .route("/feirante/descricao/:feiranteId")
  .get(authFeirante, (req, res) => descricaoFeiranteController.get(req, res));

router
  .route("/feirante/descricao/:feiranteId/:descricaoFeiranteId")
  .delete(authFeirante, (req, res) =>
    descricaoFeiranteController.delete(req, res)
  );

router
  .route("/feirante/descricao/:feiranteId/:descricaoFeiranteId")
  .put(authFeirante, (req, res) =>
    descricaoFeiranteController.update(req, res)
  );


  module.exports = router