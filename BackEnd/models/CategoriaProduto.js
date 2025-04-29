const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoriaProdutoSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const CategoriaProduto = mongoose.model("CategoriaProduto", categoriaProdutoSchema);
module.exports = { CategoriaProduto };