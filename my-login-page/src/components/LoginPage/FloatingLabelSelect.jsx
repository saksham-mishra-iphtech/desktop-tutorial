
import React from "react";

const FloatingLabelSelect = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-2 border-gray-500 p-3 rounded-md bg-white peer"
      >
        <option value="" hidden></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-3 bg-white px-1 text-gray-500 transition-all 
          ${value ? "top-[-25px] text-gray-600" : "top-3 peer-focus:top-[-25px] peer-focus:text-gray-600"}`}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FloatingLabelSelect;

