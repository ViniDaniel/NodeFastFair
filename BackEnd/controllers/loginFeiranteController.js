const bcrypt = require("bcryptjs");
const { Feirante: FeiranteModel } = require("../models/Feirante");

const loginFeiranteController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const feirante = await FeiranteModel.findOne({ email });

      if (!feirante) {
        return res.status(400).json({ message: "Feirantenão encontrado!" });
      }

      const senhaCorreta = await bcrypt.compare(senha, feirante.senha);
      
      if (!senhaCorreta) {
        return res.status(400).json({ message: "Senha incorreta" });
      }

      const { nome, _id } = feirante;
      return res.status(200).json({
        message: "Feirante conectado com sucesso!",
        feirante: { nome, _id, email },
      });
    } catch (error) {
      console.log("Erro no login", error);
      return res.status(500).json({ message: "Erro ao realizar o login!" });
    }
  },
};

module.exports = loginFeiranteController;
