import React from 'react';
import './ListaSuspensa.css';

const ListaSuspensa = ({ options, value, label, onChange }) => {
  return (
    <div className='listaSuspensa'>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">Selecione</option> {/* Opção padrão */}
        {options.map((option) => ( // Mapeia as opções
          <option key={option.value} value={option.value}>{option.label}</option> // Retorna as opções com o valor e o label de cada um
        ))}
    </select>
    </div>
  );
};

export default ListaSuspensa;
