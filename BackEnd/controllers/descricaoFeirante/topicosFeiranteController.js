const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");
const topicosFeiranteController = {
  patchTopico: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { topicos } = req.body;
      const updateTopicos = await DescricaoModel.findOneAndUpdate(
        {
          _id: descricaoFeiranteId,
          feiranteId: feiranteId,
        },
        { topicos },
        { new: true }
      );
      return res.status(200).json(updateTopicos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },

  addTopico: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { novoTopico } = req.body;

      const createTopico = await DescricaoModel.findOneAndUpdate(
        { _id: descricaoFeiranteId, feiranteId },
        { $push: { topicos: novoTopico } },
        { new: true }
      );
      return res.status(201).json(createTopico);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },

  deleteTopico: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { topico } = req.body;

      const deleteTopico = await DescricaoModel.findOneAndUpdate(
        { _id: descricaoFeiranteId, feiranteId },
        { $pull: { topicos: topico } },
        { new: true }
      );

      return res.status(200).json(deleteTopico);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

module.exports = topicosFeiranteController;
