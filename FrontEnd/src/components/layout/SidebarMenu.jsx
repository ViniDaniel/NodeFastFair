import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/SidebarMenu.module.css";

function SidebarMenu({ isOpen, onClose }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>X</button>
      <h3>Cliente</h3>
      <ul>
        <li><Link to="/cadastroCliente" onClick={onClose}>Cadastro</Link></li>
        <li><Link to="/loginCliente" onClick={onClose}>Login</Link></li>
      </ul>

      <h3>Feirante</h3>
      <ul>
        <li><Link to="/cadastroFeirante" onClick={onClose}>Cadastro</Link></li>
        <li><Link to="/loginFeirante" onClick={onClose}>Login</Link></li>
      </ul>
    </div>
  );
}

export default SidebarMenu;
