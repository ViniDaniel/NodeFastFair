const { EnderecoCliente: EnderecoModel } = require("../models/EnderecoCliente");
require("../models/Cliente");
const enderecoClienteController = {
  create: async (req, res) => {
    try {
      const {
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
        complemento,
        referencia,
      } = req.body;

      const enderecoCliente = {
        clienteId: req.user.id,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
        complemento,
        referencia,
      };

      const jaExiste = await EnderecoModel.findOne({ clienteId: req.user.id });
      if (jaExiste) {
        return res.status(400).json({ message: "Endereço já cadastrado." });
      }

      const response = await EnderecoModel.create(enderecoCliente);

      return res
        .status(201)
        .json({ response, message: "Endereço criado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const enderecoCliente = await EnderecoModel.find().populate("clienteId");
      return res.status(200).json(enderecoCliente);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { clienteId } = req.params;
      const enderecoCliente = await EnderecoModel.findOne({
        clienteId,
      }).populate("clienteId");

      if (!enderecoCliente) {
        return res.status(404).json({ message: "Endereço não encontrado!" });
      }
      return res.status(200).json(enderecoCliente);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.clienteId;
      const enderecoCliente = await EnderecoModel.findById(id);
      if (!enderecoCliente) {
        return res.status(404).json({ message: "Endereço não encontrado!" });
      }
      const deleteEnderecoCliente = await EnderecoModel.findByIdAndDelete(id);
      return res.status(200).json({
        deleteEnderecoCliente,
        message: "Cliente deletado com sucesso",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.clienteId;
      const {
        clienteId,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
        complemento,
        referencia,
      } = req.body;

      const enderecoCliente = {
        clienteId,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
        complemento,
        referencia,
      };
      const updateEnderecoCliente = await EnderecoModel.findByIdAndUpdate(
        id,
        enderecoCliente,
        { new: true }
      );

      if (!updateEnderecoCliente) {
        return res.status(404).json({ message: "Endereço não encontrado!" });
      }
      return res
        .status(200)
        .json({ updateEnderecoCliente, message: "Atualizadp com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
};

module.exports = enderecoClienteController;
