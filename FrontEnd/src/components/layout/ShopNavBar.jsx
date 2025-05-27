import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/ShopNavBarProduto.module.css";
function ShopNavBar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <ul className={styles.list}>
            <>
              <li>
                <Link to="/produtos/vitrine">Geral</Link>
              </li>
              <li>
                <Link to="/produtos/categorias">Categorias</Link>
              </li>
              <li>
                <Link to="/produtos/cliente/feirantes">Feirantes</Link>
              </li>
            </>
          </ul>
        </div>
      </nav>
      <div>

      </div>
    </div>
  );
}


export default ShopNavBar;