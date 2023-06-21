import React from 'react';

const ListaSuspensa = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default ListaSuspensa;
