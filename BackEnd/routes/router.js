const router = require("express").Router();

const clienteRouter = require("./clienteRouter");

router.use("/", clienteRouter);

const feiranteRouter = require("./feiranteRouter");
router.use("/", feiranteRouter);

module.exports = router;