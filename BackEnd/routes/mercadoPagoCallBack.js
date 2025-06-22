const axios = require("axios");
const { Feirante } = require("../models/Feirante");
const authFeirante = require("../middlewares/authFeirante");
const router = require("./clienteRouter");

router.get("/mercadopago/callback", authFeirante, async (req, res) => {
  try {
    const { code } = req.query;
    const feiranteId = req.feirante.id; // Pegamos do JWT

    // Trocar o code por um access_token
    const tokenResponse = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.MERCADO_PAGO_CLIENT_ID,
        client_secret: process.env.MERCADO_PAGO_CLIENT_SECRET,
        code,
        redirect_uri: "https://nodefastfair.onrender.com/mercadopago/callback",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { access_token, user_id } = tokenResponse.data;

    // Salvar no feirante
    const feirante = await Feirante.findById(feiranteId);
    if (!feirante) return res.status(404).json({ message: "Feirante não encontrado." });

    feirante.mercadoPagoAccessToken = access_token;
    feirante.mercadoPagoUserId = user_id;
    await feirante.save();

    return res.redirect("https://node-fast-fair.vercel.app/feirante/perfil?conectado=ok");
  } catch (error) {
    console.error("Erro no callback do Mercado Pago:", error.response?.data || error);
    return res.status(500).json({ message: "Erro na integração com Mercado Pago" });
  }
});

module.exports = router