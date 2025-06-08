import apiFeirante from "../services/apiFeirante";

//atualizar descrição
export const atualizarDescricao = async (
  feiranteId,
  descricaoId,
  descricao
) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/descricao/atualizar`,
    { descricao }
  );
};

//adicionar topico
export const adicionarTopico = async (feiranteId, descricaoId, novoTopico) => {
  return await apiFeirante.post(
    `/feirante/descricao/${feiranteId}/${descricaoId}/topicos`,
    { novoTopico }
  );
};

//atualizar tópico
export const atualizarTopico = async (feiranteId, descricaoId, topicos) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/topicos/atualizar`,
    { topicos }
  );
};

//remover tópico
export const removerTopico = async (feiranteId, descricaoId, topico) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/topicos/remove`,
    { topico }
  );
};

//adicionar endereço
export const adicionarEndereco = async (
  feiranteId,
  descricaoId,
  novoEndereco
) => {
  return await apiFeirante.post(
    `/feirante/descricao/${feiranteId}/${descricaoId}/enderecos`,
    { novoEndereco }
  );
};

//atualizar endereço
export const atualizarEndereco = async (feiranteId, descricaoId, enderecos) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/enderecos/atualizar`,
    { enderecos }
  );
};

//remover endereço
export const removeEndereco = async (feiranteId, descricaoId, endereco) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/enderecos/remove`,
    { endereco }
  );
};

//adicionar contato
export const adicionarContato = async (
  feiranteId,
  descricaoId,
  novoContato
) => {
  return await apiFeirante.post(
    `/feirante/descricao/${feiranteId}/${descricaoId}/contatos`,
    { novoContato }
  );
};

//atualizar contato
export const atualizarContato = async (feiranteId, descricaoId, contatos) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/contatos/atualizar`,
    { contatos }
  );
};

//remover contato
export const removeContato = async (feiranteId, descricaoId, contato) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/contatos/remove`,
    { contato }
  );
};

//atualizar capa
export const atualizarCapa = async (feiranteId, descricaoId, capa) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/capa/atualizar`,
    { capa }
  );
};