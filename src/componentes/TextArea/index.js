import React from 'react';
import './TextArea.css';

const TextArea = ({ value, label, name, placeholder, onChange }) => {

  const handleChange = (event) => { // Função que atualiza o valor do input
    const newValue = event.target.value; // Pega o valor do input
    onChange(newValue); // Chama a função onChange do componente pai
  };

  return (
    <div className="textarea-container">
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange} // Chama a função que atualiza o valor do input
      />
    </div>
  );
};

export default TextArea;
