export function isValidCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, "");

  // Verifica se tem 11 dígitos ou é uma sequência repetida (inválida)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  // Verifica primeiro dígito
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  // Verifica segundo dígito
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

export function isValidEmail(email) {
  const emailregex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  return emailregex.test(email);
}

export function isValidCelular(celular) {
  const celularRegex =
    /^(?:(?:\+|00)?55)?\(?([1-9]{2})\)?\s?9?[0-9]{4}-?[0-9]{4}$/;
  return celularRegex.test(celular);
}

export function isValidMercadoPagoId(mercadoPagoId){
  return mercadoPagoId && mercadoPagoId.trim() !== ""
}

export function isValidNome(nome) {
  return nome && nome.trim() !== "";
}

export function isValidGenero(genero) {
  return genero && genero.trim() !== "";
}

export function isValidSenha(senha, confirmaSenha) {
  const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!senhaRegex.test(senha)) {
    return {
      valid: false,
      message:
        "A senha deve ter no mínimo 6 caracteres, com pelo menos uma letra e um número.",
    };
  }

  if (senha !== confirmaSenha) {
    return { valid: false, message: "As senhas não coincidem." };
  }

  return { valid: true };
}


export function isValidEndereco(endereco){
  return endereco && endereco.trim() !== "";
}

export function isValidBairro(bairro){
  return bairro && bairro.trim() !== "";
}
export function isValidCidade(cidade){
  return cidade && cidade.trim() !== "";
}
export function isValidUF(uf){
  return uf && uf.trim() !== "";
}