import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/NavBar.module.css";
import logo from "../../assets/logo.png";
import SidebarMenu from "./SidebarMenu";
import { useContext, useState } from "react";
import { FeiranteContext } from "../context/FeiranteContext";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { ClienteContext } from "../context/ClienteContext";
import MercadoLivreButton from "./MercadoLivreButton";

function NavBar() {
  const { cliente, deslogarCliente } = useContext(ClienteContext);
  const { feirante, deslogarFeirante } = useContext(FeiranteContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogoutCliente = () => {
    deslogarCliente();
    navigate("/loginCliente");
  };

  const handleLogoutFeirante = () => {
    deslogarFeirante();
    navigate("/loginFeirante");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Fast&Fair" className={styles.logo} />
        <ul className={styles.list}>
          {cliente ? (
            <>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/produtos/categorias">Categorias</Link>
              </li>
              <li>
                <Link to="/colaboradores">Colaboradores</Link>
              </li>
              <li>
                <Link to="/cliente/carrinho">
                  <FaShoppingCart />
                  Carrinho
                </Link>
              </li>
              <li>
                <Link to="/perfilCliente">{cliente.nome}</Link>
              </li>
              <li>
                <button className={styles.deslogar} onClick={handleLogoutCliente}>
                  Deslogar
                </button>
              </li>
            </>
          ) : feirante ? (
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
              <li>
                <MercadoLivreButton
                  to={`https://auth.mercadopago.com.br/authorization?client_id=4430954803402513&response_type=code&platform_id=mp&redirect_uri=https://nodefastfair.onrender.com/mercadopago/callback`}
                  text="Mercado Pago"
                />
              </li>
              <li>
                <button className={styles.deslogar} onClick={handleLogoutFeirante}>
                  Deslogar
                </button>
              </li>
            </>
          ) : (
            // Navbar para Usuários Não Logados
            <>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/produtos/categorias">Categorias</Link>
              </li>
              <li>
                <Link to="/colaboradores">Colaboradores</Link>
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
