const router = require("express").Router();
const carrinhoController = require("../controllers/clientePedido/carrinhoController");
const authCliente = require("../middlewares/authCliente");

router
  .route("/cliente/carrinho")
  .post(authCliente, (req, res) =>
    carrinhoController.adicionarProduto(req, res)
  );

router
  .route("/cliente/carrinho")
  .get(authCliente, (req, res) => carrinhoController.listarCarrinho(req, res));

router
  .route("/cliente/carrinho/item/:produtoId/remover")
  .delete(authCliente, (req, res) =>
    carrinhoController.removerProduto(req, res)
  );

router
  .route("/cliente/carrinho/finalizar")
  .post(authCliente, (req, res) =>
    carrinhoController.finalizarPedido(req, res)
  );

router
  .route("/cliente/carrinho/item/:produtoId/adicionar")
  .patch(authCliente, (req, res) =>
    carrinhoController.aumentarQuantidade(req, res)
  );

router
  .route("/cliente/carrinho/item/:produtoId/diminuir/")
  .patch(authCliente, (req, res) =>
    carrinhoController.diminuirQuantidade(req, res)
  );

  router.post("/cliente/carrinho/gerar-preferencia", authCliente, carrinhoController.gerarPreferencia);


module.exports = router;
