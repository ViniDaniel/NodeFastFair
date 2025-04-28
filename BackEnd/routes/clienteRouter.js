const router = require("express").Router();
const clienteController = require("../controllers/clienteController");

//rota de criação de um cliente
router
  .route("/clientes")
  .post((req, res) => clienteController.create(req, res));

  //rota de busca de todos os clientes
router.route("/clientes").get((req, res) => clienteController.getAll(req, res));

//rota de busca de um cliente específico
router
  .route("/clientes/:id")
  .get((req, res) => clienteController.get(req, res));

  //rota de delete do cliente
router
  .route("/clientes/:id")
  .delete((req, res) => clienteController.delete(req, res));

  //rota de atualização do cliente
router
  .route("/clientes/:id")
  .put((req, res) => clienteController.update(req, res));

module.exports = router;
