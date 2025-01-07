const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB (substitua pela sua conexão)
mongoose.connect("mongodb://localhost/clientDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definição do modelo de cliente
const clienteSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
});

const Cliente = mongoose.model("Cliente", clienteSchema);

// Rotas
app.post("/api/clientes", async (req, res) => {
  const cliente = new Cliente(req.body);
  await cliente.save();
  res.json(cliente);
});

app.get("/api/clientes", async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// Rota para deletar cliente
app.delete("/api/clientes/:id", async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ message: "Cliente deletado" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
