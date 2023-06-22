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

  /* VARIAVEIS USESTATE PARA VERIFICACAO DOS CAMPOS DO FORMULARIO */
  const [nomeErro, setNomeErro] = useState(false);
  const [celularErro, setCelularErro] = useState(false);
  const [emailErro, setEmailErro] = useState(false);
  const [paisErro, setPaisErro] = useState(false);
  const [estadoErro, setEstadoErro] = useState(false);
  const [departamentoErro, setDepartamentoErro] = useState(false);
  const [funcionarioErro, setFuncionarioErro] = useState(false);
  const [feedbackErro, setFeedbackErro] = useState(false);

  /* HANDLES */
  const handleNomeChange = (value) => {
    setNome(value);
    setNomeErro(false);
  };

  const handleCelularChange = (value) => {
    setCelular(value);
    setCelularErro(false);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailValido(true);
    setEmailErro(false);
  };

  const handlePaisChange = (event) => {
    setPaisSelecionado(event.target.value);
    setPaisErro(false);
    setEstadoSelecionado('');
  };

  const handleEstadoChange = (event) => {
    setEstadoSelecionado(event.target.value);
    setEstadoErro(false);
  };

  const handleDepartamentoChange = (event) => {
    setDepartamentoSelecionado(event.target.value);
    setDepartamentoErro(false);
    setFuncionarioSelecionado('');
  };

  const handleFuncionarioChange = (event) => {
    setFuncionarioSelecionado(event.target.value);
    setFuncionarioErro(false);
  };

  const handleFeedbackChange = (value) => {
    setFeedback(value);
    setFeedbackErro(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (
      nome.trim() === '' ||
      celular.trim() === '' ||
      email.trim() === '' ||
      paisSelecionado.trim() === '' ||
      estadoSelecionado.trim() === '' ||
      departamentoSelecionado.trim() === '' ||
      funcionarioSelecionado.trim() === '' ||
      feedback.trim() === ''
    ) {
      if (nome.trim() === '') setNomeErro(true);
      if (celular.trim() === '') setCelularErro(true);
      if (email.trim() === '') setEmailErro(true);
      if (paisSelecionado.trim() === '') setPaisErro(true);
      if (estadoSelecionado.trim() === '') setEstadoErro(true);
      if (departamentoSelecionado.trim() === '') setDepartamentoErro(true);
      if (funcionarioSelecionado.trim() === '') setFuncionarioErro(true);
      if (feedback.trim() === '') setFeedbackErro(true);

      return;
    }

    // Verificar a validade do e-mail
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setEmailValido(false);
      return;
    }

    const novoFeedback = {
      nome,
      celular,
      email,
      data: {
        dia: new Date().getDate(),
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
        hora: new Date().getHours(),
        minuto: new Date().getMinutes(),
      },
      pais: paisSelecionado,
      estado: estadoSelecionado,
      departamento: departamentoSelecionado,
      funcionario: funcionarioSelecionado,
      feedback,
    };

    const feedbacksFromStorage = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const updatedFeedbacks = [...feedbacksFromStorage, novoFeedback];
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));

    setFeedbacks(updatedFeedbacks);

    setNome('');
    setCelular('');
    setEmail('');
    setPaisSelecionado('');
    setEstadoSelecionado('');
    setDepartamentoSelecionado('');
    setFuncionarioSelecionado('');
    setFeedback('');
    setEnviado(true);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const estadosPorPais = {
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'],
    EstadosUnidos: ['Nova York', 'Califórnia', 'Texas'],
    Canadá: ['Ontário', 'Quebec', 'Colúmbia Britânica'],
  };

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

  const estados = estadosPorPais[paisSelecionado] || [];
  const funcionarios = funcionariosPorDepartamento[departamentoSelecionado] || [];

  return (
    <Fragment>
      {enviado ? (
        <p>Obrigado pelo seu feedback!</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className='imagem'>
            <img src='/images/logos_fundoescuro.png' width={200} alt='logo' />
            <p>Human Focused, Technology Experts</p>
          </div>

          <h1>Seus Dados:</h1>

          <div className='nome-cel'>
            <Input
              type='text'
              value={nome}
              label='Nome *'
              name='nome'
              placeholder='Digite seu nome'
              onChange={handleNomeChange}
            />
            {nomeErro && <span className='error-message'>Preencha o campo acima</span>}
            <Input
              type='text'
              value={celular}
              label='Celular *'
              name='celular'
              placeholder='Digite seu celular'
              onChange={handleCelularChange}
            />
            {celularErro && <span className='error-message'>Preencha o campo acima</span>}
          </div>

          <Input
            type='text'
            value={email}
            label='Email *'
            name='email'
            placeholder='Digite seu e-mail'
            onChange={handleEmailChange}
            isInvalid={!emailValido}
          />
          {emailErro && <span className='error-message'>Preencha o campo acima</span>}

          <h2>Sobre o Funcionário:</h2>

          <div className='cols'>
            <div className='left-col'>
              <ListaSuspensa
                label='País * '
                options={[
                  { label: 'Brasil', value: 'Brasil' },
                  { label: 'Estados Unidos', value: 'EstadosUnidos' },
                  { label: 'Canadá', value: 'Canadá' },
                ]}
                value={paisSelecionado}
                onChange={handlePaisChange}
              />
              {paisErro && <span className='error-message'>Preencha o campo acima</span>}
              {estados.length > 0 && (
                <ListaSuspensa
                  label='Estado * '
                  options={estados.map((estado) => ({ label: estado, value: estado }))}
                  value={estadoSelecionado}
                  onChange={handleEstadoChange}
                />
              )}
              {estadoErro && <span className='error-message'>Preencha o campo acima</span>}
            </div>

            <div className='right-col'>
              <ListaSuspensa
                label='Departamento *'
                options={departamentos.map((departamento) => ({ label: departamento, value: departamento }))}
                value={departamentoSelecionado}
                onChange={handleDepartamentoChange}
              />
              {departamentoErro && <span className='error-message'>Preencha o campo acima</span>}
              {funcionarios.length > 0 && (
                <ListaSuspensa
                  label='Funcionário * '
                  options={funcionarios.map((funcionario) => ({ label: funcionario, value: funcionario }))}
                  value={funcionarioSelecionado}
                  onChange={handleFuncionarioChange}
                />
              )}
              {funcionarioErro && <span className='error-message'>Preencha o campo acima</span>}
            </div>
          </div>

          <TextArea
            id='feedback'
            type='text'
            value={feedback}
            label='Feedback *'
            name='feedback'
            placeholder='Digite seu feedback'
            onChange={handleFeedbackChange}
          />
          {feedbackErro && <span className='error-message'>Preencha o campo acima</span>}

          <button type='submit' disabled={!nome || !celular || !email || !paisSelecionado || !estadoSelecionado || !departamentoSelecionado || !funcionarioSelecionado || !feedback}>
            Adicionar Feedback
          </button>
        </form>
      )}
      <ListaFeedback feedbacks={feedbacks} />
    </Fragment>
  );
};

export default Formulario;
