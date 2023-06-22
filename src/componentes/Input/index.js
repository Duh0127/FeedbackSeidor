import React from 'react';
import './Input.css';

const Input = ({ type, value, label, name, placeholder, onChange }) => {
  const applyDateMask = (value) => {
    if (label === 'Data') {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const formattedValue = `${day}/${month}/${year} ${hours}:${minutes}`;
      return formattedValue;
    }
    if (label === 'Celular') {
      const maskedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      const formattedValue = `(${maskedValue.slice(0, 2)}) ${maskedValue.slice(2, 7)}-${maskedValue.slice(7, 11)}`;
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
        value={applyDateMask(value)}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={label === 'Data'} // Impede a edição do campo se o label for 'Data'
      />
    </div>
  );
};

export default Input;
