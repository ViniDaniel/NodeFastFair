const {
  DescricaoFeirante: DescricaoModel,
} = require("../../models/DescricaoFeirante");
const fs = require("fs");
const path = require("path");

const capaFeiranteController = {
  patchCapa: async (req, res) => {
    try {
      const { feiranteId, descricaoFeiranteId } = req.params;
      const novaCapaPath = req.file ? req.file.path : null;

      if (!novaCapaPath) {
        return res.status(400).json({ message: "Nenhuma imagem enviada." });
      }

      const descricaoExistente = await DescricaoModel.findOne({
        _id: descricaoFeiranteId,
        feiranteId,
      });

      const capaAntiga = descricaoExistente.capa?.[0];
      if (capaAntiga) {
        const caminhoAbsoluto = path.resolve(capaAntiga);
        fs.unlink(caminhoAbsoluto, (err) => {
          if (err) {
            console.warn("Falha ao apagar imagem antiga:", err.message);
          } else{
            console.log("Capa removida com sucesso", caminhoAbsoluto);
          }
        });
      }

      descricaoExistente.capa = [novaCapaPath]
      await descricaoExistente.save()

      return res.status(200).json({
        message: "Capa atualizada com sucesso!",
        data: descricaoExistente,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
};

module.exports = capaFeiranteController;
