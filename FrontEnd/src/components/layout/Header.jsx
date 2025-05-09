import { useContext, useEffect } from "react";
import { ClienteContext } from "../context/ClienteContext";
import styles from "../../styles/layout_styles/Header.module.css"
import { useNavigate } from "react-router-dom";

function Header() {
  const { cliente, deslogarCliente } = useContext(ClienteContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Cliente no Header:", cliente);
  }, [cliente]);


  const handleLogout = () => {
    deslogarCliente();
    navigate("/loginCliente");
  }

  return ( 
    <header className={styles.p}>
      {cliente ? (
        <>
          <p>{cliente.nome}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </>
      ) : (
        <p>Nenhum cliente logado</p>
      )}
    </header>
  );
}

export default Header;
