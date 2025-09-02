import React from 'react';

export const Button = ({ text, onClick, isPrimary, type = "button"}) => {
  return (
    <div>
      <button 
        type={type}
        onClick={onClick} 
        className={`
          w-24 font-bold p-2 m-2 rounded-full 
          ${isPrimary ? "bg-gradient-to-b from-blue-400 to-blue-900 text-white " 
                      : "bg-white border-2 border-gray-300 text-gray-400 hover:bg-gray-100"}           
        `}
      >
        {text}
      </button>
    </div>
  );
};
