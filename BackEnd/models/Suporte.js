const mongoose = require("mongoose")
const {Schema} = mongoose

const suporteSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    motivo: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 500,
    },
}, {timestamps: true})

const Suporte = mongoose.model("Suporte", suporteSchema)

module.exports = {Suporte}