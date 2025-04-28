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

      return res.status(201).json({ response, message: "feirante criado com sucesso." });

    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "CPF/CNPJ, email ou celular já cadastrado." });
      }
      return res.status(500).json({ message: "Erro ao criar feirante.", error: error.message });

    }
  },
};

module.exports = feiranteController;
