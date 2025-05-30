require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/router");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
//evita erro com a conexção do front com o back

app.use(express.json()); //para receber dados em json

const conn = require("./db/conn"); //conexão com o banco de dados
conn(); //chama a função de conexão com o banco de dados

app.use("/api", routes); //chama as rotas

app.use("/uploads", express.static("uploads"));


app.listen(7000, function () {
  console.log("Servidor rodando na porta 7000");
});
