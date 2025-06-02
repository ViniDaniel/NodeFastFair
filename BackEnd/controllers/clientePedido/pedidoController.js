const { Pedido: PedidoModel } = require("../../models/Pedido")
const { Produto: ProdutoModel } = require("../../models/Produto");

const pedidoController = {
  // Criar novo pedido
  create: async (req, res) => {
    try {
      const { clienteId, produtos } = req.body;

      if (!clienteId || !produtos || !Array.isArray(produtos) || produtos.length === 0) {
        return res.status(400).json({ message: "Dados incompletos para criar o pedido." });
      }

      let total = 0;

      // Valida cada produto e calcula o total
      for (let item of produtos) {
        const produto = await ProdutoModel.findById(item.produtoId);
        if (!produto) {
          return res.status(404).json({ message: `Produto não encontrado: ${item.produtoId}` });
        }

        total += produto.preco * item.quantidade;
      }

      const novoPedido = new PedidoModel({
        clienteId,
        produtos,
        total,
      });

      await novoPedido.save();
      return res.status(201).json(novoPedido);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar o pedido.", error: error.message });
    }
  },

  // Buscar todos os pedidos de um cliente
  getByCliente: async (req, res) => {
    try {
      const { clienteId } = req.params;

      const pedidos = await PedidoModel.find({ clienteId })
        .populate("produtos.produtoId")
        .sort({ dataPedido: -1 });

      return res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar os pedidos.", error: error.message });
    }
  },

  // Atualizar status do pedido
  updateStatus: async (req, res) => {
    try {
      const { pedidoId } = req.params;
      const { status } = req.body;

      const pedido = await PedidoModel.findById(pedidoId);
      if (!pedido) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      pedido.status = status;
      await pedido.save();

      return res.status(200).json(pedido);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar o pedido." });
    }
  },
};

module.exports = pedidoController;
