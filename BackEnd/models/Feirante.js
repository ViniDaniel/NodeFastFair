const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const feiranteSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    cpf_cnpj: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 18,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    celular: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 15,
      unique: true,
    },
    genero: {
      type: String,
      required: true,
    },

    cep: {
      type: String,
      minlength: 8,
      maxlength: 9,
      required: false,
    },

    endereco: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },

    numeroCasa: {
      type: Number,
      min: 1,
      max: 100000,
      required: false,
    },

    bairro: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },

    cidade: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },

    uf: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 2,
    },
    mercadoPagoAccessToken: {
      type: String,
    },
    mercadoPagoUserId: {
      type: String,
    },

    senha: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

feiranteSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const Feirante = mongoose.model("Feirante", feiranteSchema);

module.exports = { Feirante };
