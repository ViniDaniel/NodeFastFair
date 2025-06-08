import LinkButton from "../../../../layout/LinkButton";
import styles from "../../../../../styles/pages_styles/client_styles/pedido_styles/PedidoErro.module.css";
function PedidoErro(){
    return (
        <div className={styles.container} >
            <h2 className={styles.h2}>Erro no pagamento</h2>
            <p className={styles.p_erro}>Ocorreu um erro no seu pagamento, volte ao menu inical</p>
            <LinkButton to="/" text="Voltar ao início"/>
        </div>
    )
}

export default PedidoErro