import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/LinkButton.module.css"

function LinkButton({ to, text }) {
  return (
    <Link to={to}>
      <button className={styles.buttonlink}>{text}</button>
    </Link>
  );
}

export default LinkButton;
