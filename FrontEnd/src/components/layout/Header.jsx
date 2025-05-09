import { useContext, useEffect } from "react";
import { ClienteContext } from "../context/ClienteContext";
import styles from "../../styles/layout_styles/Header.module.css"

function Header() {
  const { cliente } = useContext(ClienteContext);

  useEffect(() => {
    console.log("Cliente no Header:", cliente);
  }, [cliente]);

  return ( 
    <header className={styles.p} key={cliente?.email || "no-user"}>
        {cliente ? (
        <p>Bem-Vindo, {cliente.nome}</p>
      ) : (
        <p>Nenhum cliente logado</p>
      )}
    </header>
  );
}

export default Header;
