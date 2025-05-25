const {CategoriaProduto: CategoriaModel} = require("../models/CategoriaProduto")

const categoriaProdutoController = {
    getAll: async (req, res) => {
        try {
            const categoria = await CategoriaModel.find()
            return res.status(200).json(categoria)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Erro interno"})
        }
    }
}

module.exports = categoriaProdutoController