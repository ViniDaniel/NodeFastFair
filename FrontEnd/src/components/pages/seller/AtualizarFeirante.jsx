import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiFeirante from "../../services/apiFeirante";
import { FeiranteContext } from "../../context/FeiranteContext";
import styles from "../../../styles/pages_styles/Cadastro.module.css";
import {
  isValidNome,
  isValidCelular,
  isValidGenero,
  isValidEndereco,
  isValidBairro,
  isValidCidade,
  isValidUF,
} from "../../scripts/FormValidation";

function AtualizarFeirante() {
  const { feirante } = useContext(FeiranteContext);
  const [form, setForm] = useState({
    nome: "",
    celular: "",
    genero: "",
    cep: "",
    endereco: "",
    numeroCasa: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

useEffect(() => {
  async function fetchFeirante() {
    if (!feirante || !feirante._id) return;
    try {
      const response = await apiFeirante.get(`/feirantes/${feirante._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = response.data;

      setForm({
        nome: data.nome || "",
        celular: data.celular || "",
        genero: data.genero || "",
        cep: data.cep || "",
        endereco: data.endereco || "",
        numeroCasa: data.numeroCasa || "",
        bairro: data.bairro || "",
        cidade: data.cidade || "",
        uf: data.uf || "",
      });
    } catch (err) {
      console.error("Erro ao buscar feirante:", err);
      setError("Não foi possível carregar os dados do feirante.");
    }
  }

  fetchFeirante();
}, [feirante]);


  function handlechange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function putUser(e) {
    e.preventDefault();
    if (!isValidNome(form.nome)) {
      return setError("Nome inválido!");
    }
    if (!isValidCelular(form.celular)) {
      return setError("Celular inválido!");
    }
    if (!isValidGenero(form.genero)) {
      return setError("Selecione um gênero!");
    }
    if (!isValidEndereco(form.endereco)) {
      return setError("Informe seu endereço!");
    }
    if (!isValidBairro(form.bairro)) {
      return setError("Informe seu bairro!");
    }
    if (!isValidCidade(form.cidade)) {
      return setError("Informe sua cidade!");
    }
    if (!isValidUF(form.uf)) {
      return setError("Selecione um estado válido!");
    }
    try {
      const response = await apiFeirante.put(`/feirantes/`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Atualizado com sucesso", response.data);
      navigate("/perfilFeirante");
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao atualizar os dados.");
      }
    }
  }

  return (
    <div className={styles.div}>
      <form className={styles.form} onSubmit={putUser}>
        <h1>Atualizar Dados</h1>
        <div className={styles.field}>
          <label htmlFor="nome" className={styles.label}>
            Nome:
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handlechange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="celular" className={styles.label}>
            Celular:
          </label>
          <input
            type="tel"
            name="celular"
            value={form.celular}
            onChange={handlechange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="genero" className={styles.label}>
            Gênero:
          </label>
          <select
            name="genero"
            value={form.genero}
            onChange={handlechange}
            className={styles.input}
          >
            <option disabled value="">
              Selecione um gênero
            </option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
            <option value="Não Informado">Prefiro não informar</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="cep" className={styles.label}>
            CEP:
          </label>
          <input
            name="cep"
            value={form.cep}
            onChange={handlechange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="endereco" className={styles.label}>
            Endereço:
          </label>
          <input
            type="text"
            name="endereco"
            value={form.endereco}
            onChange={handlechange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="numeroCasa" className={styles.label}>
            Numero da Casa:
          </label>
          <input
            type="number"
            name="numeroCasa"
            value={form.numeroCasa}
            onChange={handlechange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="bairro" className={styles.label}>
            Bairro:
          </label>
          <input
            type="text"
            name="bairro"
            value={form.bairro}
            onChange={handlechange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="cidade" className={styles.label}>
            Cidade:
          </label>
          <input
            type="text"
            name="cidade"
            value={form.cidade}
            onChange={handlechange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="uf" className={styles.label}>
            Estado:
          </label>
          <select
            name="uf"
            value={form.uf}
            onChange={handlechange}
            className={styles.input}
          >
            <option disabled value="">
              Selecione o seu estado
            </option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            Salvar
          </button>

          <button type="reset" className={styles.button}>
            Cancelar
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
export default AtualizarFeirante;
