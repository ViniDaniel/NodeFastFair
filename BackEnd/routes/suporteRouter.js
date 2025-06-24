const router = require("express").Router()
const suporteController = require("../controllers/suporteController")

router.route("/suporte").post((req,res) => suporteController.create(req,res))

module.exports = router