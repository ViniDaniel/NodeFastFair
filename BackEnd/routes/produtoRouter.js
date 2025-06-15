const router = require("express").Router();
const authFeirante = require("../middlewares/authFeirante");
const produtoController = require("../controllers/produtoController");
const upload = require("../middlewares/upload");

router
  .route("/produtos/categorias/:nome")
  .get((req, res) => produtoController.getByCategoria(req, res));
//routa de criação de produto
router
  .route("/produtos/:feiranteId")
  .post(authFeirante, upload.single("imagem"), (req, res) =>
    produtoController.create(req, res)
  );

//rota da lista de produtos
router
  .route("/produtos/")
  .get((req, res) => produtoController.getAll(req, res));

//rota da busca unitaria de produto
router
  .route("/produtos/:feiranteId")
  .get(authFeirante, (req, res) => produtoController.get(req, res));

router
  .route("/produtos/:feiranteId/:produtoId")
  .get(authFeirante, (req, res) => produtoController.getP(req, res));

//rta de delete do produto
router
  .route("/produtos/:feiranteId/:produtoId")
  .delete(authFeirante, (req, res) => produtoController.delete(req, res));

//rota de update
router
  .route("/produtos/:feiranteId/:produtoId")
  .put(authFeirante, (req, res) => produtoController.update(req, res));

router
  .route("/produtos/:feiranteId/:produtoId/atualizarImagem")
  .patch(authFeirante, upload.single("imagem"), (req, res) =>
    produtoController.patchImagem(req, res)
  );

module.exports = router;
