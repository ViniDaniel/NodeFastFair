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

    <div className={styles.div}>
      <form className={styles.form}>
      <h1>Cadastrar Cliente</h1>
        <div className={styles.field}>
          <label htmlFor="nome" className={styles.label}>Nome:</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Digite seu nome: "
            ref={inputNome}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="cpf" className={styles.label}>CPF:</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Digite seu CPF: "
            ref={inputCpf}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>E-Mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email: "
            ref={inputEmail}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="celular" className={styles.label}>Celular:</label>
          <input
            type="tel"
            name="celular"
            id="celular"
            placeholder="Digite seu numero de celular: "
            ref={inputCelular}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="genero" className={styles.label}>Gênero:</label>
          <select name="genero" id="genero" defaultValue="" ref={inputGenero} className={styles.input}>
            <option disabled value="">
              Selecione um gênero
            </option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
            <option value="naoInformado">Prefiro não informar</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="senha" className={styles.label}>Senha:</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite sua senha: "
            ref={inputSenha}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="confirmarSenha" className={styles.label}>Confirmar Senha:</label>
          <input
            type="password"
            name="confirmarSenha"
            id="confirmarSenha"
            placeholder="Digite sua senha novamente: "
            ref={inputConfirmarSenha}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit" className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              postUser();
            }}
          >
            Cadastrar
          </button>

          <button type="reset" className={styles.button}>Cancelar</button>
        </div>
      </form>

      
    </div>
    </div>
  );
}

export default CadastroCliente;
