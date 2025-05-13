const enderecoClienteController = require("../controllers/enderecoClienteController");
const authCliente = require("../middlewares/authCliente");

const router = require("express").Router();

//rota para criação do endereço do cliente
router
  .route("/enderecoCliente")
  .post(authCliente, (req, res) => enderecoClienteController.create(req, res));

//rota para busca do endereço do cliente
router
  .route("/enderecoCliente")
  .get(authCliente, (req, res) => enderecoClienteController.getAll(req, res));

//rota para busca individual do endereço do cliente
router
  .route("/enderecoCliente/:clienteId")
  .get(authCliente, (req, res) => enderecoClienteController.get(req, res));

//rota para deletar o endereço do cliente
router
  .route("/enderecoCliente/:clienteId")
  .delete(authCliente, (req, res) =>
    enderecoClienteController.delete(req, res)
  );

//rota para atualizar o endereço do cliente
router
  .route("/enderecoCliente/:clienteId")
  .put(authCliente, (req, res) => enderecoClienteController.update(req, res));

module.exports = router;
