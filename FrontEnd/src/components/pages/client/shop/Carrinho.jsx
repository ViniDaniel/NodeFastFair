import { ClienteContext } from "../../../context/ClienteContext";
import { useContext, useState, useEffect } from "react";
import apiCliente from "../../../services/apiCliente";
import { formatPreco } from "../../../scripts/ProdutoFormValidation";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import styles from "../../../../styles/pages_styles/client_styles/Carrinho.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const PUBLIC_KEY = "APP_USR-5d67495d-9cc9-47d3-a4ca-86aa06c36d97";

function Carrinho() {
  const { cliente } = useContext(ClienteContext);
  const [carrinho, setCarrinho] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  const fetchCarrinho = async () => {
    try {
      const response = await apiCliente.get("/cliente/carrinho");
      setCarrinho(response.data);
    } catch (error) {
      console.error("Erro ao buscar carrinho", error);
    }
  };

  useEffect(() => {
    initMercadoPago(PUBLIC_KEY);
  }, []);

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

  const criarPreferencia = async () => {
    try {
      const response = await apiCliente.post(
        "/cliente/carrinho/gerar-preferencia"
      );
      if (response.data?.preferenceId) {
        setPreferenceId(response.data.preferenceId);
      } else {
        console.error("Preferência inválida", response.data);
      }
    } catch (error) {
      console.error("Erro ao criar preferência", error);
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
      <h1 className={styles.h1}>Seu carrinho</h1>
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
          {!preferenceId ? (
            <>
              <p className={styles.total}>
                Total: R$ {formatPreco(carrinho.total)}
              </p>
              <button
                onClick={criarPreferencia}
                className={styles.button_finzalizar}
                disabled={!carrinho.itens.length}
              >
                Finalizar Pedido
              </button>
            </>
          ) : (
            <Wallet initialization={{ preferenceId }} />
          )}
        </div>
      )}
    </div>
  );
}

export default Carrinho;
