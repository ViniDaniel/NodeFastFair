const mongoose = require("mongoose");

const { Schema } = mongoose;

const enderecoClienteSchema = new Schema({
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  cep: {
    type: String,
    minlength: 8,
    maxlength: 9,
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
    max: 10,
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
    minlength: 3,
    maxlength: 100,
  },
  referencia: {
    type: String,
    minlength: 3,
    maxlength: 100,
  },
}, { timestamps: true });

const EnderecoCliente = mongoose.model("EnderecoCliente", enderecoClienteSchema);

module.exports = {EnderecoCliente};
