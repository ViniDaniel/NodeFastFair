import { Link } from "react-router-dom";
import Container from "./Container";
import styles from '../../styles/layout_styles/NavBar.module.css';
import logo from "../../assets/logo.png";
function NavBar() {
  return (
    <nav className={styles.navbar}>
            <Container>
            <ul className={styles.list}>
                <li className={styles.img}>
                    <img src={logo} alt="Fast&Fair" />
                </li>
                <li className={styles.item}>
                    <Link to="/">Início</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/loginCliente">Login Cliente</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/loginFeirante">Login Feirante</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/suporte">Suporte</Link>
                </li>
            </ul>
            </Container>  
        </nav>
  );
}

export default NavBar;

