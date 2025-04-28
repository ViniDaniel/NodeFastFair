const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const clenteSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    cpf: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 14,
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
    senha: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

clenteSchema.pre("save", async function (next) {
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

const Cliente = mongoose.model("Cliente", clenteSchema);

module.exports = {Cliente};
