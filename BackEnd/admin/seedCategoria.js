/*const mongoose = require("mongoose");
const { CategoriaProduto } = require("../models/CategoriaProduto");

async function seed() {
  await mongoose.connect("mongodb://localhost:27017/fastfair", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const nomes = ["Fruta", "Legume", "Vegetal", "Grãos", "Verdura", "Temperos"];
  for (const nome of nomes) {
    await CategoriaProduto.updateOne(
      { nome },
      { nome },
      { upsert: true }
    );
  }
  console.log("Categorias semeadas!");
  await mongoose.disconnect();
}

seed().catch(console.error);



Feito somente para preencher o banco de dados
*/