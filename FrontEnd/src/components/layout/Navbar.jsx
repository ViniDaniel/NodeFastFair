import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/NavBar.module.css";
import logo from "../../assets/logo.png";
import SidebarMenu from "./SidebarMenu";
import { useContext, useState } from "react";
import { FeiranteContext } from "../context/FeiranteContext";
import { FaBars } from "react-icons/fa";

function NavBar() {
  const { feirante } = useContext(FeiranteContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Fast&Fair" className={styles.logo} />
        <ul className={styles.list}>
          {!feirante ? (
            <>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/produtos">Produtos</Link>
              </li>
              <li>
                <Link to="/sobre">Sobre</Link>
              </li>
              <li>
                <Link to="/suporte">Suporte</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/feirante/descricao">Descrição</Link>
              </li>
              <li>
                <Link to="/feirante/adicionar-produto">Adicionar Produto</Link>
              </li>
              <li>
                <Link to="/feirante/estoque">Estoque</Link>
              </li>
              <li>
                <Link to="/feirante/perfilFeirante">Perfil</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div
        className={styles.menuIcon}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </div>

      <SidebarMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        feirante={feirante}
      />
    </nav>
  );
}

export default NavBar;
