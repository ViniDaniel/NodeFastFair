import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiCliente from "../../services/apiCliente";
import { ClienteContext } from "../../context/ClienteContext";
import styles from "../../../styles/pages_styles/Cadastro.module.css";
import {
  isValidCelular,
  isValidGenero,
  isValidNome,
} from "../../scripts/FormValidation";

function AtualizarCliente() {
  const { cliente } = useContext(ClienteContext);
  const [form, setForm] = useState({
    nome: "",
    celular: "",
    genero: "",
  });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cliente vindo do contexto:", cliente);
    if (cliente) {
      setForm({
        nome: cliente.nome || "",
        celular: cliente.celular || "",
        genero: cliente.genero || "",
      });
    }
  }, [cliente]);

  function handlechange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function putUser(e) {
    e.preventDefault();
    if (!isValidNome(form.nome)) {
      setError("Nome inválido.");
      return;
    }

    if (!isValidCelular(form.celular)) {
      setError("Celular inválido. Deve ter pelo menos 11 dígitos.");
      return;
    }

    if (!isValidGenero(form.genero)) {
      setError("Gênero inválido.");
      return;
    }
    try {
      await apiCliente.put(`/clientes/`, form);
      setSuccessMessage(true);
      setError("");

      setTimeout(() => {
        setSuccessMessage(false);
        navigate("/perfilCliente");
      }, 2000);
    } catch (err) {
      setSuccessMessage(false);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao atualizar os dados.");
      }
    }
  }
  return (
    <div className={styles.div}>
      <form onSubmit={putUser} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="nome" className={styles.label}>
            Nome:{" "}
          </label>
          <input
            name="nome"
            value={form.nome}
            onChange={handlechange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="celular" className={styles.label}>
            Celular:
          </label>
          <input
            name="celular"
            value={form.celular}
            onChange={handlechange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="genero" className={styles.label}>
            Genero:
          </label>
          <select
            name="genero"
            value={form.genero}
            onChange={handlechange}
            className={styles.input}
          >
            <option disabled value="">
              Selecione um Gênero
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
            <option value="Não Informado">Prefiro não Informar</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            Salvar
          </button>
          <button type="reset" className={styles.button}>
            Cancelar
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && (
          <div className={styles.successMessage}>
            Perfil atualizado com sucesso!
          </div>
        )}
      </form>
    </div>
  );
}

export default AtualizarCliente;
