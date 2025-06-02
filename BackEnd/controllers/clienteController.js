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

      return res
        .status(201)
        .json({ response, message: "Cliente criado com sucesso." });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "CPF, email ou celular já cadastrado." });
      }
      return res
        .status(500)
        .json({ message: "Erro ao criar cliente.", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const cliente = await ClienteModel.find();
      return res.status(200).json(cliente);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" }); //500 é um erro interno
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.clienteId; //pega o id do usuario
      const cliente = await ClienteModel.findById(id);

      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" }); //404 é Not Found
      }
      return res.status(200).json(cliente);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno" });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.clienteId;
      const cliente = await ClienteModel.findById(id);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }
      const deleteCliente = await ClienteModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ deleteCliente, message: "Cliente deletado com suceso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error interno", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { nome, celular, genero } = req.body;

      const cliente = {
        nome,
        celular,
        genero,
      };

      const clienteId = req.cliente.id

      const updateCliente = await ClienteModel.findByIdAndUpdate(clienteId, cliente, {
        new: true,
      });

      if (!updateCliente) {
        
        return res.status(404).json({ message: "Cliente não encontrado", error: error.message });
      }

      return res
        .status(200)
        .json({ updateCliente, message: "Cliente atualizado com sucesso!" });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "Email ou celular já cadastrado." });
      }
      return res
        .status(500)
        .json({ message: "Erro interno!", error: error.message });
    }
  },
};

module.exports = clienteController;
