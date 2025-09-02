import React, { useState } from "react";

function CounterCard({ name, type }) {
  const [value, setValue] = useState("");

  const increment = () => {
    if (value !== "") {
      const numValue = parseFloat(value);
      const incrementValue = type === "decimal" ? 0.1 : 1;
      setValue((numValue + incrementValue).toFixed(type === "decimal" ? 1 : 0));
    }
  };

  const decrement = () => {
    if (value !== "") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        const decrementValue = type === "decimal" ? 0.1 : 1;
        setValue((numValue - decrementValue).toFixed(type === "decimal" ? 1 : 0));
      }
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (type === "decimal") {
      if (/^\d*\.?\d*$/.test(inputValue)) setValue(inputValue);
    } else {
      if (/^\d*$/.test(inputValue)) setValue(inputValue);
    }
  };

  const reset = () => {
    setValue("");
  };

  return (
    <div className="w-full sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] bg-white border border-black p-4 rounded-lg shadow-md">
      <div className="text-black text-xl sm:text-2xl font-extrabold m-3 mb-5 text-center">{name}</div>

      <div className="flex items-center justify-center space-x-2 sm:space-x-3 m-3 mb-5">
        <button
          className="bg-green-700 text-white text-xl sm:text-2xl font-bold h-12 sm:h-14 w-[20%] sm:w-[25%] md:w-[26%] rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={increment}
          disabled={value === ""}
        >
          +
        </button>
        <input
          className="bg-pink-200 text-black text-xl sm:text-2xl h-12 sm:h-14 w-[30%] text-center rounded-lg"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={type === "integer" ? "0" : "0.0"}
        />
        <button
          onClick={decrement}
          className="bg-green-700 text-white text-xl sm:text-2xl font-bold h-12 sm:h-14 w-[20%] sm:w-[25%] md:w-[26%] rounded-lg hover:bg-green-600 focus:outline-none"
          disabled={value === "" || isNaN(parseFloat(value)) || parseFloat(value) <= 0}
        >
          -
        </button>
      </div>

      <div className="grid place-items-center">
        <button
          onClick={reset}
          className="bg-green-700 text-white text-xl sm:text-2xl font-bold h-12 sm:h-14 w-[40%] sm:w-[30%] md:w-[25%] rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CounterCard;
