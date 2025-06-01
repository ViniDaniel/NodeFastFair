import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { useLocation } from "react-router-dom";
import CardProduto from "./CardProduto";
import ShopNavBar from "../../../../layout/ShopNavBar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PesquisaProdutos() {
  const query = useQuery();
  const termo = query.get("q") || "";
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (termo.trim()) {
        buscarProdutos(termo);
      } else {
        setProdutos([]);
      }
    }, 500); //milessegundos de atraso

    return () => clearTimeout(delayDebounce);
  }, [termo]);
  const buscarProdutos = async (q) => {
    try {
      setLoading(true);
      const response = await api.get(`/pesquisa?q=${q}`);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <ShopNavBar />
      <h1>Resultados para: "{termo}"</h1>

      {loading ? (
        <p>Carregando resultados...</p>
      ) : produtos.length > 0 ? (
        produtos.map((produto) => (
          <CardProduto key={produto._id} produto={produto} />
        ))
      ) : (
        <p>Nenhum resultado encontrado</p>
      )}
    </div>
  );
}

export default PesquisaProdutos;
