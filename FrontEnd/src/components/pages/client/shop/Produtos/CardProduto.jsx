import { useState, useContext } from "react";
import { ClienteContext } from "../../../../context/ClienteContext";
import apiCliente from "../../../../services/apiCliente";
import styles from "../../../../../styles/pages_styles/client_styles/cards_styles/CardProduto.module.css"
function CardProduto({ produto }) {
  const [detalhes, setDetalhes] = useState(false);
  const[quantidade, setQuantidade] = useState(1)
  const {cliente} = useContext(ClienteContext)


  const handleAdicionarCarrinho = async () => {
    if(!cliente){
      alert("Você precisa estar logado como cliente para adicionar ao carrinho")
      return;
    }

    try {
      await apiCliente.post("/cliente/carrinho", {
        produtoId: produto._id,
        quantidade: parseInt(quantidade),
      })
      alert("Produto adicionado ao carrinho!")
    } catch (error) {
      console.error("Error ao adicionar produto ao carrinho", error)
    }

  }


  return (
    <div className={styles.cardProduto}>
      {produto.imagem?.map((img, idx) => (
        <img
          key={idx}
          src={`http://localhost:7000/${img}`}
          alt={`${produto.nome} ${idx}`}
          className={styles.imagem_produto}
        />
      ))}
      <div className={styles.infoProduto} ><h2 className={styles.nomeProduto}>
          {produto.nome}<span className={styles.pesoProduto}> -- {produto.peso} Gramas</span> 
        </h2>
        <p className={styles.precoProduto}>R${produto.preco.toFixed(2)}</p>

      {!detalhes && (
          <button onClick={() => setDetalhes(true)} className={styles.btnDetalhes}>Ver Detalhes</button>
        )}

      {detalhes && (
        <div className={styles.detalhesProduto}>
          <p>
            <strong>Feirante:</strong> {produto.feiranteId.nome}
          </p>
          <label>
            Quantidade:
            <input type="number" min={1} defaultValue={1} onChange={(e)=> setQuantidade(e.target.value)}/>
            
          </label>
           <button onClick={handleAdicionarCarrinho} className={styles.btnAdicionarCarrinho}>Adicionar ao Carrinho</button>
            <button onClick={() => setDetalhes(false)} className={styles.btnDetalhes}>Fechar Detalhes</button>
        </div>
      )}
      </div>
    </div>
  );
}

export default CardProduto;

/* style={{ marginTop: '10px', backgroundColor: '#dc3545' }} */