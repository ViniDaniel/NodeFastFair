import LinkButton from "../../layout/LinkButton";
import styles from "../../../styles/pages_styles/Cadastro.module.css";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeiranteContext } from "../../context/FeiranteContext";
import apiFeirante from "../../services/apiFeirante";

function LoginFeirante() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logarFeirante } = useContext(FeiranteContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    const senha = inputSenha.current.value;

    try {
      const response = await apiFeirante.post("/feirantes/login", { email, senha });
      const {feirante, token} = response.data

      localStorage.setItem("token", token)

      logarFeirante(feirante);

      console.log("Feirante Logado", feirante);

      navigate("/feirante/descricao");
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao tentar logar.");
      }
    }
  };

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1>Login Feirante</h1>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            E-Mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu E-Mail..."
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
            placeholder="Digite sua Senha..."
            ref={inputSenha}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            Logar
          </button>
          <LinkButton to="/cadastroFeirante" text="Cadastre-se" />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginFeirante;
