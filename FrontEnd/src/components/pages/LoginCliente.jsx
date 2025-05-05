import LinkButton from "../layout/LinkButton";
import styles from "../../styles/pages_styles/CadastroCliente.module.css";

function loginCliente() {
  return (
    <div>
      <div className={styles.div}>
        <form className={styles.form}>
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
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Logar
            </button>

            <LinkButton to="/cadastroCliente" text="Cadastrar Cliente" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default loginCliente;
