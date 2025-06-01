import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../../styles/layout_styles/ShopNavBarProduto.module.css";

function ShopNavBar() {
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (busca.trim()) {
        api.get(`/sugestoes?q=${encodeURIComponent(busca)}`).then((res) => {
          setSugestoes(res.data);
          setMostrarSugestoes(true);
        });
      } else {
        setSugestoes([]);
        setMostrarSugestoes(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [busca]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busca.trim() !== "") {
      navigate(`/produtos/pesquisa?q=${encodeURIComponent(busca)}`);
      setMostrarSugestoes(false);
    }
  };

  const handleSugestaoClick = (item) => {
    navigate(
      `/produtos/pesquisa?q=${encodeURIComponent(
        item.nome || item.nome_do_produto
      )}`
    );
    setBusca("");
    setSugestoes([]);
    setMostrarSugestoes(false);
  };

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Procure por produto, feirante ou categoria..."
            onFocus={() => setMostrarSugestoes(true)}
            onBlur={() => setTimeout(() => setMostrarSugestoes(false), 200)}
          />
          <button type="submit">Buscar</button>
        </form>
        {mostrarSugestoes && sugestoes.length > 0 && (
          <ul className={styles.sugestoesBox}>
            {sugestoes.map((item, index) => (
              <li key={index} onClick={() => handleSugestaoClick(item)}>
                {item.nome}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}

export default ShopNavBar;
