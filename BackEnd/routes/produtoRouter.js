const router = require("express").Router();

const produtoController = require("../controllers/produtoController");

//routa de criação de produto
router
  .route("/produtos")
  .post((req, res) => produtoController.create(req, res));

//rota da lista de produtos
router.route("/produtos").get((req, res) => produtoController.getAll(req, res));

//rota da busca unitaria de produto
router
  .route("/produtos/:id")
  .get((req, res) => produtoController.get(req, res));

//rta de delete do produto
router
  .route("/produtos/:id")
  .delete((req, res) => produtoController.delete(req, res));

//rota de update
router
  .route("/produtos/:id")
  .put((req, res) => produtoController.update(req, res));


  module.exports = router;