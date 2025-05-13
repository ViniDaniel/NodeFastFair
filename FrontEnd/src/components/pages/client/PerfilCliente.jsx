import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../context/ClienteContext";
import apiCliente from "../../services/apiCliente";
import styles from "../../../styles/pages_styles/Perfil.module.css";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../layout/LinkButton";

function PerfilCliente() {
  const { cliente } = useContext(ClienteContext);
  const [dadosCliente, setDadosCliente] = useState(cliente)
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
    async function fetchCliente() {
      try {
        const { data } = await apiCliente.get(`/clientes/${cliente._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDadosCliente(data); // <- atualiza os dados localmente
      } catch (error) {
        console.log(error);
      }
    }

    if (cliente?._id) {
      fetchCliente();
    }
  }, [cliente]);

  useEffect(() => {
    async function fetchEndereco() {
      try {
        const { data } = await apiCliente.get(`/enderecoCliente/${cliente._id}`,{
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        setEndereco(data);
      } catch (error) {
        if(error.response?.status === 401){
          navigate("/loginCliente")
        } else {
          setEndereco(null);
        }
      } finally {
        setLoading(false);
      }
    }

    if (cliente?._id) {
      fetchEndereco();
    }
  }, [cliente]);

  if (!cliente || !dadosCliente) {
      return <p>Você precisa estar logado para acessar esta página</p>;
    }

  return (
    <div>
      <h1>Seu Perfil</h1>
        <div className={styles.container}>
          <div className={styles.card_dados}>
            <h2>Dados</h2>
            <p>
              <strong>Nome:</strong> {dadosCliente.nome}
            </p>
            <p>
              <strong>Email:</strong> {dadosCliente.email}
            </p>
            <p>
              <strong>Celular:</strong> {dadosCliente.celular}
            </p>
            <p>
              <strong>CPF:</strong> {dadosCliente.cpf}
            </p>
            <p>
              <strong>Gênero:</strong> {dadosCliente.genero}
            </p>
          </div>

            <div className={styles.card_endereco}>
                <h2>Endereço</h2>
                {loading ? (
                    <p>Carregando endereço...</p>
                ) : endereco ? (
                    <>
                        <p><strong>Endereço: </strong>{endereco.endereco}, nº {endereco.numeroCasa}</p>
                        <p><strong>Bairro: </strong>{endereco.bairro}</p>
                        <p><strong>Cidade: </strong>{endereco.cidade} - {endereco.uf}</p>
                        <p><strong>CEP: </strong>{endereco.cep}</p>
                        <p><strong>Complemento: </strong>{endereco.complemento}</p>
                        <p><strong>Referência: </strong>{endereco.referencia}</p>
                <button onClick={() => navigate(`/atualizar-endereco/${endereco._id}`)} >Atualizar endereço</button>
                    </>
                ) : (
                    <LinkButton to="/cadastrar-endereco" text="Cadastar endereço" />
                )}
            </div>
        </div>
      </div>
  );
}

export default PerfilCliente;
