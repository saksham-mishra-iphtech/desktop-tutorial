import React from "react";


export const InputField = ({ label, name, type, value, onChange, onBlur, placeholder }) => {
  
  return (
    <div className="w-full">
      <label className="text-gray-800 text-l font-semibold ">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full mt-1 p-2 bordor border-b-2 border-blue-500 rounded-md focus:outline-non focus:ring-2 focus:ring-blue-400 placeholder-gray-500 placeholder:text-[14px]"
      />
    </div>
  );
};


