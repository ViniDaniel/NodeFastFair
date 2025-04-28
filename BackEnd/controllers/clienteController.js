const { Cliente: ClienteModel } = require("../models/Cliente");

const clienteController = {
  create: async (req, res) => {
    try {
      const { nome, cpf, email, celular, genero, senha, confirmarSenha } =
        req.body;

      if (senha !== confirmarSenha) {
        return res.status(400).json({ message: "As senhas não coincidem." });
      }

      const cliente = { nome, cpf, email, celular, genero, senha };

      const response = await ClienteModel.create(cliente);

      return res.status(201).json({ response, message: "Cliente criado com sucesso." });
      
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "CPF, email ou celular já cadastrado." });
      }
      return res.status(500).json({ message: "Erro ao criar cliente." });
    }
  },
};

module.exports = clienteController;
