import { Link } from "react-router-dom";
import styles from "../../styles/layout_styles/Button.module.css";

function AttButton({to, text}) {
  return (
    <Link to={to}>
      <button className={styles.buttonAtt}>{text}</button>
    </Link>
  );
}

export default AttButton;
