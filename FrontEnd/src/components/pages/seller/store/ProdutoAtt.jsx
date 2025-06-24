import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiFeirante from "../../../services/apiFeirante";
import { FeiranteContext } from "../../../context/FeiranteContext";
import FormCategoriaSelect from "./FormCategoriaSelect";
import {
  isValidCategoria,
  isValidNomeProduto,
  isValidPeso,
  isValidPreco,
  isValidQuantidade,
  isValidDescricao,
} from "../../../scripts/ProdutoFormValidation";
import styles from "../../../../styles/pages_styles/Cadastro.module.css";

function ProdutoAtt() {
  const { feirante } = useContext(FeiranteContext);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    peso: "",
    quantidade: "",
    categoria: "",
  });
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  const navigate = useNavigate();
  const { produtoId } = useParams();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await apiFeirante.get(
          `/produtos/${feirante._id}/${produtoId}`
        );
        console.log("DADOS RECEBIDOS:", response.data);
        const produto = response.data;
        setForm({
          nome: produto.nome || "",
          descricao: produto.descricao || "",
          preco: produto.preco.toString() || "",
          peso: produto.peso.toString() || "",
          quantidade: produto.quantidade.toString() || "",
          categoria: produto.categoria._id || "",
        });
      } catch (error) {
        setError("Erro ao carregar o produto");
        console.log(error);
      }
    }
    if (feirante?._id && produtoId) {
      fetchProdutos();
    }
  }, [feirante, produtoId]);
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
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
    const formParaEnviar = {
      ...form,
      preco: precoFormatadoParaAPI,
    };

    try {
      await apiFeirante.put(
        `/produtos/${feirante._id}/${produtoId}`,
        formParaEnviar
      );
      setSuccessMessage(true);
      setError("");

      setTimeout(() => {
        setSuccessMessage(false);
        navigate("/feirante/estoque", { state: { from: "cadastro" } });
      }, 2000);
    } catch (error) {
      setSuccessMessage(false);
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao cadastrar produto");
        console.log(error);
      }
    }
  }
  return (
    <div>
      <div className={styles.div}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              Atualizar Produto
            </button>
            <button type="reset" className={styles.button}>
              Cancelar
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && (
            <div className={styles.successMessage}>
              Produto atualizado com sucesso!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProdutoAtt;
