import apiFeirante from "../../../services/apiFeirante";
import { useState, useContext } from "react";
import { FeiranteContext } from "../../../context/FeiranteContext";
import { useNavigate } from "react-router-dom";
import styles from "../../../../styles/pages_styles/Cadastro.module.css";
import FormCategoriaSelect from "./FormCategoriaSelect";
import {
  isValidCategoria,
  isValidNomeProduto,
  isValidPeso,
  isValidPreco,
  isValidQuantidade,
  isValidDescricao,
} from "../../../scripts/ProdutoFormValidation";
function ProdutoAdd() {
  const { feirante } = useContext(FeiranteContext);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    peso: "",
    quantidade: "",
    categoria: "",
  });

  const [imagem, setImagem] = useState(null);

  const [error, setError] = useState();

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleImagemChange(e) {
    setImagem(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidNomeProduto(form.nome))
      return setError("Digite um nome para o produto");
    if (!isValidCategoria(form.categoria))
      return setError("Escolha uma categoria válida");
    if (!isValidPreco(form.preco)) return setError("Digite o preço do produto");
    if (!isValidPeso(form.peso)) return setError("Digite o peso do produto");
    if (!isValidQuantidade(form.quantidade))
      return setError("Digite a quantidade atual de estoque");
    if (!isValidDescricao(form.descricao))
      return setError("Digite no máximo 100 letras");

    const precoFormatadoParaAPI = parseFloat(form.preco.replace(",", "."));

    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("descricao", form.descricao);
    formData.append("preco", precoFormatadoParaAPI);
    formData.append("peso", form.peso);
    formData.append("quantidade", form.quantidade);
    formData.append("categoria", form.categoria);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      await apiFeirante.post(`/produtos/${feirante._id}`, formData);
      alert("Produto cadastrado com sucesso!");
      navigate("/feirante/estoque", { state: { from: "cadastro" } });
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao cadastrar produto");
      }
    }
    
  }
  return (
    <div>
      <div className={styles.div}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Cadastre seu produto</h1>
          <div className={styles.field}>
            <label htmlFor="nome" className={styles.label}>
              Nome do Produto:
            </label>
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome do produto: "
              value={form.nome}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div>
            <FormCategoriaSelect
              value={form.categoria}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="preco" className={styles.label}>
              Preço:
            </label>
            <input
              type="text"
              name="preco"
              placeholder="Digite o preço do produto: "
              value={form.preco}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="peso" className={styles.label}>
              Peso:
            </label>
            <input
              type="number"
              name="peso"
              placeholder="Digite o peso do produto a ser vendido: "
              value={form.peso}
              onChange={handleChange}
              className={styles.input}
            />
            <p className={styles.error}>
              <b>DIGITE EM GRAMAS</b>
            </p>
          </div>
          <div className={styles.field}>
            <label htmlFor="quantidade" className={styles.label}>
              Quantidade:
            </label>
            <input
              type="number"
              name="quantidade"
              placeholder="Digite a quantidade em estoque: "
              value={form.quantidade}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="imagem" className={styles.label}>
              Imagem:
            </label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleImagemChange}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="descricao" className={styles.label}>
              Descrição do Produto:
            </label>
            <textarea
              rows="5"
              cols="20"
              placeholder="Descreva o produto em algumas palavras..."
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              Cadastrar Produto
            </button>
            <button type="reset" className={styles.button}>
              Cancelar
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
export default ProdutoAdd;
