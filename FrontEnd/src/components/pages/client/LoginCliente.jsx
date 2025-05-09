import LinkButton from "../../layout/LinkButton";
import styles from "../../../styles/pages_styles/Cadastro.module.css";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClienteContext } from "../../context/ClienteContext";
import api from "../../services/api";

function LoginCliente() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logarCliente } = useContext(ClienteContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    const senha = inputSenha.current.value;

    try {
      const response = await api.post("/clientes/login", { email, senha });
      const cliente = response.data.cliente;

      logarCliente(cliente);

      console.log("Cliente logado:", cliente);

      navigate("/");
    } catch (err) {
      if (err.respone && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao tentar logar.");
      }
    }
  };

  return (
    <div>
      <div className={styles.div}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h1>Login Cliente</h1>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu E-Mail"
              ref={inputEmail}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="senha" className={styles.label}>
              Senha:
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite sua senha:"
              ref={inputSenha}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              Logar
            </button>

            <LinkButton to="/cadastroCliente" text="Cadastrar Cliente" />
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginCliente;
