export function isValidNomeProduto(nome) {
  return nome && nome.trim() !== "";
}

export function isValidCategoria(categoria) {
  return (
    typeof categoria === "string" &&
    categoria.trim() !== "" &&
    categoria !== "Selecione"
  );
}

export function formatPreco(precoInput) {
  if (precoInput === null || precoInput === undefined || precoInput.toString().trim() === "") {
    return "";
  }

  let precoNumerico = typeof precoInput === "number"
    ? precoInput
    : parseFloat(precoInput.toString().replace(",", "."));

  if (isNaN(precoNumerico)) {
    return "";
  }

  return precoNumerico.toFixed(2).replace(".", ",");
}

// A sua função isValidPreco pode continuar simples para apenas verificar se não está vazio
export function isValidPreco(preco) {
    return preco && preco.toString().trim() !== "";
}

export function isValidPeso(peso){
    return peso && peso.trim() !== "";
}
export function isValidQuantidade(quantidade){
  return quantidade && quantidade.trim() !== "";
}
export function isValidImagem(imagem){
  return imagem && imagem.trim() !== "";
}
export function isValidDescricao(descricao){
  return (!descricao || descricao.length <= 100)
}
