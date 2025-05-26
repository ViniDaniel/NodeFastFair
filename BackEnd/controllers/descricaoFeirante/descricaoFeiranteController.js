const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");

const descricaoFeiranteController = {
  create: async (req, res) => {
    try {
      const { descricao, topicos, enderecos, contatos, capa } = req.body;
      const descricaoFeirante = {
        feiranteId: req.user.id,
        descricao,
        topicos,
        enderecos,
        contatos,
        capa,
      };
      const jaExiste = await DescricaoModel.findOne({
        feiranteId: req.user.id,
      });
      if (jaExiste) {
        return res.status(400).json({ message: "Descrição já cadastrada!" });
      }
      const response = await DescricaoModel.create(descricaoFeirante);

      return res
        .status(201)
        .json({ response, message: "Descrição criada com sucesso!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const descricaoFeirante = await DescricaoModel.find().populate(
        "feiranteId"
      );
      return res.status(200).json(descricaoFeirante);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
  get: async (req, res) => {
    try {
      const { feiranteId } = req.params;

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
  delete: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;

      const descricaoFeirante = await DescricaoModel.findByIdAndDelete({
        _id: descricaoFeiranteId,
        feiranteId: feiranteId,
      });
      if (!descricaoFeirante) {
        return res.status(404).json({ message: "Descrição não encontrada" });
      }
      return res.status(200).json({ message: "Produto deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
  update: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const { descricao, topicos, enderecos, contatos, capa } = req.body;
      const descricaoFeirante = {
        descricao,
        topicos,
        enderecos,
        contatos,
        capa,
      };
      const updateDescricaoFeirante = await DescricaoModel.findOneAndUpdate(
        {
          _id: descricaoFeiranteId,
          feiranteId: feiranteId,
        },
        descricaoFeirante,
        {
          new: true,
        }
      );

      if(!updateDescricaoFeirante){
        return res.status(404).json({message: "Descrição não encontrada"})
      }

      return res.status(200).json({updateDescricaoFeirante, message: "Atualizado com sucesso"})
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno!", error: error.message });
    }
  },
};

module.exports = descricaoFeiranteController