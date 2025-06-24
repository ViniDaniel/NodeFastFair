const {Suporte: SuporteModel} = require("../models/Suporte.js")

const suporteController = {
    create: async (req, res) => {
        try {
            const {nome, email, motivo} = req.body
            const suporte = {nome, email, motivo}
            
            const motivoLength = motivo.length;

		if (!nome || nome.trim().length === 0) {
                return res.status(400).json({message: "O nome não pode ser vazio."});
            }
            
            if(motivoLength < 50 || motivoLength > 300){
                return res.status(400).json({message: "O motivo deve conter no mínimo 50 caracteres e no máximo 300 caracteres"})
            }
            
            const response = await SuporteModel.create(suporte)
            
            return res.status(201).json({response, message: "Suporte enviado com sucesso!"})
            
        }
        catch(error) {
            console.log(error)
            return res.status(500).json({message: "Erro interno"})
        }
    }
}

module.exports = suporteController