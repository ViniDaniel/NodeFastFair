export function adicionarItem(lista, novoItem) {
  if (novoItem.trim() === "") return lista;
  return [...lista, novoItem.trim()];
}

export function removerItem(lista, index) {
  return lista.filter((_, i) => i !== index);
}

export function adicionarContato(lista, contato) {
  const { tipo, valor } = contato;
  if (!tipo || valor.trim() === "") return lista;
  return [...lista, { tipo, valor: valor.trim() }];
}
export function isValidDescricao(descricao){
  return (!descricao || descricao.length >= 50)
}

