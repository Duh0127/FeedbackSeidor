import React, { useState } from 'react';
import './ListaFeedback.css';

const ListaFeedback = ({ feedbacks }) => {
  const [filtro, setFiltro] = useState('');
  const [avaliacoes, setAvaliacoes] = useState({});


  /* HANDLES *//* HANDLES *//* HANDLES */
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleAvaliacaoClick = (feedbackIndex, starIndex) => {
    setAvaliacoes((prevAvaliacoes) => ({
      ...prevAvaliacoes,
      [feedbackIndex]: starIndex,
    }));
  };



  if (!Array.isArray(feedbacks)) { // Se o array for falso (vazio), retorna um aviso
    return <p>Nenhum feedback disponível.</p>;
  }



  const filteredFeedbacks = feedbacks.filter((feedback) => { // Filtra os feedbacks por nome, departamento, país, estado, celular, email, feedback e funcionário
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



  /* LISTA FEEDBACK */
  return (
    <div className='card_feedback'>

      <nav>
        <h2 className='titulo'>Lista de Feedbacks</h2>
        <input type="text" placeholder="Filtrar" value={filtro} onChange={handleFiltroChange} />
      </nav>

      {filteredFeedbacks.length === 0 ? ( // Se o filtro retornar vazio, retorna um aviso
        <p className='aviso'>Feedback não encontrado.</p>
      ) : (
        <ul>
          {filteredFeedbacks.map((feedback, feedbackIndex) => (
            <li key={feedbackIndex}>
              <h3 className='nome'>{feedback.nome}</h3>
              <p className='data'>
                Data: {feedback.data.dia}/{feedback.data.mes}/{feedback.data.ano}, 
                      {feedback.data.hora}h:{feedback.data.minuto}min
              </p>
              <p className='celular'>Celular: {feedback.celular}</p>
              <p className='email'>Email: {feedback.email}</p>
              <p className='funcionario'>Funcionário: {feedback.funcionario}</p> {/* Adiciona o nome do funcionário selecionado */}
              <p className='departamento'>Departamento: {feedback.departamento}</p>
              <p className='pais'>País: {feedback.pais}</p>
              <p className='estado'>Estado: {feedback.estado}</p>
              <p className='feedback'>Feedback: {feedback.feedback}</p>
              

              <div className='campo-avaliacao'> {/* Adiciona o campo de avaliação */}
                <p>
                  Avaliar:{' '}
                  {[1, 2, 3, 4, 5].map((starIndex) => ( // Adiciona as estrelas de avaliação
                    <span
                      key={starIndex} // Chave para cada estrela
                      onClick={() => handleAvaliacaoClick(feedbackIndex, starIndex)} // Ao clicar na estrela, chama a função handleAvaliacaoClick
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
