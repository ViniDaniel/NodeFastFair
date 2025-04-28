const router = require("express").Router();

const clienteRouter = require("./clienteRouter");

router.use("/", clienteRouter);

module.exports = router;