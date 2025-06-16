import {
  isValidNome,
  isValidCPF,
  isValidEmail,
  isValidCelular,
  isValidGenero,
  isValidEndereco,
  isValidBairro,
  isValidCidade,
  isValidUF,
  isValidMercadoPagoId,
  isValidSenha,
} from "../../scripts/FormValidation";
import apiFeirante from "../../services/apiFeirante";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/pages_styles/Cadastro.module.css";

function CadastroFeirante() {
  const inputNome = useRef();
  const inputCpfCnpj = useRef();
  const inputEmail = useRef();
  const inputCelular = useRef();
  const inputGenero = useRef();
  const inputSenha = useRef();
  const inputConfirmarSenha = useRef();
  const inputCep = useRef();
  const inputEndereco = useRef();
  const inputNumeroCasa = useRef();
  const inputBairro = useRef();
  const inputUf = useRef();
  const inputCidade = useRef();
  const inputMercadoPagoId = useRef();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function postUser() {
    const nome = inputNome.current.value;
    const cpf_cnpj = inputCpfCnpj.current.value;
    const email = inputEmail.current.value;
    const celular = inputCelular.current.value;
    const genero = inputGenero.current.value;
    const cep = inputCep.current.value;
    const endereco = inputEndereco.current.value;
    const numeroCasa = inputNumeroCasa.current.value;
    const bairro = inputBairro.current.value;
    const uf = inputUf.current.value;
    const cidade = inputCidade.current.value;
    const mercadoPagoId = inputMercadoPagoId.current.value;
    const senha = inputSenha.current.value;
    const confirmarSenha = inputConfirmarSenha.current.value;

    if (!isValidNome(nome)) return setError("Nome inválido!");
    if (!isValidCPF(cpf_cnpj)) return setError("CPF inválido!");
    if (!isValidEmail(email)) return setError("Email inválido");
    if (!isValidCelular(celular)) return setError("Celular inválido!");
    if (!isValidGenero(genero)) return setError("Gênero inválido!");
    if (!isValidEndereco(endereco)) return setError("Endereço inválido!");
    if (!isValidCidade(cidade)) return setError("Cidade inválida!");
    if (!isValidBairro(bairro)) return setError("Bairro inválido!");
    if (!isValidUF(uf)) return setError("Escolha um estádo!");
    if (!isValidMercadoPagoId(mercadoPagoId))
      return setError("Coloque seu token do mercado pago!");
    const senhaValidacao = isValidSenha(senha, confirmarSenha);
    if (!senhaValidacao.valid) return setError(senhaValidacao.message);

    try {
      await apiFeirante.post("/feirantes", {
        nome,
        cpf_cnpj,
        email,
        celular,
        genero,
        cep: cep || undefined,
        endereco,
        numeroCasa: numeroCasa || undefined,
        bairro,
        uf,
        cidade,
        mercadoPagoId,
        senha,
        confirmarSenha,
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/loginFeirante");
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message); //retorna mensagem de erro do backend, caso ja tenha algum dado cadastrado
      } else {
        setError("Erro ao cadastrar feirante. Tente novamente.");
      }
    }
  }

  return (
    <div>
      <div className={styles.div}>
        <form className={styles.form}>
          <h1>Cadastrar Feirante</h1>
          <div className={styles.field}>
            <label htmlFor="nome" className={styles.label}>
              Nome:
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite seu nome: "
              ref={inputNome}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="cpf_cnpj" className={styles.label}>
              CPF:
            </label>

            <input
              type="text"
              name="cpf_cnpj"
              id="cpf_cnpj"
              placeholder="Digite seu CPF: "
              ref={inputCpfCnpj}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-Mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email: "
              ref={inputEmail}
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
              id="celular"
              placeholder="Digite seu numero de celular: "
              ref={inputCelular}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="genero" className={styles.label}>
              Gênero:
            </label>
            <select
              name="genero"
              id="genero"
              defaultValue=""
              ref={inputGenero}
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
              Estado:
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
          
          <div className={styles.field}>
            <label htmlFor="senha" className={styles.label}>
              Mercado Pago ID:
            </label>
            <input
              type="text"
              name="mercadoPagoId"
              id="mercadoPagoId"
              placeholder="Digite o código do mercado pago: "
              ref={inputMercadoPagoId}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="senha" className={styles.label}>
              Senha:
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite sua senha: "
              ref={inputSenha}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmarSenha" className={styles.label}>
              Confirmar Senha:
            </label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Digite sua senha novamente: "
              ref={inputConfirmarSenha}
              className={styles.input}
            />
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
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default CadastroFeirante;
