const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27017/fastfair");

    console.log("Conectado com sucesso ao banco");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

module.exports = main;
