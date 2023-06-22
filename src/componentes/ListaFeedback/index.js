import React, { useState } from 'react';

const ListaFeedback = ({ feedbacks, funcionarioSelecionado }) => {
  const [filtro, setFiltro] = useState('');
  const [avaliacoes, setAvaliacoes] = useState({});

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleAvaliacaoClick = (feedbackIndex, starIndex) => {
    setAvaliacoes((prevAvaliacoes) => ({
      ...prevAvaliacoes,
      [feedbackIndex]: starIndex,
    }));
  };

  if (!Array.isArray(feedbacks)) {
    return <p>Nenhum feedback disponível.</p>;
  }

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const filtroLowerCase = filtro.toLowerCase();

    return (
      feedback.nome.toLowerCase().includes(filtroLowerCase) ||
      feedback.departamento.toLowerCase().includes(filtroLowerCase) ||
      feedback.pais.toLowerCase().includes(filtroLowerCase) ||
      feedback.estado.toLowerCase().includes(filtroLowerCase) ||
      feedback.celular.toLowerCase().includes(filtroLowerCase) ||
      feedback.email.toLowerCase().includes(filtroLowerCase) ||
      feedback.feedback.toLowerCase().includes(filtroLowerCase) ||
      feedback.funcionario.toLowerCase().includes(filtroLowerCase)
    );
  });

  return (
    <div>
      <h2>Lista de Feedbacks</h2>

      <div>
        <input type="text" placeholder="Filtrar" value={filtro} onChange={handleFiltroChange} />
      </div>

      {filteredFeedbacks.length === 0 ? (
        <p>Nenhum feedback encontrado.</p>
      ) : (
        <ul>
          {filteredFeedbacks.map((feedback, feedbackIndex) => (
            <li key={feedbackIndex}>
              <h3>{feedback.nome}</h3>
              <p>
                Data: {feedback.data.dia}/{feedback.data.mes}/{feedback.data.ano} {feedback.data.hora}:{feedback.data.minuto}
              </p>
              <p>Departamento: {feedback.departamento}</p>
              <p>País: {feedback.pais}</p>
              <p>Estado: {feedback.estado}</p>
              <p>Celular: {feedback.celular}</p>
              <p>Email: {feedback.email}</p>
              <p>Funcionário: {feedback.funcionario}</p> {/* Adiciona o nome do funcionário selecionado */}
              <p>Feedback: {feedback.feedback}</p>
              

              <div>
                <p>
                  Avaliar:{' '}
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <span
                      key={starIndex}
                      onClick={() => handleAvaliacaoClick(feedbackIndex, starIndex)}
                      style={{
                        color: starIndex <= (avaliacoes[feedbackIndex] || 0) ? 'blue' : 'gray',
                        cursor: 'pointer',
                      }}
                    >
                      ★
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaFeedback;
