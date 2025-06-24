import { ClienteContext } from "../../../../context/ClienteContext";
import { useEffect, useState, useContext } from "react";
import apiCliente from "../../../../services/apiCliente";
import styles from "../../../../../styles/pages_styles/client_styles/pedido_styles/PedidosPagos.module.css";

function PedidosPagos() {
  const [pedidos, setPedidos] = useState([]);
  const { cliente } = useContext(ClienteContext);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await apiCliente.get(`/pedidos/${cliente._id}`);
        const pagos = response.data.filter((p) => p.status === "confirmado");
        setPedidos(pagos);
      } catch (error) {
        console.error("Erro ao buscar pedido", error);
      }
    };
    if (cliente) fetchPedidos();
  }, [cliente]);
  if (!cliente)
    return (
      <div className={styles.content_sem_cadastro}>
        <div className={styles.sem_cadastro}>
          <p className={styles.p_erro}>
            Você precisa estar logado para ver seus pedidos.
          </p>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2>Seus pedidos</h2>
      {pedidos.length === 0 ? (
        <p className={styles.p_naoPago}>Você ainda não possui pedidos pagos</p>
      ) : (
        <ul className={styles.ul}>
          {pedidos.map((p) => (
            <li key={p._id} className={styles.li}>
              <p className={styles.p}>
                <strong className={styles.pedido}>Pedido:</strong> {p._id}
              </p>
              <p className={styles.p}>
                <strong className={styles.total}>Total:</strong>
                {p.total.toFixed(2)}
              </p>
              <p className={styles.p}>
                <strong className={styles.data}>Data:</strong>
                {new Date(p.dataPedido).toLocaleString()}
              </p>
              <ul className={styles.ul_produtos}>
                {p.produtos.map((item, i) => (
                  <li key={i} className={styles.li_produtos}>
                    <p className={styles.p}>
                      {item.quantidade} x {item.produtoId?.nome}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PedidosPagos;
