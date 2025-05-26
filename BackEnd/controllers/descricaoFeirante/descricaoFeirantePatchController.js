const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");

const descricaoFeirantePatchController = {
  patchDescricao: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { descricao } = req.body;

      if (!descricao || descricao.trim().length < 50) {
        return res.status(400).json({
          message: "A descrição deve conter no mínimo 50 caracteres.",
        });
      }

      const updateDescricao = await DescricaoModel.findOneAndUpdate(
        {
          _id: descricaoFeiranteId,
          feiranteId: feiranteId,
        },
        { descricao },
        { new: true }
      );
      return res.status(200).json(updateDescricao);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
  
  
  
  
};

module.exports = descricaoFeirantePatchController;
