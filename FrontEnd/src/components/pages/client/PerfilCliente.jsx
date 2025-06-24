import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../context/ClienteContext";
import apiCliente from "../../services/apiCliente";
import styles from "../../../styles/pages_styles/Perfil.module.css";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../layout/LinkButton";
import AttButton from "../../layout/AttButton";

function PerfilCliente() {
  const { cliente, deslogarCliente } = useContext(ClienteContext);
  const [dadosCliente, setDadosCliente] = useState(cliente);
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    deslogarCliente();
    navigate("/loginCliente");
  };

  useEffect(() => {
    async function fetchCliente() {
      try {
        const { data } = await apiCliente.get(`/clientes/${cliente._id}`);
        setDadosCliente(data);
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
        const { data } = await apiCliente.get(
          `/enderecoCliente/${cliente._id}`
        );
        setEndereco(data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/loginCliente");
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
    return (
      <p className={styles.sem_perfil}>
        Você precisa estar logado para acessar esta página!
        {<LinkButton to="/loginCliente" text="Login Cliente" />}
      </p>
    );
  }

  return (
    <div className={styles.profilePageWrapper}>
      <div className={styles.container}>
        <div className={styles.card_dados}>
          <h2>Dados</h2>
          <p>
            <strong>Nome:</strong> {dadosCliente.nome}
          </p>
          <p>
            <strong>E-mail:</strong> {dadosCliente.email}
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
          <div className={styles.card_buttons_wrapper}>
          <AttButton
            to={`/atualizar_cliente/${cliente._id}`}
            text="Atualizar Perfil"
          />
        </div>
        </div>

        <div className={styles.card_endereco}>
          <h2>Endereço</h2>
          {loading ? (
            <p>Carregando endereço...</p>
          ) : endereco ? (
            <>
              <p>
                <strong>Endereço: </strong>
                {endereco.endereco}, nº {endereco.numeroCasa}
              </p>
              <p>
                <strong>Bairro: </strong>
                {endereco.bairro}
              </p>
              <p>
                <strong>Cidade: </strong>
                {endereco.cidade} - {endereco.uf}
              </p>
              <p>
                <strong>CEP: </strong>
                {endereco.cep}
              </p>
              <p>
                <strong>Complemento: </strong>
                {endereco.complemento}
              </p>
              <p>
                <strong>Referência: </strong>
                {endereco.referencia}
              </p>
              <div className={styles.card_buttons_wrapper}>
              <AttButton
                to={`/atualizar_endereco/${cliente._id}`}
                text="Atualizar Endereço"
              />
              </div>
            </>
          ) : (
            <div className={styles.card_buttons_wrapper}>
              <p>Endereço não cadastrado</p>
              <LinkButton to="/cadastrar-endereco" text="Cadastrar endereço" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilCliente;
