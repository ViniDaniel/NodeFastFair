const bcrypt = require("bcryptjs");
const { Cliente: ClienteModel } = require("../models/Cliente");

const loginClienteController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const cliente = await ClienteModel.findOne({ email });

      if (!cliente) {
        return res.status(400).json({ message: "Cliente não encontrado!" });
      }

      const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

      if (!senhaCorreta) {
        return res.status(400).json({ message: "Senha incorreta." });
      }

      const { nome, _id } = cliente;
      return res.status(200).json({
        message: "Login realizado com sucesso!",
        cliente: { nome, _id, email },
      });
    } catch (error) {
      console.log("Erro no login", error);
      return res.status(500).json({ message: "Erro ao realizar o login" });
    }
  },
};

module.exports = loginClienteController;
