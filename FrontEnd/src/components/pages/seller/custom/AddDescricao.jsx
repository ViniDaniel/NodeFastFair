import apiFeirante from "../../../services/apiFeirante";
import { FeiranteContext } from "../../../context/FeiranteContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../../styles/pages_styles/CadastroDescricao.module.css";
import {
  isValidDescricao,
  adicionarItem,
  removerItem,
  adicionarContato,
} from "../../../scripts/FormUtils.js";

function AddDescricao() {
  const { feirante } = useContext(FeiranteContext);
  const [form, setForm] = useState({
    descricao: "",
    topicos: [],
    enderecos: [],
    contatos: [],
    capa: "",
  });

  const [novoTopico, setNovoTopico] = useState("");
  const [novoEndereco, setNovoEndereco] = useState("");
  const [novoContato, setNovoContato] = useState({ tipo: "", valor: "" });

  const [error, setError] = useState();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }
  function adicionarTopico() {
    const novaLista = adicionarItem(form.topicos, novoTopico);
    setForm((prev) => ({ ...prev, topicos: novaLista }));
    setNovoTopico("");
  }

  function removerTopico(index) {
    const novaLista = removerItem(form.topicos, index);
    setForm((prev) => ({ ...prev, topicos: novaLista }));
  }

  function adicionarEndereco() {
    const novaLista = adicionarItem(form.enderecos, novoEndereco);
    setForm((prev) => ({ ...prev, enderecos: novaLista }));
    setNovoEndereco("");
  }

  function removerEndereco(index) {
    const novaLista = removerItem(form.enderecos, index);
    setForm((prev) => ({ ...prev, enderecos: novaLista }));
  }

  function adicionarContatoHandler() {
    const novaLista = adicionarContato(form.contatos, novoContato);
    setForm((prev) => ({ ...prev, contatos: novaLista }));
    setNovoContato({ tipo: "", valor: "" });
  }

  function removerContato(index) {
    const novaLista = removerItem(form.contatos, index);
    setForm((prev) => ({ ...prev, contatos: novaLista }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidDescricao(form.descricao))
      return setError("A descrição precisa ter mais de 50 caracteres");

    try {
      await apiFeirante.post(`/feirante/descricao/${feirante._id}`, form);
      alert("Descrição criada com sucesso!");
      navigate("/feirante/descricao");
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao cadastrar descrição");
      }
    }
  }

  return (
    <div>
      <div className={styles.div}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.h1}>Adicione uma descrição</h1>

          <div className={styles.field}>
            <label htmlFor="descricao" className={styles.label}>
              Descrição
            </label>
            <textarea
              rows="5"
              name="descricao"
              placeholder="Conte um pouco sobre você..."
              value={form.descricao}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>

          {/* Tópicos */}
          <div className={styles.field}>
            <label className={styles.label}>Tópicos</label>
            <div className={styles.flexRow}>
              <input
                type="text"
                value={novoTopico}
                onChange={(e) => setNovoTopico(e.target.value)}
                placeholder="Adicionar novo tópico"
              />
              <button type="button" onClick={adicionarTopico}>
                +
              </button>
            </div>
            <ul className={styles.ul}>
              {form.topicos.map((topico, index) => (
                <li key={index} className={styles.li}>
                  {topico}{" "}
                  <button type="button" onClick={() => removerTopico(index)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Endereços */}
          <div className={styles.field}>
            <label className={styles.label}>Endereços</label>
            <div className={styles.flexRow}>
              <input
                type="text"
                value={novoEndereco}
                onChange={(e) => setNovoEndereco(e.target.value)}
                placeholder="Adicionar novo endereço"
              />
              <button type="button" onClick={adicionarEndereco}>
                +
              </button>
            </div>
            <ul className={styles.ul}>
              {form.enderecos.map((end, index) => (
                <li key={index} className={styles.li}>
                  {end}{" "}
                  <button type="button" onClick={() => removerEndereco(index)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatos */}
          <div className={styles.field}>
            <label className={styles.label}>Contatos</label>
            <div className={styles.flexRow}>
              <select
                value={novoContato.tipo}
                onChange={(e) =>
                  setNovoContato((prev) => ({ ...prev, tipo: e.target.value }))
                }
                className={styles.select}
              >
                <option value="">Tipo</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="instagram">Instagram</option>
              </select>
              <input
                type="text"
                value={novoContato.valor}
                onChange={(e) =>
                  setNovoContato((prev) => ({
                    ...prev,
                    valor: e.target.value,
                  }))
                }
                placeholder="Valor do contato"
              />
              <button type="button" onClick={adicionarContatoHandler}>
                +
              </button>
            </div>
            <ul className={styles.ul}>
              {form.contatos.map((contato, index) => (
                <li key={index} className={styles.li}>
                  {contato.tipo}: {contato.valor}{" "}
                  <button type="button" onClick={() => removerContato(index)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Capas */}
          <div className={styles.field}>
            <label className={styles.label}>Capa</label>

            <input
              type="text"
              value={form.capa}
              onChange={handleChange}
              placeholder="https://imagem.com"
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Salvar descrição
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDescricao;
