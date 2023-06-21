import React from 'react';
import './Input.css';

const Input = ({ type, value, label, name, placeholder, onChange }) => {
  const applyDateMask = (value) => {
    if (label === 'Data') {
      let formattedValue = value
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/^(\d{2})(\d)/g, '$1/$2') // Adiciona a barra após os 2 primeiros dígitos
        .replace(/(\d{2})(\d)/, '$1/$2'); // Adiciona a barra após os próximos 2 dígitos

      if (formattedValue.length > 10) {
        formattedValue = formattedValue.substr(0, 10); // Limita o valor a 10 caracteres
      }
      return formattedValue;
    }
    return value;
  };

  const handleChange = (event) => {
    const maskedValue = applyDateMask(event.target.value);
    onChange(maskedValue);
  };

  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
