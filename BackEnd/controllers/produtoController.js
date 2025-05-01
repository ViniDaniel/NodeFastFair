const { Produto: ProdutoModel } = require("../models/Produto");
require("../models/CategoriaProduto"); // importa só pra registrar


const produtoController = {
  create: async (req, res) => {
    try {
      const { nome, categoria, descricao, preco, peso, imagem, status } =
        req.body;

      const produto = {
        nome,
        categoria,
        descricao,
        preco,
        peso,
        imagem,
        status,
      };

      const response = await ProdutoModel.create(produto);

      return res
        .status(201)
        .json({ response, message: "Produto adicionado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "erro interno", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const produto = await ProdutoModel.find().populate("categoria") //populate para encotrar a categoria
      return res.status(200).json(produto);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const produto = await ProdutoModel.findById(id).populate("categoria")

      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      return res.status(200).json(produto);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Produto não encontrado!", error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const produto = await ProdutoModel.findById(id);
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      const deleteProduto = await ProdutoModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ deleteProduto, message: "produto deletado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { nome, categoria, descricao, preco, peso, imagem, status } =
        req.body;
      const produto = {
        nome,
        categoria,
        descricao,
        preco,
        peso,
        imagem,
        status,
      };

      const updateProduto = await ProdutoModel.findByIdAndUpdate(id, produto, {
        new: true,
      });

      if (!updateProduto) {
        return res.status(404).json({ message: "Produto não encontrado!" });
      }
      return res
        .status(200)
        .json({ updateProduto, message: "Atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno!", error: error.message });
    }
  },
};

module.exports = produtoController;
