const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");

const contatosFeiranteController = {
  patchContato: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { contatos } = req.body;
      const updateContatos = await DescricaoModel.findOneAndUpdate(
        {
          _id: descricaoFeiranteId,
          feiranteId: feiranteId,
        },
        { contatos },
        { new: true }
      );
      return res.status(200).json(updateContatos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },

  addContato: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { novoContato } = req.body;

      const createContato = await DescricaoModel.findOneAndUpdate(
        { _id: descricaoFeiranteId, feiranteId },
        { $push: { contatos: novoContato } },
        { new: true }
      );
      return res.status(201).json(createContato);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },

  deleteContato: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { contato } = req.body;

      const deleteContato = await DescricaoModel.findOneAndUpdate(
        { _id: descricaoFeiranteId, feiranteId },
        { $pull: { contatos: contato } },
        { new: true }
      );

      return res.status(200).json(deleteContato);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

module.exports = contatosFeiranteController;
