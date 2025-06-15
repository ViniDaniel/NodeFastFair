const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

// Função que retorna instâncias configuradas com o access token do feirante
function getMercadoPagoClient(accessToken) {
  const client = new MercadoPagoConfig({ accessToken });

  return {
    preference: new Preference(client),
    payment: new Payment(client),
  };
}

module.exports = {
  getMercadoPagoClient,
};
