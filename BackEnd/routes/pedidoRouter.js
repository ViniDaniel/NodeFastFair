const router = require("express").Router();
const pedidoController = require("../controllers/clientePedido/pedidoController");

router.get("/pedidos/:clienteId", pedidoController.getByCliente);

router.put("/pedidos/:pedidoId/status", pedidoController.updateStatus);

router.post("/pedidos/webhook", pedidoController.webhook);

module.exports = router;
