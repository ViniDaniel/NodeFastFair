/*const mongoose = require("mongoose");
const { CategoriaProduto } = require("../models/CategoriaProduto");

async function seed() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);

  const nomes = ["Fruta", "Legume", "Laticínios", "Grãos", "Verdura", "Temperos"];
  for (const nome of nomes) {
    await CategoriaProduto.updateOne({ nome }, { nome }, { upsert: true });
  }
  console.log("Categorias semeadas!");
  await mongoose.disconnect();
}

seed().catch(console.error);

Feito somente para preencher o banco de dados */
