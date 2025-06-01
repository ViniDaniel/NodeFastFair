import styles from "../../../../../styles/pages_styles/client_styles/cards_styles/CardDescricao.module.css"

function CardDescricao({ descricao }) {
  if (!descricao) return <p>Descrição não disponível.</p>;

  return (
    <div className={styles.div}>
      <h3 className={styles.h3}>Sobre o Feirante</h3>
      <div className={styles.descricao}>
      <p className={styles.p}>{descricao.descricao || "Nenhuma descrição cadastrada."}</p>
      </div>
      <div className={styles.topicos}>
        <h4 className={styles.h4}>Tópicos</h4>
        {descricao.topicos.length > 0 ? (
          <ul className={styles.ul}>
            {descricao.topicos.map((topico, index) => (
              <li key={index} className={styles.li}>• {topico}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.sem_resgistro}>Nenhum tópico registrado.</p>
        )}
      </div>

      <div className={styles.enderecos}>
        <h4 className={styles.h4}>Endereços</h4>
        {descricao.enderecos.length > 0 ? (
          <ul className={styles.ul}>
            {descricao.enderecos.map((endereco, index) => (
              <li key={index} className={styles.li}>{endereco}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.sem_resgistro}>Nenhum endereço registrado.</p>
        )}
      </div>

      <div className={styles.contato}>
        <h4 className={styles.h4}>Contatos</h4>
        {descricao.contatos.length > 0 ? (
          <ul className={styles.ul}>
            {descricao.contatos.map((contato, index) => (
              <li key={index} className={styles.li}>
                <strong>{contato.tipo}:</strong> {contato.valor}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.sem_resgistro}>Nenhum contato registrado.</p>
        )}
      </div>

      <div  className={styles.capa}>
        <h4 className={styles.h4}>Capa</h4>
        {descricao.capa ? (
          <img
            src={descricao.capa}
            alt="Imagem de capa do feirante"
            className={styles.img}
          />
        ) : (
          <p className={styles.sem_resgistro}>Nenhuma imagem de capa adicionada.</p>
        )}
      </div>
    </div>
  );
}

export default CardDescricao;
