const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

      const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "id",
      });

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        cliente: {
          _id: cliente._id,
          nome: cliente.nome,
          email: cliente.email,
          celular: cliente.celular,
          genero: cliente.genero,
        },
        token,
      });
    } catch (error) {
      console.log("Erro no login", error);
      return res.status(500).json({ message: "Erro ao realizar o login" });
    }
  },
};

module.exports = loginClienteController;
