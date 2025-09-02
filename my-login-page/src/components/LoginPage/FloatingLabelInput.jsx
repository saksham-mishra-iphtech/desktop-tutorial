import React from "react";

const FloatingLabelInput = ({ label, name, type = "text", value, onChange, error }) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="w-full border-2 border-gray-500 p-3 rounded-md bg-transparent peer"
      />
      <label
        htmlFor={name}
        className={`absolute left-3 bg-white px-1 text-gray-500 transition-all 
          ${value ? "top-[-25px] text-gray-600" : "top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-[-25px] peer-focus:text-gray-600"}`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FloatingLabelInput;
