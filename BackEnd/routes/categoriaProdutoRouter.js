const categoriaProdutoController = require("../controllers/categoriaProdutoController")


const router = require("express").Router()


router.route("/categorias").get((req,res) => categoriaProdutoController.getAll(req,res))

module.exports = router