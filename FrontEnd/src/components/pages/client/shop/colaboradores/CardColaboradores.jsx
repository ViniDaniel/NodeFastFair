import { Link } from "react-router-dom";
import styles from "../../../../../styles/pages_styles/client_styles/cards_styles/CardColaboradores.module.css"
function CardColaboradores({ feirante }) {
  return (
    <div className={styles.div}>
      <Link to={`/public/colaborador/${feirante._id}`} className={styles.link}>
        {feirante.nome}
      </Link>
    </div>
  );
}

export default CardColaboradores;
