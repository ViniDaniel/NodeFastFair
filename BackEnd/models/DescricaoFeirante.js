const mongoose = require("mongoose");
const { Schema } = mongoose;

const descricaoFeiranteSchema = new Schema(
  {
    feiranteId: {
      type: Schema.Types.ObjectId,
      ref: "Feirante",
      required: true,
    },
    descricao: {
      type: String,
      required: true,
      minlength: 50,
    },
    topicos: {
      type:[String],
      default: [],
    },
    enderecos: {
      type: [String],
      default: [],
    },
    contatos: {
      type: [
        {
          tipo: { type: String }, // 'whatsapp', 'email', 'instagram'
          valor: { type: String },
        },
      ],
      default: [],
    },
    capa: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const DescricaoFeirante = mongoose.model(
  "DescricaoFeirante",
  descricaoFeiranteSchema
);

module.exports = { DescricaoFeirante };
