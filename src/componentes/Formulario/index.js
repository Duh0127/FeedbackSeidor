import React, { useState } from 'react';
import Input from '../Input';
import ListaSuspensa from '../ListaSuspensa';
import ListaFeedback from '../ListaFeedback';
import './Formulario.css';

const Formulario = () => {
  /* variáveis useState, para controle dos valores nos campos */
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
  /* variáveis de controle, com useState */



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
    event.preventDefault(); // Impede o envio padrão do formulário

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
    setFeedbacks([...feedbacks, novoFeedback]); // Adiciona o novo feedback no fim da lista de feedbacks

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



  /* VARIAVEIS PARA LISTA SUSPENSA */
  const estadosPorPais = {
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'],
    EstadosUnidos: ['Nova York', 'Califórnia', 'Texas'],
    Canadá: ['Ontário', 'Quebec', 'Colúmbia Britânica'],
  };


  /* Array de tipos de departamentos */
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


  /* Array de funcionários por departamento */
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
    <div>
      {enviado ? (
        <p>Obrigado pelo seu feedback!</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            value={nome}
            label="Nome"
            name="nome"
            placeholder="Digite seu nome"
            onChange={handleNomeChange}
          />

          <Input
            type="text"
            value={celular}
            label="Celular"
            name="celular"
            placeholder="(00) 00000-0000"
            onChange={handleCelularChange}
          />

          <Input
            type="text"
            value={email}
            label="Email"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={handleEmailChange}
            isInvalid={!emailValido} // Adiciona a propriedade "isInvalid" para alterar o estilo do campo se o e-mail for inválido
          />

          <ListaSuspensa
            options={[
              { label: 'Brasil', value: 'Brasil' },
              { label: 'Estados Unidos', value: 'EstadosUnidos' },
              { label: 'Canadá', value: 'Canadá' }
            ]}
            value={paisSelecionado}
            onChange={handlePaisChange}
          />

          <ListaSuspensa
            options={estados.map((estado) => ({ label: estado, value: estado }))}
            value={estadoSelecionado}
            onChange={handleEstadoChange}
          />

          <ListaSuspensa
            options={departamentos.map((departamento) => ({ label: departamento, value: departamento }))}
            value={departamentoSelecionado}
            onChange={handleDepartamentoChange}
          />
          <ListaSuspensa
            options={funcionarios.map((funcionario) => ({ label: funcionario, value: funcionario }))}
            value={funcionarioSelecionado}
            onChange={handleFuncionarioChange}
          />

          <Input
            type="text"
            value={feedback}
            label="Feedback"
            name="feedback"
            placeholder="Digite seu feedback"
            onChange={handleFeedbackChange}
          />

          <button type="submit">Adicionar Feedback</button>
        </form>
      )}

      <ListaFeedback feedbacks={feedbacks} />
    </div>
  );
};

export default Formulario;
