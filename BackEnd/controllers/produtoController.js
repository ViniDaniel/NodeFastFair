const {
  CategoriaProduto: CategoriaModel,
} = require("../models/CategoriaProduto");
const { Produto: ProdutoModel } = require("../models/Produto");
const fs = require("fs");
const path = require("path");

const produtoController = {
  create: async (req, res) => {
    try {
      const { nome, categoria, descricao, preco, peso, quantidade, status } =
        req.body;

      const imagemPath = req.file ? req.file.path : null;

      if (!nome || !categoria || !preco || !peso || !quantidade) {
        return res.status(400).json({
          message:
            "Preencha todos os campos obrigatórios: nome, categoria, preço, peso e quantidade.",
        });
      }

      if (isNaN(preco) || preco <= 0) {
        return res
          .status(400)
          .json({ message: "Preço deve ser um número positivo." });
      }
      
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
      const { nome, categoria, descricao, preco, peso, quantidade, status } =
        req.body;
      const produto = {
        nome,
        categoria,
        descricao,
        preco,
        peso,
        quantidade,
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
  patchImagem: async (req, res) => {
    try {
      const { feiranteId, produtoId } = req.params;
      const novaImagemPath = req.file ? req.file.path : null;

      if (!novaImagemPath) {
        return res.status(400).json({ message: "Nenhuma imagem enviada." });
      }

      const produtoExistente = await ProdutoModel.findOne({
        _id: produtoId,
        feiranteId,
      });

      const imagemAntiga = produtoExistente.imagem?.[0];
      if (imagemAntiga) {
        const caminhoAbsoluto = path.resolve(imagemAntiga);
        fs.unlink(caminhoAbsoluto, (err) => {
          if (err) {
            console.warn("Falha ao apagar imagem antiga:", err.message);
          } else {
            console.log("Imagem removida com sucesso", caminhoAbsoluto);
          }
        });
      }

      produtoExistente.imagem = [novaImagemPath];
      await produtoExistente.save();

      return res.status(200).json({
        message: "Imagem atualizada com sucesso!",
        data: produtoExistente,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

module.exports = produtoController;
