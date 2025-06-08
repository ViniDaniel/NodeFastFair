const router = require("express").Router();
const pedidoController = require("../controllers/clientePedido/pedidoController");
const authCliente = require("../middlewares/authCliente")

router.route("/pedidos/:clienteId").get(authCliente,(req,res) => pedidoController.getByCliente(req,res))

router.put("/pedidos/:pedidoId/status", pedidoController.updateStatus);

router.post("/pedidos/webhook", pedidoController.webhook);

module.exports = router;
