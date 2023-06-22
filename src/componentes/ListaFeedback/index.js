import React, { useState, useEffect } from 'react';
import './ListaFeedback.css';

const ListaFeedback = () => {
  const [filtro, setFiltro] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const feedbacksFromStorage = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(feedbacksFromStorage);
  }, []);

  /* HANDLES */
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleAvaliacaoClick = (feedbackIndex, starIndex) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[feedbackIndex].avaliacao = starIndex;
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
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
    <div className='card_feedback'>
      <nav>
        <h2 className='titulo'>Lista de Feedbacks</h2>
        <input type="text" placeholder="Filtrar" value={filtro} onChange={handleFiltroChange} />
      </nav>
      {filteredFeedbacks.length === 0 ? (
        <p className='aviso'>Feedback não encontrado.</p>
      ) : (
        <ul>
          {filteredFeedbacks.map((feedback, feedbackIndex) => (
            <li key={feedbackIndex}>
              <h3 className='nome'>{feedback.nome}</h3>
              <p className='data'>
                Data: {feedback.data.dia}/{feedback.data.mes}/{feedback.data.ano}, {feedback.data.hora}h:{feedback.data.minuto}min
              </p>
              <p className='celular'>Celular: {feedback.celular}</p>
              <p className='email'>Email: {feedback.email}</p>
              <p className='funcionario'>Funcionário: {feedback.funcionario}</p>
              <p className='departamento'>Departamento: {feedback.departamento}</p>
              <p className='pais'>País: {feedback.pais}</p>
              <p className='estado'>Estado: {feedback.estado}</p>
              <p className='feedback'>Feedback: {feedback.feedback}</p>
              <div className='campo-avaliacao'>
                <p>
                  Avaliar: {' '}
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <span
                      key={starIndex}
                      onClick={() => handleAvaliacaoClick(feedbackIndex, starIndex)}
                      style={{
                        color: starIndex <= (feedback.avaliacao || 0) ? 'blue' : 'gray',
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
