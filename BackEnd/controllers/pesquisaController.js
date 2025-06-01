const {
  CategoriaProduto: CategoriaModel,
} = require("../models/CategoriaProduto");
const { Produto: ProdutoModel } = require("../models/Produto");
const { Feirante: FeiranteModel } = require("../models/Feirante");

const pesquisaController = {
  search: async (req, res) => {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(200).json([]);
      }

      const regex = new RegExp(q, "i");

      // Busca pela categoria com nome similar
      const categoria = await CategoriaModel.findOne({ nome: regex });

      // Busca pelos feirantes com nome similar
      const feirantes = await FeiranteModel.find({ nome: regex });

      const produtos = await ProdutoModel.find({
        $or: [
          { nome: regex },
          categoria ? { categoria: categoria._id } : null,
          feirantes.length > 0
            ? { feiranteId: { $in: feirantes.map((f) => f._id) } }
            : null,
        ].filter(Boolean),
      })
        .populate("feiranteId")
        .populate("categoria");

      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  sugestoes: async (req, res) => {
    try {
      const { q } = req.query;

      if (!q) return res.status(200).json([]);

      const regex = new RegExp(q, "i");

      const [produtos, feirantes, categorias] = await Promise.all([
        ProdutoModel.find({ nome: regex }).limit(5).select("nome"),
        FeiranteModel.find({ nome: regex }).limit(5).select("nome"),
        CategoriaModel.find({ nome: regex }).limit(5).select("nome"),
      ]);

      const resultados = [
        ...produtos.map((p) => ({ tipo: "produto", nome: p.nome })),
        ...feirantes.map((f) => ({ tipo: "feirante", nome: f.nome })),
        ...categorias.map((c) => ({ tipo: "categoria", nome: c.nome })),
      ];

      res.json(resultados);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      res.status(500).json({ erro: "Erro interno" });
    }
  },
};
module.exports = pesquisaController;
