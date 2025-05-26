const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");

const enderecosFeiranteController = {
  patchEndereco: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { enderecos } = req.body;
      const updateEnderecos = await DescricaoModel.findOneAndUpdate(
        {
          _id: descricaoFeiranteId,
          feiranteId: feiranteId,
        },
        { enderecos },
        { new: true }
      );
      return res.status(200).json(updateEnderecos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
  addEndereco: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { novoEndereco } = req.body;

      const createEndereco = await DescricaoModel.findOneAndUpdate(
        { _id: descricaoFeiranteId, feiranteId: feiranteId},
        { $push: { enderecos: novoEndereco } },
        { new: true }
      );
      return res.status(201).json(createEndereco);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },

  deleteEndereco: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { endereco } = req.body;

      const deleteEndereco = await DescricaoModel.findOneAndUpdate(
        { _id: descricaoFeiranteId, feiranteId: feiranteId },
        { $pull: { enderecos: endereco } },
        { new: true }
      );

      return res.status(200).json(deleteEndereco);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};
module.exports = enderecosFeiranteController;
