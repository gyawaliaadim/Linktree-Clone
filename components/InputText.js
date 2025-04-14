import React from 'react'

const InputText = ({ name, placeholder, value, onChange }) => {
  return (
    <div>
      <input
        name={name}
        value={value}
        className="py-4 px-6 bg-white text-black w-[300px] h-[64px] rounded-2xl"
        placeholder={placeholder}
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

export default InputText
