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

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const { data } = await apiFeirante.get(`/produtos/${feirante._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
      await apiFeirante.delete(`/produtos/${feirante._id}/${produtoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProduto((prevProdutos) =>
        prevProdutos.filter((p) => p._id !== produtoId)
      );
    } catch (error) {
      alert("Erro ao deletar produto.");
      console.error(error);
    }
  }

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

                  {item.imagem?.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:7000/${img}`}
                      alt={`${item.nome} ${idx}`}
                      className={styles.imagem_produto}
                    />
                  ))}

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
            <div>
              <p>Sem produto cadastrado</p>
              <br />
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
