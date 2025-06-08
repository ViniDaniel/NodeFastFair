const router = require("express").Router();
const pedidoController = require("../controllers/clientePedido/pedidoController");
const authCliente = require("../middlewares/authCliente")

router.get(authCliente, "/pedidos/:clienteId", pedidoController.getByCliente);

router.put("/pedidos/:pedidoId/status", pedidoController.updateStatus);

router.post("/pedidos/webhook", pedidoController.webhook);

module.exports = router;
