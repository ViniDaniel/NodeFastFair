import { useEffect, useState } from "react";
import api from "../../../../services/api";
import CardProduto from "../Produtos/CardProduto";
import ShopNavBar from "../../../../layout/ShopNavBar";
import styles from "../../../../../styles/pages_styles/client_styles/VitrineProdutos.module.css"

function Graos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchGraos() {
      try {
        const response = await api.get("/produtos/categorias/Grãos");
        const embaralhados = response.data.sort(() => Math.random() - 0.5);
        setProdutos(embaralhados);
      } catch (error) {
        console.error("Erro ao buscar grãos:", error);
      }
    }

    fetchGraos();
  }, []);

  return (
    <div>
      <ShopNavBar />
      <div className={styles.vitrineContainer}>
        <div className={styles.produtosWrapper}>
          {produtos.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            produtos.map((produto) => (
              <CardProduto key={produto._id} produto={produto} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Graos;
