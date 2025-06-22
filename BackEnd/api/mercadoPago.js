const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

// Função que retorna instâncias configuradas com o access token do feirante
function getMercadoPagoClient(accessToken) {
  if (!accessToken) {
    throw new Error("Access Token do Mercado Pago não fornecido.");
  }

  const client = new MercadoPagoConfig({ accessToken });

  return {
    preference: new Preference(client),
    payment: new Payment(client),
  };
}


module.exports = {
  getMercadoPagoClient,
};
