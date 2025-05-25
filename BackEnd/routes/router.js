const router = require("express").Router();

const clienteRouter = require("./clienteRouter");

router.use("/", clienteRouter);

const feiranteRouter = require("./feiranteRouter");
router.use("/", feiranteRouter);

const produtoRouter = require("./produtoRouter");
router.use("/", produtoRouter)

const enderecoClienteRouter = require("./enderecoClienteRouter")
router.use("/", enderecoClienteRouter)

const categoriaProdutoRouter = require("./categoriaProdutoRouter")
router.use("/", categoriaProdutoRouter)

const descricaoFeiranteRouter = require("./descricaoFeiranteRouter")
router.use("/", descricaoFeiranteRouter)

module.exports = router;