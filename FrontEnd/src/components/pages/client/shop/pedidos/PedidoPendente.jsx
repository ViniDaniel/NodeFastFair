import LinkButton from "../../../../layout/LinkButton";
import styles from "../../../../../styles/pages_styles/client_styles/pedido_styles/PedidoPendente.module.css";
function PedidoPendente(){
    return (
        <div className={styles.container} >
            <h2 className={styles.h2}>Pagamento pendente</h2>
            <p className={styles.p_pendente}>Estamos aguardando a confirmação do seu pagamento.</p>
            <LinkButton to="/cliente/carrinho" text="Voltar ao carrinho"/>
        </div>
    )
}

export default PedidoPendente