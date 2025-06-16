import { useEffect, useState, useContext } from "react";
import { FeiranteContext } from "../../../context/FeiranteContext";
import apiFeirante from "../../../services/apiFeirante";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import LinkButton from "../../../layout/LinkButton";
import {
  atualizarDescricao,
  adicionarTopico,
  atualizarTopico,
  removerTopico,
  adicionarEndereco,
  atualizarEndereco,
  removeEndereco,
  adicionarContato,
  atualizarContato,
  removeContato,
  atualizarCapa,
} from "../../../scripts/DescricaoFormFeiranteService";
import styles from "../../../../styles/pages_styles/DescricaoFeirante.module.css";

function DescricaoFeirante() {
  const { feirante } = useContext(FeiranteContext);
  const [error, setError] = useState();
  const [descricao, setDescricao] = useState(null);
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [novoTopico, setNovoTopico] = useState("");
  const [topicosEditados, setTopicosEditados] = useState([]);
  const [novoEndereco, setNovoEndereco] = useState("");
  const [enderecosEditados, setEnderecosEditados] = useState([]);
  const [novoContatoTipo, setNovoContatoTipo] = useState("");
  const [novoContatoValor, setNovoContatoValor] = useState("");

  const [contatosEditados, setContatosEditados] = useState([]);
  const [novaCapa, setNovaCapa] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchDescricao = async () => {
    try {
      const { data } = await apiFeirante.get(
        `/feirante/descricao/${feirante._id}`
      );
      setDescricao(data);
      setTopicosEditados(data.topicos);
      setEnderecosEditados(data.enderecos);
      setContatosEditados(data.contatos);
    } catch (error) {
      if (error.response?.status === 4001) {
        navigate("loginFeirante");
      } else {
        setDescricao(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feirante?._id) {
      fetchDescricao();
    }
  }, [feirante, location.state]);

  const handleUpdateDescricao = async () => {
    try {
      await atualizarDescricao(feirante._id, descricao._id, descricaoEditada);
      setDescricaoEditada("");
      fetchDescricao();
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao atualizar descrição");
      }
    }
  };

  const handleAddTopico = async () => {
    if (!novoTopico) return;
    await adicionarTopico(feirante._id, descricao._id, novoTopico);
    setNovoTopico("");
    fetchDescricao();
  };

  const handleUpdateTopico = async () => {
    try {
      const topicosAtualizados = [...topicosEditados];
      await atualizarTopico(feirante._id, descricao._id, topicosAtualizados);
      fetchDescricao(); // Atualiza os dados com o retorno do backend
    } catch (error) {
      console.error("Erro ao atualizar tópico:", error);
    }
  };

  const handleDeleteTopico = async (topico) => {
    await removerTopico(feirante._id, descricao._id, topico);
    fetchDescricao();
  };

  const handleAddEndereco = async () => {
    if (!novoEndereco) return;
    await adicionarEndereco(feirante._id, descricao._id, novoEndereco);
    setNovoEndereco("");
    fetchDescricao();
  };

  const handleUpdateEndereco = async () => {
    try {
      const enderecosAtualizados = [...enderecosEditados];
      await atualizarEndereco(
        feirante._id,
        descricao._id,
        enderecosAtualizados
      );
      fetchDescricao();
    } catch (error) {
      console.error("Erro ao atualizar endereço.", error);
    }
  };

  const handleDeleteEndereco = async (endereco) => {
    await removeEndereco(feirante._id, descricao._id, endereco);
    fetchDescricao();
  };

  const handleAddContato = async () => {
    if (!novoContatoValor) return;
    const novo = { tipo: novoContatoTipo, valor: novoContatoValor };
    await adicionarContato(feirante._id, descricao._id, novo);
    setNovoContatoValor("");
    fetchDescricao();
  };

  const handleUpdateContato = async () => {
    try {
      await atualizarContato(feirante._id, descricao._id, contatosEditados);
      fetchDescricao();
    } catch (error) {
      console.error("Erro ao atualizar contatos:", error);
    }
  };

  const handleDeleteContato = async (contato) => {
    await removeContato(feirante._id, descricao._id, contato);
    fetchDescricao();
  };

  const handleUpdateCapa = async () => {
    if(!novaCapa) return;

    const formData = new FormData()
    formData.append("capa", novaCapa)

    try {
      await atualizarCapa(feirante._id, descricao._id, formData);
      setNovaCapa("");
      fetchDescricao();
    } catch (error) {
      console.error("Erro ao atualizar a capa", error);
    }
    fetchDescricao();
  };

  if (loading) return <p>Carregando...</p>;
  if (!descricao)
    return (
      <div>
        <h1>Descrição não encontrada</h1>
        <LinkButton
          to="/feirante/adicionar_descricao/"
          text="Adicionar descrição"
        />
      </div>
    );

  return (
    <div className={styles.div}>
      <h2 className={styles.h2}>Descrição do Feirante</h2>
      <div className={styles.descricao}>
        <p>{descricao.descricao}</p>
        <input
          type="text"
          value={descricaoEditada}
          onChange={(e) => setDescricaoEditada(e.target.value)}
          placeholder="Atualizar descrição"
          className={styles.input}
        />
        <button
          onClick={handleUpdateDescricao}
          className={styles.btn_atualizar}
        >
          Atualizar Descrição
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.topicos}>
        <h3 className={styles.h3}>Topicos</h3>
        <ul className={styles.ul}>
          {topicosEditados.map((topico, i) => (
            <li key={i} className={styles.li}>
              <input
                type="text"
                value={topico}
                onChange={(e) => {
                  const novosTopicos = [...topicosEditados];
                  novosTopicos[i] = e.target.value;
                  setTopicosEditados(novosTopicos);
                }}
                className={styles.input}
              />
              <div className={styles.buttonGroup}>
                <button
                  className={styles.btn_atualizar}
                  onClick={() => handleUpdateTopico(i)}
                >
                  Atualizar
                </button>
                <button
                  className={styles.trash}
                  onClick={() => handleDeleteTopico(topico)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={novoTopico}
          onChange={(e) => setNovoTopico(e.target.value)}
          placeholder="Novo tópico"
          className={styles.input}
        />
        <button onClick={handleAddTopico} className={styles.btn_adicionar}>
          Adicionar Tópico
        </button>
      </div>

      <div className={styles.enderecos}>
        <h3 className={styles.h3}>Endereços</h3>
        <ul className={styles.ul}>
          {enderecosEditados.map((endereco, i) => (
            <li key={i} className={styles.li}>
              <input
                type="text"
                value={endereco}
                onChange={(e) => {
                  const novosEnderecos = [...enderecosEditados];
                  novosEnderecos[i] = e.target.value;
                  setEnderecosEditados(novosEnderecos);
                }}
                className={styles.input}
              />
              <div className={styles.buttonGroup}>
                <button
                  className={styles.btn_atualizar}
                  onClick={() => handleUpdateEndereco(i)}
                >
                  Atualizar
                </button>
                <button
                  className={styles.trash}
                  onClick={() => handleDeleteEndereco(endereco)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={novoEndereco}
          onChange={(e) => setNovoEndereco(e.target.value)}
          placeholder="Novo endereço"
          className={styles.input}
        />
        <button className={styles.btn_adicionar} onClick={handleAddEndereco}>
          Adicionar Endereço
        </button>
      </div>

      <div className={styles.contatos}>
        <h3 className={styles.h3}>Contatos</h3>
        <ul className={styles.ul}>
          {contatosEditados.map((contato, i) => (
            <li key={i} className={styles.li}>
              <select
                value={contato.tipo}
                onChange={(e) => {
                  const novos = [...contatosEditados];
                  novos[i].tipo = e.target.value;
                  setContatosEditados(novos);
                }}
                className={styles.select}
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Instagram">Instagram</option>
              </select>
              <input
                type="text"
                value={contato.valor}
                onChange={(e) => {
                  const novos = [...contatosEditados];
                  novos[i].valor = e.target.value;
                  setContatosEditados(novos);
                }}
                className={styles.input}
              />
              <div className={styles.buttonGroup}>
                <button
                  className={styles.btn_atualizar}
                  onClick={handleUpdateContato}
                >
                  Atualizar Contato
                </button>
                <button
                  className={styles.trash}
                  onClick={() => handleDeleteContato(contato)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <select
          className={styles.select}
          value={novoContatoTipo}
          onChange={(e) => setNovoContatoTipo(e.target.value)}
        >
          <option value="WhatsApp">WhatsApp</option>
          <option value="Email">Email</option>
          <option value="Telefone">Telefone</option>
          <option value="Instagram">Instagram</option>
        </select>
        <input
          type="text"
          placeholder="Digite o contato"
          value={novoContatoValor}
          onChange={(e) => setNovoContatoValor(e.target.value)}
          className={styles.input}
        />

        <button className={styles.btn_adicionar} onClick={handleAddContato}>
          Adicionar Contato
        </button>
      </div>

      <div className={styles.capa}>
        <h3 className={styles.h3}>Capa</h3>
        <p>
          {descricao.capa?.map((img, idx) => (
            <img
              key={idx}
              src={`https://nodefastfair.onrender.com/${img}`}
              alt="Capa do feirante"
            />
          )) || "Sem capa definida"}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNovaCapa(e.target.files[0])}
          className={styles.capaInput}
        />
        <button className={styles.btn_atualizar} onClick={handleUpdateCapa}>
          Atualizar Capa
        </button>
      </div>
    </div>
  );
}

export default DescricaoFeirante;
