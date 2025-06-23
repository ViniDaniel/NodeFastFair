import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/Button.module.css"

function MercadoLivreButton({ to, text }) {
  return (
    <Link to={to}>
      <button className={styles.mercadoLivre}>{text}</button>
    </Link>
  );
}

export default MercadoLivreButton;
