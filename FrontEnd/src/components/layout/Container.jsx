import styles from "../../styles/layout_styles/Container.module.css"
function Container(props) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </div>
  );
}
export default Container;
