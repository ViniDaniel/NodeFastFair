import { Link } from "react-router-dom";
import styles from "../../../styles/pages_styles/NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>Ops!</h1>
      <p>Página não encontrada!</p>
      <Link to="/" className={styles.btn_voltar}>
        Voltar para o início
      </Link>
    </div>
  );
}

export default NotFound;
