const mercadopago = require("mercadopago");

const client = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const { Preference, Payment } = require("mercadopago");

const preference = new Preference(client);
const payment = new Payment(client);

module.exports = {
  preference,
  payment,
};