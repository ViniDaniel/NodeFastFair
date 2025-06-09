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
      console.log("Webhook recebido:", JSON.stringify(req.body, null, 2));

      const body = req.body;

      let paymentId = null;

      // CASO 1 - Webhook padrão do Checkout Pro ou Transparente (data.id)
      if (body.type === "payment" && body.data?.id) {
        paymentId = body.data.id;
      }
      // CASO 2 - Webhook do tipo "topic: payment" (resource = id)
      else if (body.topic === "payment" && body.resource) {
        paymentId = body.resource;
      }
      // CASO 3 - Webhook "merchant_order" (ignorar ou implementar futuramente)
      else if (body.topic === "merchant_order") {
        console.log("Webhook merchant_order recebido, ignorado por enquanto.");
        return res.sendStatus(200);
      } else {
        console.error("Corpo inválido:", body);
        return res.sendStatus(400);
      }

      let pagamento;
      try {
        pagamento = await payment.get({ id: paymentId });
        console.log("Resposta do Mercado Pago:", JSON.stringify(pagamento, null, 2));


        if (!pagamento || !pagamento.body || !pagamento.body.status) {
          console.warn("Resposta inválida ao buscar pagamento:", pagamento);
          return res.sendStatus(200);
        }
      } catch (erroPagamento) {
        if (erroPagamento?.status === 404) {
          console.warn("Pagamento não encontrado:", paymentId);
          return res.sendStatus(200);
        }
        console.error("Erro ao buscar pagamento:", erroPagamento);
        return res.sendStatus(500);
      }

      if (pagamento.body.status === "approved") {
        const { clienteId, carrinhoId } = pagamento.body.metadata;

        if (!clienteId || !carrinhoId) {
          console.warn("Metadata ausente no pagamento:", pagamento.body);
          return res.sendStatus(200);
        }

        const carrinho = await Carrinho.findById(carrinhoId).populate(
          "itens.produtoId"
        );
        if (!carrinho) return res.sendStatus(200);

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

      return res.sendStatus(200);
    } catch (error) {
      console.error("Erro inesperado no webhook:", error);
      return res.sendStatus(500);
    }
  },
};

module.exports = pedidoController;
