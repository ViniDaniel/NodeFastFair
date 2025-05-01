const enderecoClienteController = require("../controllers/enderecoClienteController");

const router = require("express").Router();

//rota para criação do endereço do cliente
router
  .route("/enderecoCliente")
  .post((req, res) => enderecoClienteController.create(req, res));

//rota para busca do endereço do cliente
router
  .route("/enderecoCliente")
  .get((req, res) => enderecoClienteController.getAll(req, res));

//rota para busca individual do endereço do cliente
router
  .route("/enderecoCliente/:id")
  .get((req, res) => enderecoClienteController.get(req, res));

//rota para deletar o endereço do cliente
router
  .route("/enderecoCliente/:id")
  .delete((req, res) => enderecoClienteController.delete(req, res));

//rota para atualizar o endereço do cliente
router
  .route("/enderecoCliente/:id")
  .put((req, res) => enderecoClienteController.update(req, res));


  module.exports = router;