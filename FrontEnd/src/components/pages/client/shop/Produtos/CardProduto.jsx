import { useState, useContext } from "react";
import { ClienteContext } from "../../../../context/ClienteContext";
import apiCliente from "../../../../services/apiCliente";
import styles from "../../../../../styles/pages_styles/client_styles/cards_styles/CardProduto.module.css"
import ColaboradorCardProduto from "../colaboradores/ColaboradorCardProduto";
import CardCategoria from "../categorias/CardCategoria";
function CardProduto({ produto }) {
  const [detalhes, setDetalhes] = useState(false);
  const[quantidade, setQuantidade] = useState(1)
  const {cliente} = useContext(ClienteContext)
  const [error, setError] = useState(false);


  const handleAdicionarCarrinho = async () => {
    if(!cliente){
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
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
          src={`https://nodefastfair.onrender.com/${img}`}
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
          
            <div className={styles.flex}><strong>Feirante:</strong> <ColaboradorCardProduto feirante={produto.feiranteId} /></div>

            <div className={styles.flex}><strong>Categoria:</strong><CardCategoria categoria={produto.categoria?.nome} />  </div><br />

          <label>
            Quantidade:
            <input type="number" min={1} defaultValue={1} onChange={(e)=> setQuantidade(e.target.value)}/>
            
          </label>
           <button onClick={handleAdicionarCarrinho} className={styles.btnAdicionarCarrinho}>Adicionar ao Carrinho</button>
            <button onClick={() => setDetalhes(false)} className={styles.btnDetalhes}>Fechar Detalhes</button>
        </div>
      )}
      {error && (
                  <div className={styles.error}>
                    Você precisa estar logado para adicionar o produto no carrinho!
                  </div>
                )}
      </div>
    </div>
  );
}

export default CardProduto;
