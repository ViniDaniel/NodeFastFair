import styles from '../../../styles/pages_styles/FAQ.module.css'; 

function SuporteContatos() {
  return (
    <div className={styles.faqContainer}> {/* Reutilizando o container do FAQ */}
      <h2 className={styles.faqTitle}>Nossos Contatos</h2> {/* Título para a seção */}

      <div className={styles.faqItem}> {/* Usando a estrutura de item do FAQ para cada contato */}
        <div className={styles.faqQuestion}> {/* Estilo de pergunta para o título do contato */}
          <span>Email</span>
        </div>
        <div className={styles.faqAnswer}> {/* Estilo de resposta para o valor do contato */}
          <p>
            Para dúvidas e suporte geral, entre em contato através do nosso email: <br />
            <a href="mailto:fastFair@gmail.com" className={styles.contactLink}>fastFair@gmail.com</a>
          </p>
        </div>
      </div>

      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>
          <span>WhatsApp</span>
        </div>
        <div className={styles.faqAnswer}>
          <p>
            Fale conosco diretamente pelo WhatsApp para um atendimento rápido: <br />
            <a href="https://wa.me/5522992245848" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>+55 22 99224-5848</a>
          </p>
        </div>
      </div>

      <div className={styles.faqItem}>
        <div className={styles.faqQuestion}>
          <span>Central de Atendimento (0800)</span>
        </div>
        <div className={styles.faqAnswer}>
          <p>
            Ligue gratuitamente para nossa central de atendimento: <br />
            <span className={styles.contactLink}>0800 123 4567</span> (Atendimento de Seg. a Sex. das 9h às 18h)
          </p>
        </div>
      </div>

    </div>
  );
}

export default SuporteContatos;