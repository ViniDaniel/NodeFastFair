import apiFeirante from "../services/apiFeirante";

//atualizar descrição
export const atualizarDescricao = async (
  feiranteId,
  descricaoId,
  descricao
) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/descricao/atualizar`,
    { descricao },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//adicionar topico
export const adicionarTopico = async (feiranteId, descricaoId, novoTopico) => {
  return await apiFeirante.post(
    `/feirante/descricao/${feiranteId}/${descricaoId}/topicos`,
    { novoTopico },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//atualizar tópico
export const atualizarTopico = async (feiranteId, descricaoId, topicos) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/topicos/atualizar`,
    { topicos },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//remover tópico
export const removerTopico = async (feiranteId, descricaoId, topico) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/topicos/remove`,
    { topico },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
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
    { novoEndereco },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//atualizar endereço
export const atualizarEndereco = async (feiranteId, descricaoId, enderecos) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/enderecos/atualizar`,
    { enderecos },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//remover endereço
export const removeEndereco = async (feiranteId, descricaoId, endereco) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/enderecos/remove`,
    { endereco },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
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
    { novoContato },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//atualizar contato
export const atualizarContato = async (feiranteId, descricaoId, contatos) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/contatos/atualizar`,
    { contatos },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//remover contato
export const removeContato = async (feiranteId, descricaoId, contato) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/contatos/remove`,
    { contato },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

//atualizar capa
export const atualizarCapa = async (feiranteId, descricaoId, capa) => {
  return await apiFeirante.patch(
    `/feirante/descricao/${feiranteId}/${descricaoId}/capa/atualizar`,
    { capa },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};