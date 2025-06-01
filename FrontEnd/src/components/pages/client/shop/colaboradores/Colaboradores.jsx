import { useState, useEffect } from "react";
import api from "../../../../services/api";
import CardColaboradores from "./CardColaboradores";
import styles from "../../../../../styles/pages_styles/client_styles/Colaboradores.module.css";

function Colaboradores() {
  const [feirantes, setFeirantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Número de colaboradores por página

  useEffect(() => {
    async function fetchFeirantes() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/public/colaboradores");
        const sortedFeirantes = [...response.data].sort((a,b)=> {
          const nomeA = a.nome ? a.nome.toLowerCase() : '';
          const nomeB = b.nome ? b.nome.toLowerCase() : '';

          if (nomeA < nomeB){
            return -1 // nomeA vem antes de nomeB
          }
          if (nomeA > nomeB){
            return 1 // nomeA vem depois de nomeB
          }
          return 0; //caso os nomes sejam iguais
        })
        setFeirantes(sortedFeirantes);
      } catch (err) {
        console.error("Erro ao buscar feirantes:", err);
        setError(
          "Não foi possível carregar os colaboradores. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchFeirantes();
  }, []);

  const totalPages = Math.ceil(feirantes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeirantes = feirantes.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.active : ""}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }
  };

  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Colaboradores</h1>
      <div className={styles.lista}>
        {loading && <p>Carregando colaboradores...</p>}
        {error && <p className={styles.error}>{error}</p>}{" "}
        {!loading && !error && feirantes.length === 0 && (
          <p>Nenhum feirante encontrado.</p>
        )}
        {!loading &&
          !error &&
          currentFeirantes.map((feirante) => (
            <CardColaboradores key={feirante._id} feirante={feirante} />
          ))}
      </div>

      {totalPages > 1 && ( 
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            Anterior
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default Colaboradores;
