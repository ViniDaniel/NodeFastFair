import { Link } from "react-router-dom";
import styles from "../../../../../styles/pages_styles/client_styles/cards_styles/ColaboradorCardProduto.module.css"
function CardCategoria({ categoria }) {
  return (
    <div className={styles.div}>
      <Link to={`/produtos/categorias/${categoria}`} className={styles.link}>
        {categoria}
      </Link>
    </div>
  );
}

export default CardCategoria;
