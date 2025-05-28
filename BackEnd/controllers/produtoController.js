const {
  CategoriaProduto: CategoriaModel,
} = require("../models/CategoriaProduto");
const { Produto: ProdutoModel } = require("../models/Produto");
require("../models/CategoriaProduto"); // importa só pra registrar

const produtoController = {
  create: async (req, res) => {
    try {
      const { nome, categoria, descricao, preco, peso, quantidade, status } =
        req.body;

      const imagemPath = req.file ? req.file.path : null;

      const produto = {
        feiranteId: req.user.id,
        nome,
        categoria,
        descricao,
        preco,
        peso,
        quantidade,
        imagem: imagemPath ? [imagemPath] : [],
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
      const produto = await ProdutoModel.find()
        .populate("feiranteId")
        .populate("categoria");
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
      const { feiranteId } = req.params;
      const produto = await ProdutoModel.find({ feiranteId })
        .populate("categoria")
        .populate("feiranteId");

      if (!produto || produto.length === 0) {
        return res.status(404).json({ message: "Nenhum produto encontrado" });
      }

      return res.status(200).json(produto);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Produto não encontrado!", error: error.message });
    }
  },

  getP: async (req, res) => {
    try {
      const { feiranteId, produtoId } = req.params;
      const produto = await ProdutoModel.findOne({
        feiranteId: feiranteId,
        _id: produtoId,
      })
        .populate("categoria")
        .populate("feiranteId");
      return res.status(200).json(produto);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Produto não encontrado!", error: error.message });
    }
  },

  getByCategoria: async (req, res) => {
    try {
      const { nome } = req.params;

      const categoria = await CategoriaModel.findOne({
        nome: { $regex: new RegExp(`^${nome}$`, "i") },
      });

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      const produto = await ProdutoModel.find({ categoria: categoria._id })
        .populate("feiranteId")
        .populate("categoria");

      return res.status(200).json(produto);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { feiranteId, produtoId } = req.params;

      const produto = await ProdutoModel.findByIdAndDelete({
        _id: produtoId,
        feirante: feiranteId,
      });
      if (!produto) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      return res.status(200).json({ message: "produto deletado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { feiranteId, produtoId } = req.params;
      const {
        nome,
        categoria,
        descricao,
        preco,
        peso,
        quantidade,
        imagem,
        status,
      } = req.body;
      const produto = {
        nome,
        categoria,
        descricao,
        preco,
        peso,
        quantidade,
        imagem,
        status,
      };

      const updateProduto = await ProdutoModel.findOneAndUpdate(
        { _id: produtoId, feiranteId: feiranteId },
        produto,
        {
          new: true,
        }
      );

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
