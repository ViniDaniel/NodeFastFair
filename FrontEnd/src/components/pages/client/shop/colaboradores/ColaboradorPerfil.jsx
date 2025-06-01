import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../services/api";
import CardProduto from "../Produtos/CardProduto";
import CardDescricao from "./CardDescricao";
import styles from "../../../../../styles/pages_styles/client_styles/ColaboradorPerfil.module.css"
function ColaboradorPerfil() {
  const { id } = useParams();
  const [feirante, setFeirante] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [descricao, setDescricao] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("descricao");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeirante() {
      try {
        //buscar feirante
        setLoading(true);
        setError(null);
        const feiranteResponse = await api.get(`/public/colaborador/${id}`);
        setFeirante(feiranteResponse.data);

        //buscar produto
        try {
          const produtoResponse = await api.get(
            `/public/colaborador/${id}/produtos`
          );
          const sortProdutos = [...produtoResponse.data].sort((a,b)=> {
            const nomeA = a.nome ? a.nome.toLowerCase() : '';
            const nomeB = b.nome ? b.nome.toLowerCase(): '';

            if (nomeA < nomeB){
              return -1;
            }
            if (nomeA > nomeB){
              return 1
            }
            return 0
          })
          setProdutos(sortProdutos);
        } catch (error) {
          console.warn("Nenhum produto encontrado para este feirante");
          setProdutos([]);
        }

        try {
          const descricaoResponse = await api.get(
            `/public/colaborador/${id}/descricao`
          );
          setDescricao(descricaoResponse.data);
        } catch (error) {
          console.warn("Nenhuma descrição para esse feirante");
          setDescricao(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do colaborador", error);
        setError("Não foi possivel buscar dados desse colaborador");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchFeirante();
    }
  }, [id]);

  if (loading) return <p>Carregando...</p>;

  if(error) return <p>Error: {error}</p>

  if(!feirante) return <p>Colaborador não encontrado</p>

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>{feirante.nome}</h1>

      <div className={styles.buttonGroup}>
        <button onClick={() => setAbaAtiva("descricao")} className={styles.button}>Descrição</button>
        <button onClick={() => setAbaAtiva("produtos")}className={styles.button}>Produtos</button>
        <button onClick={() => setAbaAtiva("perfil")}className={styles.button}>Perfil</button>
      </div>

      <div className={styles.paginas}>
        {abaAtiva === "descricao" && (
          <div className={styles.descricao}>
            <CardDescricao descricao={descricao} />
          </div>
        )}
        <div className={styles.div_produto}>
        {abaAtiva === "produtos" && (
          <div className={styles.produtos}>
            <h2 className={styles.h2}>Produtos</h2>
            {produtos.map((produto) => (
              <CardProduto key={produto._id} produto={produto} />
            ))}
          </div>
        )}
        </div>

        {abaAtiva === "perfil" && (
          <div className={styles.perfil}>
            <h2 className={styles.h2}>Perfil do Feirante</h2>
            <p>
              <strong>Email:</strong> {feirante.email}
            </p>
            <p>
              <strong>Celular:</strong> {feirante.celular}
            </p>
            <p>
              <strong>Endereço:</strong> {feirante.endereco} nº{" "}
              {feirante.numeroCasa}{" "}
            </p>
            <p>
              <strong>Bairro:</strong>
              {feirante.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {feirante.cidade} UF: {feirante.uf}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColaboradorPerfil;
