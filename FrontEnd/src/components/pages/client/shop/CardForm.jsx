import { useState } from "react";
import apiCliente from "../../../services/apiCliente";
import styles from "../../../../styles/pages_styles/client_styles/CardForm.module.css";

function CardForm({ carrinho, metodo, cliente, onSucesso }) {
  const [email, setEmail] = useState(cliente?.email || "");
  const [cardInfo, setCardInfo] = useState({
    numero: "",
    titular: "",
    validade: "",
    cvv: "",
  });

  const finalizarCompra = async () => {
    try {
      const response = await apiCliente.post("/cliente/carrinho/finalizar", {
        metodo,
        email,
        cardInfo: metodo === "cartao" ? cardInfo : undefined,
      });

      if (response.status === 200 || response.status === 201) {
        onSucesso();
      }
    } catch (error) {
      console.error("Erro ao finalizar compra", error);
      alert("Erro ao finalizar compra");
    }
  };

  return (
    <div className={styles.container}>
      {metodo === "cartao" && (
        <div className={styles.cartao}>
          <input
            type="text"
            placeholder="Número do cartão"
            value={cardInfo.numero}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, numero: e.target.value })
            }
            className={styles.numeroCartao}
          />

          <input
            type="text"
            placeholder="Nome do titular"
            value={cardInfo.titular}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, titular: e.target.value })
            }
            className={styles.titular}
          />

          <input
            type="text"
            placeholder="Validade (MM/AA)"
            value={cardInfo.validade}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, validade: e.target.value })
            }
            className={styles.validade}
          />

          <input
            type="text"
            placeholder="CVV"
            value={cardInfo.cvv}
            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
          />
        </div>
      )}

      <button onClick={finalizarCompra} className={styles.metodo}>
        Pagar com {metodo}
      </button>
    </div>
  );
}

export default CardForm;
