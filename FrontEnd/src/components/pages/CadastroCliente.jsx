/*import validation from "../scripts/FormValidation";*/
import api from "../services/api";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/pages_styles/CadastroCliente.module.css";

function CadastroCliente() {
  const inputNome = useRef();
  const inputCpf = useRef();
  const inputEmail = useRef();
  const inputCelular = useRef();
  const inputGenero = useRef();
  const inputSenha = useRef();
  const inputConfirmarSenha = useRef();

  async function postUser() {
    await api.post("/clientes", {
      nome: inputNome.current.value,
      cpf: inputCpf.current.value,
      email: inputEmail.current.value,
      celular: inputCelular.current.value,
      genero: inputGenero.current.value,
      senha: inputSenha.current.value,
      confirmarSenha: inputConfirmarSenha.current.value,
    });
  }

  return (
    <div>
      <form>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Digite seu nome: "
          ref={inputNome}
        />

        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          name="cpf"
          id="cpf"
          placeholder="Digite seu CPF: "
          ref={inputCpf}
        />

        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu email: "
          ref={inputEmail}
        />

        <label htmlFor="celular">Celular</label>
        <input
          type="tel"
          name="celular"
          id="celular"
          placeholder="Digite seu numero de celular: "
          ref={inputCelular}
        />

        <label htmlFor="genero">Gênero</label>
        <select name="genero" id="genero" defaultValue="" ref={inputGenero}>
          <option disabled value="">
            Selecione um gênero
          </option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
          <option value="naoInformado">Prefiro não informar</option>
        </select>

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite sua senha: "
          ref={inputSenha}
        />
        <label htmlFor="confirmarSenha">Confirmar Senha</label>
        <input
          type="password"
          name="confirmarSenha"
          id="confirmarSenha"
          placeholder="Digite sua senha novamente: "
          ref={inputConfirmarSenha}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            postUser();
          }}
        >
          Cadastrar
        </button>

        <button type="reset">Cancelar</button>
      </form>
    </div>
  );
}

export default CadastroCliente;
