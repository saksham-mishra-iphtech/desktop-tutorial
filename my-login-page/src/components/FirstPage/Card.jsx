import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ id, index, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/dashboard/${formattedTitle}`);
  };

  const isEven = index % 2 === 0;

  return (
    <div    
      className={`h-full w-full p-10 rounded-xl shadow-lg transition-all duration-300 flex flex-col justify-center items-center
        ${
          isEven
            ? "text-white bg-blue-900  drop-shadow-[10px_10px_30px_rgba(0,0,0,0.01)] hover:border-4 hover:border-white"
            : "text-blue-900 bg-white  drop-shadow-[10px_10px_30px_rgba(0,0,0,0.01)] hover:border-4 hover:border-blue-900"
        }`} onClick={handleClick}
      style={{ minHeight: "200px" }}
    >
      <h3 className="text-3xl font-bold">{title}</h3>
    </div>
  );
};
