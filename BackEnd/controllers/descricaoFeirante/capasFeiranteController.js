const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");

const capaFeiranteController = {
  patchCapa: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { capa } = req.body;
      const updateCapa = await DescricaoModel.findOneAndUpdate(
        {
          _id: descricaoFeiranteId,
          feiranteId: feiranteId,
        },
        { capa },
        { new: true }
      );
      return res.status(200).json(updateCapa);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

module.exports = capaFeiranteController;
