const { Pedido: PedidoModel } = require("../../models/Pedido");
const { Carrinho: CarrinhoModel } = require("../../models/Carrinho");
const { getMercadoPagoClient } = require("../../api/mercadoPago");
const { Feirante } = require("../../models/Feirante"); // Se quiser buscar o token via feiranteId

const pedidoController = {
  // Buscar pedidos do cliente autenticado
  getByCliente: async (req, res) => {
    try {
      const clienteId = req.cliente.id; // 🔒 Protegido
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

  // Atualizar o status do pedido
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

  // Webhook de notificação do Mercado Pago
  webhook: async (req, res) => {
    try {
      console.log("🔔 Webhook recebido:", JSON.stringify(req.body, null, 2));

      const body = req.body;
      let paymentId = null;

      if (body.type === "payment" && body.data?.id) {
        paymentId = body.data.id;
      } else if (body.topic === "payment" && body.resource) {
        paymentId = body.resource;
      } else if (body.topic === "merchant_order") {
        console.log("🔄 Ignorado: merchant_order");
        return res.sendStatus(200);
      } else {
        console.error("❌ Webhook inválido:", body);
        return res.sendStatus(400);
      }

      // Buscar pagamento do Mercado Pago (usando token do feirante se houver)
      let pagamento;
      try {
        const client = getMercadoPagoClient(process.env.MP_ACCESS_TOKEN); // fallback
        const { payment } = client;
        const response = await payment.get({ id: paymentId });

        pagamento = response.body || response;

        if (!pagamento || !pagamento.status) {
          console.warn("⚠️ Pagamento com estrutura inválida:", pagamento);
          return res.sendStatus(200);
        }
      } catch (err) {
        if (err?.status === 404) {
          console.warn("⚠️ Pagamento não encontrado:", paymentId);
          return res.sendStatus(200);
        }
        console.error("❌ Erro ao buscar pagamento:", err);
        return res.sendStatus(500);
      }

      if (pagamento.status === "approved") {
        const { clienteId, carrinhoId } = pagamento.metadata || {};

        if (!clienteId || !carrinhoId) {
          console.warn("⚠️ Metadata ausente no pagamento:", pagamento.metadata);
          return res.sendStatus(200);
        }

        const carrinho = await CarrinhoModel.findById(carrinhoId).populate(
          "itens.produtoId"
        );

        if (!carrinho) {
          console.warn("⚠️ Carrinho não encontrado:", carrinhoId);
          return res.sendStatus(200);
        }

        // Verificar duplicidade
        const pedidoExistente = await PedidoModel.findOne({
          pagamentoId: pagamento.id,
        });

        if (pedidoExistente) {
          console.warn("⚠️ Pedido já existente:", pagamento.id);
          return res.sendStatus(200);
        }

        const produtos = carrinho.itens.map((item) => ({
          produtoId: item.produtoId._id,
          quantidade: item.quantidade,
        }));

        const total = carrinho.itens.reduce((soma, item) => {
          return soma + item.produtoId.preco * item.quantidade;
        }, 0);

        const pedido = new PedidoModel({
          clienteId,
          produtos,
          total,
          status: "confirmado",
          pagamentoId: pagamento.id,
        });

        await pedido.save();
        await CarrinhoModel.findByIdAndDelete(carrinhoId);

        console.log("✅ Pedido criado:", pedido._id);
      } else {
        console.log("⏳ Pagamento ainda não aprovado:", pagamento.status);
      }

      return res.sendStatus(200);
    } catch (error) {
      console.error("❌ Erro no webhook:", error);
      return res.sendStatus(500);
    }
  },
};

module.exports = pedidoController;
