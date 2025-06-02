const mongoose = require("mongoose");
const { Schema } = mongoose;

const pedidoSchema = new Schema({
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  produtos: [
    {
      produtoId: {
        type: Schema.Types.ObjectId,
        ref: "Produto",
        required: true,
      },
      quantidade: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pendente", "confirmado", "entregue", "cancelado"],
    default: "pendente",
  },
  dataPedido: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedido", pedidoSchema);
module.exports = { Pedido };
