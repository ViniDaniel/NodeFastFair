import styles from "../../../../styles/pages_styles/client_styles/Categorias.module.css";
import ShopNavBar from "../../../layout/ShopNavBar";
import { Link } from "react-router-dom"; 
import { GiFruitBowl, GiPlantSeed, GiCarrot, GiCoolSpices } from "react-icons/gi";
import { LuSalad } from "react-icons/lu";

function CategoriasProduto() {
  return (
    <div>
      <ShopNavBar />
      <div className={styles.categoriasContainer}>
      <h1 className={styles.tituloCategorias}>Categorias</h1> 
      <div className={styles.listaCategorias}>
        <ul>
          <li>
            <Link to="/produtos/categorias/frutas" className={styles.linkCategoria}> <GiFruitBowl /> Frutas <GiFruitBowl /></Link>
          </li>
          <li>
            <Link to="/produtos/categorias/graos" className={styles.linkCategoria}> <GiPlantSeed /> Grãos <GiPlantSeed /></Link>
          </li>
          <li>
            <Link to="/produtos/categorias/legumes" className={styles.linkCategoria}> <GiCarrot /> Legumes <GiCarrot /></Link>
          </li>
          <li>
            <Link to="/produtos/categorias/temperos" className={styles.linkCategoria}> <GiCoolSpices /> Temperos <GiCoolSpices /></Link>
          </li>
          <li>
            <Link to="/produtos/categorias/verduras" className={styles.linkCategoria}> <LuSalad /> Verduras <LuSalad /></Link>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default CategoriasProduto;