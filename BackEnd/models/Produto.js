const mongoose = require("mongoose");

const { Schema } = mongoose;

const produtoSchema = new Schema(
  {
    nome: {
      type: String,
      require: true,
      maxlenght: 50,
    },
    feiranteId: {
      type: Schema.Types.ObjectId,
      ref: "Feirante",
      required: true,
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "CategoriaProduto",
      required: true,
    },
    descricao: {
      type: String,
      maxlenght: 100,
    },
    preco: {
      type: Number,
      required: true,
      min: 0.01,
      max: 10000,
    },
    peso: {
      type: Number,
      required: true,
      min: 0,
      max: 1000000,
    },
    quantidade: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
    imagem: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      default: "Ativo",
    },
  },
  { timestamps: true }
);

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = { Produto };
