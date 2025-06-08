const { Pedido: PedidoModel } = require("../../models/Pedido");
const { payment } = require("../../api/mercadoPago");
const { Carrinho } = require("../../models/Carrinho");

const pedidoController = {
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
      return res
        .status(500)
        .json({ message: "Erro ao buscar os pedidos.", error: error.message });
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
  webhook: async (req, res) => {
    try {
      const data = req.body;
      console.log("=== WEBHOOK RECEBIDO ===");
      console.log("Body:", JSON.stringify(data, null, 2));
      console.log("Query:", req.query);
      console.log("========================");

      if (data.type === "payment") {
        const pagamento = await payment.get({ id: data.data.id });

        if (pagamento.body.status === "approved") {
          const { clienteId, carrinhoId } = pagamento.body.metadata;

          const carrinho = await Carrinho.findById(carrinhoId).populate(
            "itens.produtoId"
          );

          if (!carrinho) return res.sendStatus(200); // Já tratado ou carrinho removido

          const produtos = carrinho.itens.map((item) => ({
            produtoId: item.produtoId._id,
            quantidade: item.quantidade,
          }));

          const total = carrinho.itens.reduce((acc, item) => {
            return acc + item.produtoId.preco * item.quantidade;
          }, 0);

          const pedido = new PedidoModel({
            clienteId,
            produtos,
            total,
            status: "confirmado",
            pagamentoId: pagamento.body.id,
          });

          await pedido.save();
          await Carrinho.findByIdAndDelete(carrinhoId);

          console.log("Pedido criado com sucesso:", pedido._id);
          console.log("Carrinho removido:", carrinhoId);
        }
      }

      return res.sendStatus(200);
    } catch (error) {
      console.error("Erro no webhook do Mercado Pago:", error);
      console.error("Stack:", error.stack);
      return res.sendStatus(500);
    }
  },
};

module.exports = pedidoController;
