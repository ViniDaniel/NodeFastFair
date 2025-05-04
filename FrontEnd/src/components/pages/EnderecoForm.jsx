/*import validation from "../scripts/FormValidation";*/
import api from "../services/api";
import { useState, useEffect, useRef } from "react";
import styles from "../../styles/pages_styles/CadastroCliente.module.css";
import Footer from "../layout/Footer";

function EnderecoForm() {
  const inputCep = useRef();
  const inputEndereco = useRef();
  const inputNumeroCasa = useRef();
  const inputBairro = useRef();
  const inputUf = useRef();
  const inputCidade = useRef();

  async function postUser() {
    await api.post("/enderecoCliente", {
      cep: inputCep.current.value,
      endereco: inputEndereco.current.value,
      numeroCasa: inputNumeroCasa.current.value,
      bairro: inputBairro.current.value,
      uf: inputUf.current.value,
      cidade: inputCidade.current.value,

    });
  }

  return (
    <div>
      <div className={styles.div}>
        <form className={styles.form}>
          <h1>Cadastrar seu Endereço</h1>
          <div className={styles.field}>
            <label htmlFor="cep" className={styles.label}>
              CEP:
            </label>
            <input
              type="text"
              name="cep"
              id="cep"
              placeholder="Digite seu cep: "
              ref={inputCep}
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
              id="endereco"
              placeholder="Digite seu endereço: "
              ref={inputEndereco}
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
              id="numeroCasa"
              placeholder="Digite o numero da sua casa: "
              ref={inputNumeroCasa}
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
              id="bairro"
              placeholder="Digite seu o nome do seu bairro: "
              ref={inputBairro}
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
              id="cidade"
              placeholder="Digite o nome da cidade: "
              ref={inputCidade}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="uf" className={styles.label}>
              Estado (UF):
            </label>
            <select
              name="uf"
              id="uf"
              defaultValue=""
              ref={inputUf}
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
            <button
              type="submit"
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                postUser();
              }}
            >
              Cadastrar
            </button>

            <button type="reset" className={styles.button}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default EnderecoForm;
