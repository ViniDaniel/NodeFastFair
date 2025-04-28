const router = require("express").Router();
const clienteController = require("../controllers/clienteController");

router.route("/clientes").post((req, res) => clienteController.create(req, res));


module.exports = router;