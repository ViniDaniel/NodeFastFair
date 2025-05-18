import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClienteContext } from "../../context/ClienteContext";
import apiCliente from "../../services/apiCliente";
import {
  isValidBairro,
  isValidEndereco,
  isValidUF,
  isValidCidade,
} from "../../scripts/FormValidation";
import styles from "../../../styles/pages_styles/Cadastro.module.css";

function AtualizarEndereco() {
  const { cliente } = useContext(ClienteContext);
  const [form, setForm] = useState({
    cep: "",
    endereco: "",
    numeroCasa: "",
    bairro: "",
    cidade: "",
    uf: "",
    complemento: "",
    referencia: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEndereco() {
      try {
        const response = await apiCliente.get(
          `/enderecoCliente/${cliente._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const endereco = response.data;
        setForm({
          cep: endereco.cep || "",
          endereco: endereco.endereco || "",
          numeroCasa: endereco.numeroCasa || "",
          bairro: endereco.bairro || "",
          cidade: endereco.cidade || "",
          uf: endereco.uf || "",
          complemento: endereco.complemento || "",
          referencia: endereco.referencia || "",
        });
      } catch (err) {
        setError("Erro ao carregar endereço");
      }
    }
    if (cliente && cliente._id) {
      fetchEndereco();
    }
  }, [cliente]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEndereco(form.endereco)) {
      setError("Preencha o endereço corretamente!");
      return;
    }
    if (!isValidBairro(form.bairro)) {
      setError("Preencha o bairro corretamente!");
      return;
    }
    if (!isValidCidade(form.cidade)) {
      setError("Preencha a cidade corretamente!");
      return;
    }
    if (!isValidUF(form.uf)) {
      setError("Escolha um estado!");
      return;
    }
    try {
      await apiCliente.put(`/enderecoCliente/${cliente._id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/perfilCliente");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro ao atualizar endereço.");
      }
    }
  }
  return (
    <div className={styles.div} >
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Atualizar Endereço</h1>
            <div className={styles.field}>
                <label htmlFor="cep" className={styles.label}>CEP: </label>
                <input name="cep" value={form.cep} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.field}>
                <label htmlFor="endereco" className={styles.label}>Endereço: </label>
                        <input name="endereco" value={form.endereco} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.field}>
                <label htmlFor="numeroCasa" className={styles.label}>Numero da Casa: </label>
                <input name="numeroCasa" value={form.numeroCasa} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.field}>
                <label htmlFor="bairro" className={styles.label}>Bairro: </label>
                <input name="bairro" value={form.bairro} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.field}>
                <label htmlFor="cidade" className={styles.label}>Cidade</label>
                <input name="cidade" value={form.cidade} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.field}>
                <label htmlFor="uf" className={styles.label}>UF: </label>
                <select name="uf" onChange={handleChange} className={styles.input}>
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
            <div className={styles.field}>
                <label htmlFor="complemento" className={styles.label}>Complemento: </label>
                <input name="complemento" value={form.complemento} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.field}>
                <label htmlFor="referencia" className={styles.label}>Referencia: </label>
                 <input name="referencia" value={form.referencia} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.buttonGroup}>
                <button type="submit" className={styles.button}>Salvar</button>
                <button type="reset" className={styles.button}>Cancelar</button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </form>
    </div>
  )
}

export default AtualizarEndereco;