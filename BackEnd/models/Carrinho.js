const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  produtoId: {
    type: Schema.Types.ObjectId,
    ref: "Produto",
    required: true,
  },
  quantidade: {
    type: Number,
    default: 1,
  },
});

const carrinhoSchema = new Schema(
  {
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    itens: [itemSchema],
  },
  { timestamps: true }
);

const Carrinho = mongoose.model("Carrinho", carrinhoSchema);

module.exports = { Carrinho };
