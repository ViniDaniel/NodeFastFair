const router = require("express").Router();
const pedidoController = require("../controllers/clientePedido/pedidoController");

router.post("/pedidos", pedidoController.create);

router.get("/pedidos/:clienteId", pedidoController.getByCliente);

router.put("/pedidos/:pedidoId/status", pedidoController.updateStatus);

module.exports = router;
