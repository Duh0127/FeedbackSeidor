import React, { useState } from 'react';
import Input from '../Input';
import ListaSuspensa from '../ListaSuspensa';
import ListaFeedback from '../ListaFeedback';

const Formulario = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [paisSelecionado, setPaisSelecionado] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  const handleNomeChange = (value) => {
    setNome(value);
  };

  const handleDataChange = (value) => {
    setData(value);
  };

  const handlePaisChange = (event) => {
    setPaisSelecionado(event.target.value);
    setEstadoSelecionado('');
  };

  const handleEstadoChange = (event) => {
    setEstadoSelecionado(event.target.value);
  };

  const handleDepartamentoChange = (event) => {
    setDepartamentoSelecionado(event.target.value);
  };

  const handleFeedbackChange = (value) => {
    setFeedback(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const novoFeedback = {
      nome,
      data,
      pais: paisSelecionado,
      estado: estadoSelecionado,
      departamento: departamentoSelecionado,
      feedback
    };

    setFeedbacks([...feedbacks, novoFeedback]);

    // Limpar os campos do formulário
    setNome('');
    setData('');
    setPaisSelecionado('');
    setEstadoSelecionado('');
    setDepartamentoSelecionado('');
    setFeedback('');
  };

  const estadosPorPais = {
    Brasil: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'],
    EstadosUnidos: ['Nova York', 'Califórnia', 'Texas'],
    Canadá: ['Ontário', 'Quebec', 'Colúmbia Britânica'],
  };

  const estados = estadosPorPais[paisSelecionado] || [];

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

  return (
    <div>
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
          value={data}
          label="Data"
          name="data"
          placeholder="Digite a data"
          onChange={handleDataChange}
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

        {estados.length > 0 && (
          <ListaSuspensa
            options={estados.map((estado) => ({ label: estado, value: estado }))}
            value={estadoSelecionado}
            onChange={handleEstadoChange}
          />
        )}

        <ListaSuspensa
          options={departamentos.map((departamento) => ({ label: departamento, value: departamento }))}
          value={departamentoSelecionado}
          onChange={handleDepartamentoChange}
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

      <ListaFeedback feedbacks={feedbacks} />
    </div>
  );
};

export default Formulario;
