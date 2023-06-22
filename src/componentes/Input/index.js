import React from 'react';
import './Input.css';

const Input = ({ type, value, label, name, placeholder, onChange }) => {
  
  const applyDateMask = (value) => { // Adiciona máscara de data ao campo
    if (label === 'Data') { // Se o label for 'Data', retorna a data atual
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const formattedValue = `${day}/${month}/${year} ${hours}:${minutes}`;
      return formattedValue;
    }

    if (label === 'Celular *') { // Se o label for 'Celular *', retorna o número formatado
      const maskedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
      const formattedValue = `${maskedValue.slice(0, 2)} ${maskedValue.slice(2, 7)} ${maskedValue.slice(7, 11)}`;
      if(!maskedValue){
        return '';
      }
      else{
        return formattedValue;
      }
    }
    return value;
  };

  const handleChange = (event) => { // Função que é chamada toda vez que o valor do input é alterado
    const maskedValue = applyDateMask(event.target.value);
    onChange(maskedValue);
  };


  /*INPUT*/
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={applyDateMask(value)} // Aplica a máscara de data ao valor do input
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange} // Chama a função que é executada toda vez que o valor do input é alterado
        readOnly={label === 'Data'} // Impede a edição do campo se o label for 'Data'
      />
    </div>
  );
};
export default Input;