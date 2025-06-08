const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado com sucesso ao banco");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

module.exports = main;