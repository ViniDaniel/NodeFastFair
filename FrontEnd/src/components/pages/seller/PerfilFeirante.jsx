import { useEffect, useContext, useState } from "react";
import { FeiranteContext } from "../../context/FeiranteContext";
import apiFeirante from "../../services/apiFeirante";
import styles from "../../../styles/pages_styles/Perfil.module.css";
import LinkButton from "../../layout/LinkButton";
import AttButton from "../../layout/AttButton";
import { useNavigate } from "react-router-dom";

function PerfilFeirante() {
  const { feirante, deslogarFeirante } = useContext(FeiranteContext);
  const [dadosFeirante, setDadosFeirante] = useState(feirante);
  const navigate = useNavigate()

  const handleLogout = () => {
    deslogarFeirante();
    navigate("/loginFeirante")
  }

  useEffect(() => {
    async function fetchFeirante() {
      try {
        const { data } = await apiFeirante.get(`feirantes/${feirante._id}`);
        setDadosFeirante(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (feirante?._id) {
      fetchFeirante();
    }
  }, [feirante]);

  if (!feirante || !dadosFeirante) {
    return (
      <p className={styles.sem_perfil}>
        Você precisa estar logado para acessar essa página!
        {<LinkButton to="/loginFeirante" text="Login Feirante" />}
      </p>
    );
  }
  return (
    <div>
      <h1>Seu Perfil</h1>
      <div className={styles.container}>
        <div className={styles.card_dados}>
          <h2>Dados</h2>
          <p>
            <strong>Nome:</strong> {dadosFeirante.nome}
          </p>
          <p>
            <strong>E-mail:</strong> {dadosFeirante.email}
          </p>
          <p>
            <strong>Celular:</strong> {dadosFeirante.celular}
          </p>
          <p>
            <strong>CPF:</strong> {dadosFeirante.cpf_cnpj}
          </p>
          <p>
            <strong>Gênero:</strong> {dadosFeirante.genero}
          </p>
        </div>
        <div className={styles.card_endereco}>
          <h2>Endereço</h2>
          <p>
            <strong>CEP:</strong> {dadosFeirante.cep}
          </p>
          <p>
            <strong>Endereço:</strong> {dadosFeirante.endereco}, nº{" "}
            {dadosFeirante.numeroCasa}
          </p>
          <p>
            <strong>Bairro:</strong> {dadosFeirante.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {dadosFeirante.cidade} - {dadosFeirante.uf}
          </p>
        </div>
        <div className={styles.card_button}>
          <AttButton
            to={`/feirante/atualizar_feirante/${feirante._id}`}
            text="Atualizar Dados"
          />
          <button className={styles.deslogar} onClick={handleLogout} >Sair</button>
        </div>
      </div>
    </div>
  );
}
export default PerfilFeirante;
