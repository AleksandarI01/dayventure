import React, { useState } from 'react';
import Icon from '../Icon/Icon';

const InputField = ({ label, type, placeholder, icon: IconComponent,color, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if(onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {IconComponent && 
        <div className="pt-1">
          <Icon icon={IconComponent} color={color} />
        </div>}
      <div>
        {label && <label className="block text-venture-gray text-sm font-bold mb-2" htmlFor={label}>{label}</label>}
        <input 
          className="shadow appearance-none border rounded w-[244px] py-2 px-3 text-venture-black leading-tight focus:outline-none focus:shadow-outline" 
          id={label} 
          type={type} 
          placeholder={placeholder} 
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputField;

