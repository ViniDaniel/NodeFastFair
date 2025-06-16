import { useEffect, useState, useContext } from "react";
import { FeiranteContext } from "../../../context/FeiranteContext";
import apiFeirante from "../../../services/apiFeirante";
import AttButton from "../../../layout/AttButton";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../../../styles/pages_styles/Estoque.module.css";
import LinkButton from "../../../layout/LinkButton";
import { formatPreco } from "../../../scripts/ProdutoFormValidation";
import { FaTrashAlt } from "react-icons/fa";

function EstoqueFeirante() {
  const { feirante } = useContext(FeiranteContext);
  const [produto, setProduto] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [imagens, setImagens] = useState({});

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const { data } = await apiFeirante.get(`/produtos/${feirante._id}`);
        setProduto(data);
      } catch (error) {
        if (error.response?.status === 4001) {
          navigate("/loginFeirante");
        } else {
          setProduto([]);
        }
      } finally {
        setLoading(false);
      }
    }

    if (feirante?._id) {
      fetchProdutos();
    }
  }, [feirante, location.state]);

  async function deletarProduto(produtoId) {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) return;
    try {
      await apiFeirante.delete(`/produtos/${feirante._id}/${produtoId}`);
      setProduto((prevProdutos) =>
        prevProdutos.filter((p) => p._id !== produtoId)
      );
    } catch (error) {
      alert("Erro ao deletar produto.");
      console.error(error);
    }
  }

  const handleImagemChange = async (produtoId, file) => {
    const imagem = file;
    if (!imagem) return;

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      await apiFeirante.patch(
        `/produtos/${feirante._id}/${produtoId}/atualizarImagem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { data } = await apiFeirante.get(`/produtos/${feirante._id}`);
      setProduto(data);
      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar imagem");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card_dados}>
          <h1>Seus Produtos</h1>
          {loading ? (
            <p>Carregando produtos...</p>
          ) : Array.isArray(produto) && produto.length > 0 ? (
            <div className={styles.produtos_grid}>
              {produto.map((item) => (
                <div key={item._id} className={styles.produto_item}>
                  <p>
                    <strong>Produto:</strong> {item.nome}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {item.descricao}
                  </p>
                  <p>
                    <strong>Categoria:</strong> {item.categoria?.nome}
                  </p>
                  <p>
                    <strong>Peso:</strong> {item.peso}G
                  </p>
                  <p>
                    <strong>Preço:</strong> R${formatPreco(item.preco)}
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {item.quantidade} und
                  </p>

                  {item.imagem && item.imagem.length > 0 ? (
                    item.imagem.map((img, idx) => (
                      <div key={idx}>
                        <img
                          src={`https://nodefastfair.onrender.com/${img}`}
                          alt={`${item.nome} ${idx}`}
                          className={styles.imagem_produto}
                          onClick={() =>
                            document
                              .getElementById(`inputImagem-${item._id}`)
                              .click()
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          id={`inputImagem-${item._id}`}
                          className={styles.input}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setImagens((prev) => ({
                                ...prev,
                                [item._id]: file,
                              }));
                              handleImagemChange(item._id, file);
                            }
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <p
                        onClick={() =>
                          document
                            .getElementById(`inputImagem-${item._id}`)
                            .click()
                        }
                        className={styles.p_sem_produto}
                      >
                        Sem imagem cadastrada. Clique aqui para adicionar.
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        id={`inputImagem-${item._id}`}
                        className={styles.input}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImagens((prev) => ({
                              ...prev,
                              [item._id]: file,
                            }));
                            handleImagemChange(item._id, file);
                          }
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <AttButton
                      to={`/atualizar_produto/${feirante._id}/${item._id}`}
                      text="Atualizar Produto"
                    />
                    <button
                      onClick={() => deletarProduto(item._id)}
                      className={styles.button}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.sem_produto}>
              <p>Sem produto cadastrado</p>
              <p>Clique no botao abaixo para cadastrar</p>
              <LinkButton
                to="/feirante/adicionar-produto"
                text="Cadastrar produto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EstoqueFeirante;
