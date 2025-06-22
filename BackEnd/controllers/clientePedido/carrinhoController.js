const mongoose = require("mongoose");
const { Carrinho: CarrinhoModel } = require("../../models/Carrinho");
const { getMercadoPagoClient } = require("../../api/mercadoPago");

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

  finalizarCompra: async (req, res) => {
  try {
    const clienteId = req.cliente.id;

    // 1. Buscar carrinho com os produtos populados
    const carrinho = await CarrinhoModel.findOne({ clienteId }).populate({
      path: "itens.produtoId",
      populate: { path: "feiranteId" },
    });

    if (!carrinho || carrinho.itens.length === 0) {
      return res.status(400).json({ message: "Carrinho vazio" });
    }

    // 2. Calcular o total do carrinho
    let total = 0;
    const produtos = [];

    const items = carrinho.itens.map((item) => {
      const produto = item.produtoId;
      const subtotal = produto.preco * item.quantidade;
      total += subtotal;

      produtos.push({
        produtoId: produto._id,
        quantidade: item.quantidade,
      });

      return {
        title: produto.nome,
        unit_price: produto.preco,
        quantity: item.quantidade,
        description: produto.descricao || "Produto",
        picture_url: produto.imagem[0] || "",
        currency_id: "BRL",
        // SPLIT de pagamento direto para o feirante
        beneficiary: {
          id: produto.feiranteId.mercadoPagoId, // Cada feirante deve ter esse campo
        },
        // Taxa do app sobre este item (ajuste a função se quiser)
        application_fee: Math.round(subtotal * 0.10), // Ex: 10% de comissão
      };
    });

    const { payment } = getMercadoPagoClient(process.env.MP_ACCESS_TOKEN);
    // 3. Criar o pagamento com Checkout Transparente
    const pagamento = await payment.create({
      body: {
        transaction_amount: total,
        description: "Pagamento de pedido no Fast&Fair",
        payment_method_id: req.body.metodoPagamento,
        payer: {
          email: req.cliente.email,
        },
        items: items,
        metadata: {
          clienteId: clienteId,
          carrinhoId: carrinho._id,
          accessToken: feirante.accessToken, 
        },
        statement_descriptor: "Fast&Fair",
      },
    });

    // 4. Salvar o pedido no banco
    const pedido = new PedidoModel({
      clienteId,
      produtos,
      total,
      status: "pago",
      pagamentoId: pagamento.id,
    });

    await pedido.save();

    // 5. Limpar o carrinho
    await CarrinhoModel.findOneAndDelete({ clienteId });

    return res.status(201).json({
      message: "Pedido realizado com sucesso",
      pedido,
      pagamento,
    });

  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
    return res.status(500).json({
      message: "Erro ao finalizar compra",
      error: error.message,
    });
  }
}
}
module.exports = carrinhoController;
