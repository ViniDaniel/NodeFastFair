import { useState } from 'react';
import styles from '../../../styles/pages_styles/FAQ.module.css'; 

function FAQ() {

  const [openIndex, setOpenIndex] = useState(null);


  const faqItems = [
    {
      question: "Como virar um colaborador?",
      answer: "Para se tornar um colaborador, você deve preencher o formulário de inscrição em nossa página 'Trabalhe Conosco' e aguardar nosso contato para as próximas etapas. Buscamos talentos que compartilhem de nossa visão e valores."
    },
    {
      question: "Como cadastrar o Produto?",
      answer: "O cadastro de produtos é feito na seção 'Meus Produtos' do seu painel de controle. Clique em 'Adicionar Novo Produto', preencha todos os campos obrigatórios como nome, descrição, preço, categoria e faça o upload das imagens. Após a revisão, seu produto estará disponível para venda."
    },
    {
      question: "Como criar minha conta Mercado Pago?",
      answer: "A criação da conta Mercado Pago é um processo simples. Acesse o site do Mercado Pago, clique em 'Criar Conta' e siga as instruções, preenchendo seus dados pessoais e de contato. Você precisará verificar seu e-mail e telefone para ativar a conta e começar a usá-la em suas transações."
    },
	{
      question: "Denunciar um Colaborador?",
      answer: "Para denunciar um colaborador, envie um E-Mail para fastfair@gmail.com com os seguintes detalhes: Titulo da denuncia com o nome do colaborador, um print do perfil dele, um print do motivo, e explique o porque da denuncia"
    },
{
      question: "Denunciar um Cliente?",
      answer: "Para denunciar um cliente, envie um E-Mail para fastfair@gmail.com com os seguintes detalhes: Titulo da denuncia com o nome do cliente, um print do perfil dele, um print do motivo, e explique o porque da denuncia"
    },
    {
      question: "Onde vejo meus produtos comprados?",
      answer: "Você pode visualizar todos os seus produtos comprados acessando a seção 'Meus Pedidos' ou 'Minhas Compras' no seu perfil. Lá, você encontrará o histórico de todas as transações, detalhes dos produtos e o status de entrega."
    },
    {
      question: "Termos de Uso",
      answer: "Nossos Termos de Uso detalham as regras e condições para a utilização de nossos serviços e plataforma. Eles abordam aspectos como direitos autorais, responsabilidades do usuário, política de privacidade e resolução de disputas. Recomendamos a leitura completa para estar ciente de todas as diretrizes. Você pode encontrá-los na íntegra [aqui](#) (substitua '#' pelo link real para seus Termos de Uso)."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqTitle}>Perguntas Frequentes</h2>
      {faqItems.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
            <span>{item.question}</span>
            <span className={styles.toggleIcon}>
              {openIndex === index ? '−' : '+'} {/* Ícone de + ou - */}
            </span>
          </div>
          
          {openIndex === index && (
            <div className={styles.faqAnswer}>
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;