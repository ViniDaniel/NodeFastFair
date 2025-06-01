const { Feirante: FeiranteModel } = require("../models/Feirante");
const { Produto: ProdutoModel } = require("../models/Produto");
const {
  DescricaoFeirante: DescricaoModel,
} = require("../models/DescricaoFeirante");

const colaboradorController = {
  getAllFeirante: async (req, res) => {
    try {
      const feirante = await FeiranteModel.find({}, "nome");
      return res.status(200).json(feirante);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  getFeirante: async (req, res) => {
    try {
      const id = req.params.id;
      const feirante = await FeiranteModel.findById(id).select(
        "-senha -cpf_cnpj"
      );

      if (!feirante) {
        return res.status(404).json({ message: "Feirante não encontrado!" });
      }
      return res.status(200).json(feirante);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  getProduto: async (req, res) => {
    try {
      const feiranteId = req.params.id;
      const produto = await ProdutoModel.find({ feiranteId })
        .populate("categoria")
        .populate("feiranteId")
        .select("-quantidade");

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
  getDescricao: async (req, res) => {
    try {
      const feiranteId = req.params.id;

      const descricaoFeirante = await DescricaoModel.findOne({
        feiranteId: feiranteId,
      }).populate("feiranteId");

      if (!descricaoFeirante) {
        return res.status(400).json({ message: "Descrição não encontrada" });
      }

      return res.status(200).json(descricaoFeirante);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

module.exports = colaboradorController;
