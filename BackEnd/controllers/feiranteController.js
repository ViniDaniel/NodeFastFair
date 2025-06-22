const { Feirante: FeiranteModel } = require("../models/Feirante");

const feiranteController = {
  create: async (req, res) => {
    try {
      const {
        nome,
        cpf_cnpj,
        email,
        celular,
        genero,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
        senha,
        confirmarSenha,
      } = req.body;

      if (senha !== confirmarSenha) {
        return res.status(400).json({ message: "As senhas não coincidem." });
      }
      const feirante = {
        nome,
        cpf_cnpj,
        email,
        celular,
        genero,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
        senha,
      };

      const response = await FeiranteModel.create(feirante);

      return res
        .status(201)
        .json({ response, message: "feirante criado com sucesso." });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: "CPF/CNPJ, email ou celular já cadastrado." });
      }
      return res
        .status(500)
        .json({ message: "Erro ao criar feirante.", error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const feirante = await FeiranteModel.find();
      return res.status(200).json(feirante);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const feirante = await FeiranteModel.findById(id);

      if (!feirante) {
        return res.status(404).json({ message: "Feirante não encontrado!" });
      }
      return res.status(200).json(feirante);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const feirante = await FeiranteModel.findById(id);
      if (!feirante) {
        return res.status(404).json({ message: "Feirante não encontrado" });
      }
      const deleteFeirante = await FeiranteModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ deleteFeirante, message: "Feirante deletado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const {
        nome,
        celular,
        genero,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
      } = req.body;
      const feirante = {
        nome,
        celular,
        genero,
        cep,
        endereco,
        numeroCasa,
        bairro,
        cidade,
        uf,
      };

      const feiranteId = req.user.id;

      const updateFeirante = await FeiranteModel.findByIdAndUpdate(
        feiranteId,
        feirante,
        { new: true }
      );

      if (!updateFeirante) {
        return res.status(404).json({ message: "Feirante não encontrado! " });
      }
      return res
        .status(200)
        .json({ updateFeirante, message: "Feirante atualizado com sucesso! " });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Erro interno!", error: error.message });
    }
  },
};

module.exports = feiranteController;
