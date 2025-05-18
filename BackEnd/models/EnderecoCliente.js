const mongoose = require("mongoose");

const { Schema } = mongoose;

const enderecoClienteSchema = new Schema(
  {
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    cep: {
      type: String,
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
      max: 100000,
      require: false,
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
    complemento: {
      type: String,
      maxlength: 100,
      require: false,
    },
    referencia: {
      type: String,
      maxlength: 200,
      require: false,
    },
  },
  { timestamps: true }
);

const EnderecoCliente = mongoose.model(
  "EnderecoCliente",
  enderecoClienteSchema
);

module.exports = { EnderecoCliente };
