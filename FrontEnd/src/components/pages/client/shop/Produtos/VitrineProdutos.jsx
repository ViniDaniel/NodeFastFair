import styles from "../../../../../styles/pages_styles/client_styles/VitrineProdutos.module.css";
import ShopNavBar from "../../../../layout/ShopNavBar";
import CardProduto from "./CardProduto";
import api from "../../../../services/api";
import { useState, useEffect } from "react";

function VitrineProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get("/produtos");
        const embaralhados = response.data.sort(() => Math.random() - 0.5);
        setProdutos(embaralhados);
      } catch (error) {
        console.error("Erro ao buscar os produtos", error);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <div>
      <ShopNavBar />
      <div className={styles.vitrineContainer}>
        <h1 className={styles.pageTitle}>Vitrine de Produtos</h1>
        <div className={styles.produtosWrapper}>
          {produtos.map((produto) => (
            <CardProduto key={produto._id} produto={produto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VitrineProdutos;
