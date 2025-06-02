const mongoose = require("mongoose");
const { Carrinho: CarrinhoModel } = require("../../models/Carrinho");
const { Pedido: PedidoModel } = require("../../models/Pedido");

const carrinhoController = {
  adicionarProduto: async (req, res) => {
    try {
      const { produtoId, quantidade } = req.body;
      const clienteId = req.cliente.id;

      let carrinho = await CarrinhoModel.findOne({ clienteId });

      if (!carrinho) {
        carrinho = new CarrinhoModel({ clienteId, itens: [] });
      }
      const produtoObjectId = new mongoose.Types.ObjectId(produtoId);
      const itemExistente = carrinho.itens.find((item) =>
        item.produtoId.equals(produtoObjectId)
      );

      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        carrinho.itens.push({ produtoId, quantidade });
      }

      await carrinho.save();
      return res.status(200).json(carrinho);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao adicionar produto ao carrinho",
        error: error.message,
      });
    }
  },
  listarCarrinho: async (req, res) => {
    try {
      const clienteId = req.cliente.id;

      const carrinho = await CarrinhoModel.findOne({ clienteId }).populate(
        "itens.produtoId"
      );
      if (!carrinho) {
        return res.status(200).json({ itens: [], total: 0 });
      }

      // Calcula o total com base nos produtos populados
      const total = carrinho.itens.reduce((soma, item) => {
        const preco = item.produtoId?.preco || 0;
        return soma + preco * item.quantidade;
      }, 0);

      return res.status(200).json({ ...carrinho.toObject(), total });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao listar carrinho", error: error.message });
    }
  },

  removerProduto: async (req, res) => {
    try {
      const clienteId = req.cliente.id;
      const { produtoId } = req.params;

      const carrinho = await CarrinhoModel.findOne({ clienteId });

      if (!carrinho) {
        return res.status(404).json({ message: "Carrinho não encontado" });
      }

      carrinho.itens = carrinho.itens.filter(
        (item) => !item.produtoId.equals(produtoId)
      );
      await carrinho.save();

      return res.status(200).json(carrinho);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao remover produto", error: error.message });
    }
  },

  aumentarQuantidade: async (req, res) => {
    try {
      const clienteId = req.cliente.id;
      const { produtoId } = req.params;

      const carrinho = await CarrinhoModel.findOne({ clienteId });

      const item = carrinho.itens.find(
        (i) => i.produtoId.toString() === produtoId
      );

      if (!item) {
        return res
          .status(404)
          .json({ message: "Produto não encontrado no carrinho" });
      }

      item.quantidade += 1;
      await carrinho.save();
      return res.status(200).json(carrinho);
    } catch (error) {
      console.error("Erro ao aumentar quantidade:", error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar carrinho", error: error.message });
    }
  },

  diminuirQuantidade: async (req, res) => {
    try {
      const clienteId = req.cliente.id;
      const { produtoId } = req.params;

      const carrinho = await CarrinhoModel.findOne({ clienteId });

      const item = carrinho.itens.find(
        (i) => i.produtoId.toString() === produtoId
      );
      if (!item) {
        return res
          .status(404)
          .json({ message: "Produto não encontrado no carrinho" });
      }

      if (item.quantidade > 1) {
        item.quantidade -= 1;
      } else {
        carrinho.itens = carrinho.itens.filter(
          (i) => i.produtoId.toString() !== produtoId
        );
      }

      await carrinho.save();
      return res.status(200).json(carrinho);
    } catch (error) {
      console.error("Erro ao diminuir quantidade:", error);
      return res.status(500).json({ message: "Erro ao atualizar carrinho" });
    }
  },

  finalizarPedido: async (req, res) => {
    try {
      const clienteId = req.cliente.id;

      const carrinho = await CarrinhoModel.findOne({ clienteId }).populate(
        "itens.produtoId"
      );
      if (!carrinho || carrinho.itens.length === 0) {
        return res.status(400).json({ message: "Carrinho vazio" });
      }

      const produtos = carrinho.itens.map((item) => ({
        produtoId: item.produtoId._id,
        quantidade: item.quantidade,
      }));

      let total = 0;
      carrinho.itens.forEach((item) => {
        total += item.produtoId.preco * item.quantidade;
      });

      const pedido = new PedidoModel({
        clienteId,
        produtos,
        total,
        status: "pendente",
      });

      await pedido.save();
      await CarrinhoModel.findOneAndDelete({ clienteId });

      return res
        .status(201)
        .json({ message: "Pedido finalizado com sucesso", pedido });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao finalizar pedido", error: error.message });
    }
  },
};

module.exports = carrinhoController;
