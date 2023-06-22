import React, { Fragment, useState } from 'react';
import Input from '../Input';
import ListaSuspensa from '../ListaSuspensa';
import ListaFeedback from '../ListaFeedback';
import './Formulario.css';
import TextArea from '../TextArea';

const Formulario = () => {
  /* VARIAVEIS USESTATE PARA CONTROLE DOS CAMPOS DO FORMULARIO */
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [emailValido, setEmailValido] = useState(true);
  const [paisSelecionado, setPaisSelecionado] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [enviado, setEnviado] = useState(false);




  /* HANDLES *//* HANDLES *//* HANDLES */
  const handleNomeChange = (value) => {
    setNome(value); //atribui o novo valor ao nome
  };
  const handleCelularChange = (value) => {
    setCelular(value); //atribui o novo valor ao celular
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailValido(true); // Redefine a validade do e-mail ao alterar seu valor
  };

  const handlePaisChange = (event) => {
    setPaisSelecionado(event.target.value); // Atribui o novo valor ao país selecionado
    setEstadoSelecionado(''); // Limpa o estado selecionado
  };

  const handleEstadoChange = (event) => {
    setEstadoSelecionado(event.target.value); // Atribui o novo valor ao estado selecionado
  };

  const handleDepartamentoChange = (event) => {
    setDepartamentoSelecionado(event.target.value); // Atribui o novo valor ao departamento selecionado
    setFuncionarioSelecionado(''); // Limpa o funcionário selecionado
  };

  const handleFuncionarioChange = (event) => {
    setFuncionarioSelecionado(event.target.value); // Atribui o novo valor ao funcionário selecionado
  };
  const handleFeedbackChange = (value) => {
    setFeedback(value); // Atribui o novo valor ao feedback
  };




  /* VARIAVEL PARA SUBMIT DO FORMULARIO */
  const handleFormSubmit = (event) => {
    
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (nome.trim() === '' || feedback.trim() === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Verificar a validade do e-mail
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setEmailValido(false);
      return;
    }

    const novoFeedback = { // Cria um novo CARD de feedback
      nome,
      celular,
      email,
      data: {
        dia: new Date().getDate(), //obtém o dia atual
        mes: new Date().getMonth() + 1, //obtém o mês atual
        ano: new Date().getFullYear(), //obtém o ano atual
        hora: new Date().getHours(), //obtém a hora atual
        minuto: new Date().getMinutes(), //obtém o minuto atual
      },
      pais: paisSelecionado,
      estado: estadoSelecionado,
      departamento: departamentoSelecionado,
      funcionario: funcionarioSelecionado,
      feedback,
    };
    // Salvar o objeto no localStorage
    const feedbacksFromStorage = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const updatedFeedbacks = [...feedbacksFromStorage, novoFeedback];
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));

    // Atualizar o estado local com os novos feedbacks
    setFeedbacks(updatedFeedbacks);


    // Limpar os campos do formulário
    setNome('');
    setCelular('');
    setEmail('');
    setPaisSelecionado('');
    setEstadoSelecionado('');
    setDepartamentoSelecionado('');
    setFuncionarioSelecionado('');
    setFeedback('');
  };




  /* ARRAY PARA LISTA SUSPENSA */
  const estadosPorPais = {
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'],
    EstadosUnidos: ['Nova York', 'Califórnia', 'Texas'],
    Canadá: ['Ontário', 'Quebec', 'Colúmbia Britânica'],
  };

  /* ARRAY PARA DEPARTAMENTOS */
  const departamentos = [
    'ReactJS',
    'Angular',
    'Python',
    'SQL',
    'Analista de Dados',
    'Recursos Humanos',
    'Redes',
    'CyberSecurity',
  ];

  /* ARRAY DE FUNCIONÁRIOS POR DEPARTAMENTO */
  const funcionariosPorDepartamento = {
    ReactJS: ['José', 'Rodrigo', 'Fabio'],
    Angular: ['Fernanda', 'Caio', 'Amanda'],
    Python: ['Gabriel', 'Marco', 'Janaina'],
    SQL: ['Lucas', 'Bruna', 'Rafael'],
    'Analista de Dados': ['Laís', 'Pedro', 'Mariana'],
    'Recursos Humanos': ['Regina', 'Áurea', 'Márcia'],
    Redes: ['Maria', 'Gustavo', 'Gabriela'],
    CyberSecurity: ['Alberto', 'Eduardo', 'Kauê'],
  };

  const estados = estadosPorPais[paisSelecionado] || []; // Obtém os estados do país selecionado
  const funcionarios = funcionariosPorDepartamento[departamentoSelecionado] || []; // Obtém os funcionários do departamento selecionado




  /* FORMULARIO */
  return (
    <Fragment>
      {enviado ? (
        <p>Obrigado pelo seu feedback!</p>
      )
        :
        ( // Se o formulário não foi enviado, exibir o formulário

          <form onSubmit={handleFormSubmit}>

            <div className='imagem'>
              <img src="/images/logos_fundoescuro.png" width={200} alt="logo" />
              <p>Human Focused, Technology Experts</p>
            </div>

            <h1>Seus Dados:</h1>

            <div className='nome-cel'>
              <Input
                type="text"
                value={nome}
                label="Nome *"
                name="nome"
                placeholder="Digite seu nome"
                onChange={handleNomeChange}
              />
              <Input
                type="text"
                value={celular}
                label="Celular *"
                name="celular"
                placeholder="Digite seu celular"
                onChange={handleCelularChange}
              />
            </div>

            <Input
              type="text"
              value={email}
              label="Email *"
              name="email"
              placeholder="Digite seu e-mail"
              onChange={handleEmailChange}
              isInvalid={!emailValido} // Adiciona a propriedade "isInvalid" para alterar o estilo do campo se o e-mail for inválido
            />

            <h2>Sobre o Funcionário:</h2>

            <div className='cols'>
              <div className='left-col'>
                <ListaSuspensa
                  label='País * '
                  options={[
                    { label: 'Brasil', value: 'Brasil' },
                    { label: 'Estados Unidos', value: 'EstadosUnidos' },
                    { label: 'Canadá', value: 'Canadá' }
                  ]}
                  value={paisSelecionado}
                  onChange={handlePaisChange}
                />
                {estados.length > 0 && (
                  <ListaSuspensa
                    label='Estado * '
                    options={estados.map((estado) => ({ label: estado, value: estado }))}
                    value={estadoSelecionado}
                    onChange={handleEstadoChange}
                  />
                )}
              </div>

              <div className='right-col'>
                <ListaSuspensa
                  label='Departamento *'
                  options={departamentos.map((departamento) => ({ label: departamento, value: departamento }))}
                  value={departamentoSelecionado}
                  onChange={handleDepartamentoChange}
                />
                {funcionarios.length > 0 && (
                  <ListaSuspensa
                    label='Funcionário * '
                    options={funcionarios.map((funcionario) => ({ label: funcionario, value: funcionario }))}
                    value={funcionarioSelecionado}
                    onChange={handleFuncionarioChange}
                  />
                )}
              </div>
            </div>


            <TextArea
              id="feedback"
              type="text"
              value={feedback}
              label="Feedback *"
              name="feedback"
              placeholder="Digite seu feedback"
              onChange={handleFeedbackChange}
            />

            <button type="submit">Adicionar Feedback</button>
          </form>
        )}

      <section className='cardsFeedback'>
        <ListaFeedback feedbacks={feedbacks} />
      </section>
    </Fragment>
  );
};

export default Formulario;