import { ClienteContext } from "../../../context/ClienteContext";
import { useContext, useState, useEffect } from "react";
import apiCliente from "../../../services/apiCliente";
import { formatPreco } from "../../../scripts/ProdutoFormValidation";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import styles from "../../../../styles/pages_styles/client_styles/Carrinho.module.css";
import CardForm from "./CardForm"

function Carrinho() {
  const { cliente } = useContext(ClienteContext);
  const [carrinho, setCarrinho] = useState(null);
  const [metodoPagamento, setMetodoPagamento] = useState("pix");

  const fetchCarrinho = async () => {
    try {
      const response = await apiCliente.get("/cliente/carrinho");
      setCarrinho(response.data);
    } catch (error) {
      console.error("Erro ao buscar carrinho", error);
    }
  };

  useEffect(() => {
    if (cliente) fetchCarrinho();
  }, [cliente]);

  const removerItem = async (produtoId) => {
    try {
      await apiCliente.delete(`/cliente/carrinho/item/${produtoId}/remover`);
      fetchCarrinho();
    } catch (error) {
      console.error("Erro ao remover item", error);
    }
  };

  const aumentaQuantidade = async (produtoId) => {
    try {
      await apiCliente.patch(`/cliente/carrinho/item/${produtoId}/adicionar`);
      fetchCarrinho();
    } catch (error) {
      console.error("Erro ao aumentar quantidade", error);
    }
  };

  const diminuirQuantidade = async (produtoId) => {
    try {
      await apiCliente.patch(`/cliente/carrinho/item/${produtoId}/diminuir`);
      fetchCarrinho();
    } catch (error) {
      console.error("Erro ao diminuir quantidade", error);
    }
  };

  if (!cliente)
    return (
      <p className={styles.logado}>
        Você precisa estar logado para acessar o carrinho
      </p>
    );
  if (!carrinho) return <p className={styles.loading}>Carregando...</p>;

  return (
    <div className={styles.div}>
      {carrinho.itens.length === 0 ? (
        <p className={styles.vazio}>Carrinho vazio</p>
      ) : (
        <div className={styles.carrinho}>
          <ul className={styles.ul}>
            {carrinho.itens.map((item) => (
              <li key={item._id} className={styles.li}>
                {item.produtoId.nome} - Quantidade: {item.quantidade} - Preço
                Unitário: R${formatPreco(item.produtoId.preco)}
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => diminuirQuantidade(item.produtoId._id)}
                    className={styles.button_d}
                  >
                    <FaMinusCircle />
                  </button>
                  <button
                    onClick={() => aumentaQuantidade(item.produtoId._id)}
                    className={styles.button_a}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => removerItem(item.produtoId._id)}
                    className={styles.button_r}
                  >
                    Remover <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.total}>
            Total: R$ {formatPreco(carrinho.total)}
          </p>

          <div className={styles.metodos}>
            <label className={styles.labelPix}>
              <input
                type="radio"
                name="pagamento"
                value="pix"
                checked={metodoPagamento === "pix"}
                onChange={() => setMetodoPagamento("pix")
                  
                }
                className={styles.inputPix}
              />
              Pix
            </label>
            <label className={styles.labelCartao}>
              <input
                type="radio"
                name="pagamento"
                value="cartao"
                checked={metodoPagamento === "cartao"}
                onChange={() => setMetodoPagamento("cartao")}
                className={styles.inputCartao}
              />
              Cartão
            </label>
          </div>

          <CardForm
            carrinho={carrinho}
            metodo={metodoPagamento}
            cliente={cliente}
            onSucesso={() => {
              setCarrinho(null);
              setMetodoPagamento("pix");
              alert("Pedido realizado com sucesso!");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Carrinho;
