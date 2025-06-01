const router = require("express").Router();
const capaFeiranteController = require("../controllers/descricaoFeirante/capasFeiranteController");
const contatosFeiranteController = require("../controllers/descricaoFeirante/contatosFeiranteController");
const descricaoFeiranteController = require("../controllers/descricaoFeirante/descricaoFeiranteController");
const descricaoFeirantePatchController = require("../controllers/descricaoFeirante/descricaoFeirantePatchController");
const enderecosFeiranteController = require("../controllers/descricaoFeirante/enderecosFeiranteController");
const topicosFeiranteController = require("../controllers/descricaoFeirante/topicosFeiranteController");
const authFeirante = require("../middlewares/authFeirante");

router
  .route("/feirante/descricao/:feiranteId")
  .post(authFeirante, (req, res) =>
    descricaoFeiranteController.create(req, res)
  );

router
  .route("/feirante/descricao/")
  .get((req, res) => descricaoFeiranteController.getAll(req, res));

router
  .route("/feirante/descricao/:feiranteId")
  .get(authFeirante, (req, res) => descricaoFeiranteController.get(req, res));
  
router
  .route("/feirante/descricao/:feiranteId/:descricaoFeiranteId")
  .delete(authFeirante, (req, res) =>
    descricaoFeiranteController.delete(req, res)
  );

router
  .route("/feirante/descricao/:feiranteId/:descricaoFeiranteId")
  .put(authFeirante, (req, res) =>
    descricaoFeiranteController.update(req, res)
  );

// Atualização, edição e delete indivual
// Tópicos
router.patch(
  "/feirante/descricao/:feiranteId/:descricaoFeiranteId/topicos/atualizar",
  authFeirante,
  (req, res) => topicosFeiranteController.patchTopico(req, res)
);
router.post(
  "/feirante/descricao/:feiranteId/:descricaoFeiranteId/topicos",
  authFeirante,
  (req, res) => topicosFeiranteController.addTopico(req, res)
);
router.patch(
  "/feirante/descricao/:feiranteId/:descricaoFeiranteId/topicos/remove",
  authFeirante,
  (req, res) => topicosFeiranteController.deleteTopico(req, res)
);

// Endereços
router.patch("/feirante/descricao/:feiranteId/:descricaoFeiranteId/enderecos/atualizar", authFeirante, (req, res) =>
  enderecosFeiranteController.patchEndereco(req, res)
);
router.post("/feirante/descricao/:feiranteId/:descricaoFeiranteId/enderecos", authFeirante, (req, res) =>
  enderecosFeiranteController.addEndereco(req, res)
);
router.patch("/feirante/descricao/:feiranteId/:descricaoFeiranteId/enderecos/remove", authFeirante, (req, res) =>
  enderecosFeiranteController.deleteEndereco(req, res)
);


//Contatos
router.patch("/feirante/descricao/:feiranteId/:descricaoFeiranteId/contatos/atualizar", authFeirante, (req, res) =>
  contatosFeiranteController.patchContato(req, res)
);
router.post("/feirante/descricao/:feiranteId/:descricaoFeiranteId/contatos", authFeirante, (req, res) =>
  contatosFeiranteController.addContato(req, res)
);
router.patch("/feirante/descricao/:feiranteId/:descricaoFeiranteId/contatos/remove", authFeirante, (req, res) =>
  contatosFeiranteController.deleteContato(req, res)
);

//Capa
router.patch("/feirante/descricao/:feiranteId/:descricaoFeiranteId/capa/atualizar", authFeirante, (req, res) =>
  capaFeiranteController.patchCapa(req, res)
);

//Descrição (somente atualização)
router.patch("/feirante/descricao/:feiranteId/:descricaoFeiranteId/descricao/atualizar", authFeirante, (req, res) =>
  descricaoFeirantePatchController.patchDescricao(req, res)
);
module.exports = router;
