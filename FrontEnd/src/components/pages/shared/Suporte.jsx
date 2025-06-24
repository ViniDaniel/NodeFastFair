import api from "../../services/api";
import { useState } from "react";
import styles from "../../../styles/pages_styles/FAQ.module.css";
import FAQ from "./FAQ";
import SuporteContatos from "./SuporteContatos";

function Suporte() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    motivo: "",
  });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);
    setSuccessMessage(false);

    try {
      if (!form.nome.trim()) {
        setError("O nome não pode ser vazio.");
        return;
      }
      if (form.motivo.trim().length < 50 || form.motivo.trim().length > 500) {
        setError(
          "O motivo deve conter no mínimo 50 caracteres e no máximo 500 caracteres."
        );
        return;
      }
      await api.post("/suporte", form);
      setSuccessMessage(true);
      setError("");
      setForm({ nome: "", email: "", motivo: "" });

      setTimeout(() => {
        setSuccessMessage(false);
      }, 4000);
    } catch (error) {
      setSuccessMessage(false);
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao enviar mensagem de suporte");
      }
    }
  }
  return (
    <div>
    
      <FAQ />
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.p_suporte}>Envie uma mensagem para o Fast&Fair, seja dúvida, reclamações ou sugestões</p>
        <div className={styles.field}>
          <label htmlFor="nome" className={styles.label}>
            Seu Nome
          </label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o seu nome, de preferência completo"
            value={form.nome}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Escreva seu e-mail"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="motivo" className={styles.label}>
            Motivo
          </label>
          <textarea
            rows={5}
            cols={20}
            name="motivo"
            placeholder="Digite o que você deseja, qual o seu problema, dica, ou duvida "
            value={form.motivo}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            Enviar Mensagem
          </button>
          <button
            type="reset"
            className={styles.button}
            onClick={() => setForm({ nome: "", email: "", motivo: "" })}
          >
            Cancelar
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && (
          <div className={styles.successMessage}>
            Mensagem enviada com sucesso! Retornaremos a resposta pro seu Email
          </div>
        )}
      </form>

      <SuporteContatos />
    </div>
  );
}

export default Suporte;
