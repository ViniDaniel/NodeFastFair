import {
  isValidCPF,
  isValidEmail,
  isValidCelular,
  isValidNome,
  isValidGenero,
  isValidSenha,
} from "../../scripts/FormValidation";
import apiCliente from "../../services/apiCliente";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/pages_styles/Cadastro.module.css";

function CadastroCliente() {
  const inputNome = useRef();
  const inputCpf = useRef();
  const inputEmail = useRef();
  const inputCelular = useRef();
  const inputGenero = useRef();
  const inputSenha = useRef();
  const inputConfirmarSenha = useRef();

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();

  async function postUser() {
    const nome = inputNome.current.value;
    const cpf = inputCpf.current.value;
    const email = inputEmail.current.value;
    const celular = inputCelular.current.value;
    const genero = inputGenero.current.value;
    const senha = inputSenha.current.value;
    const confirmarSenha = inputConfirmarSenha.current.value;

    if (!isValidNome(nome)) return setError("Nome inválido!");
    if (!isValidCPF(cpf)) return setError("CPF inválido!");
    if (!isValidEmail(email)) return setError("E-Mail inválido!");
    if (!isValidCelular(celular)) return setError("Celular inválido!");
    if (!isValidGenero(genero))
      return setError("Por favor, selecione um gênero válido.");
    const senhaValidacao = isValidSenha(senha, confirmarSenha);
    if (!senhaValidacao.valid) return setError(senhaValidacao.message);

    try {
      await apiCliente.post("/clientes", {
        nome,
        cpf,
        email,
        celular,
        genero,
        senha,
        confirmarSenha,
      });
      setSuccessMessage(true);
      setError("");

      setTimeout(() => {
        setSuccessMessage(false);
        navigate("/loginCliente");
      }, 2000);
    } catch (err) {
      setSuccessMessage(false);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao cadastrar cliente. Tente novamente.");
      }
    }
  }

  return (
    <div>
      <div className={styles.div}>
        <form className={styles.form}>
          <h1>Efetue seu Cadastro!</h1>
          <div className={styles.field}>
            <label htmlFor="nome" className={styles.label}>
              Nome:
            </label>
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
            <label htmlFor="cpf" className={styles.label}>
              CPF:
            </label>
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
            <label htmlFor="email" className={styles.label}>
              E-Mail:
            </label>
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
            <label htmlFor="celular" className={styles.label}>
              Celular:
            </label>
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
            <label htmlFor="genero" className={styles.label}>
              Gênero:
            </label>
            <select
              name="genero"
              id="genero"
              defaultValue=""
              ref={inputGenero}
              className={styles.input}
            >
              <option disabled value="">
                Selecione um gênero
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
              <option value="Não Informado">Prefiro não informar</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="senha" className={styles.label}>
              Senha:
            </label>
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
            <label htmlFor="confirmarSenha" className={styles.label}>
              Confirmar Senha:
            </label>
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
              type="submit"
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                postUser();
              }}
            >
              Cadastrar
            </button>

            <button type="reset" className={styles.button}>
              Cancelar
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && (
            <div className={styles.successMessage}>
              Cadastro realizado com sucesso! Redirecionando...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CadastroCliente;
