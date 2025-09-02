import React from "react";

const PopupModal = ({ message, onClose }) => {
  return (
    <div className=" flex fixed top-5 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg shadow-lg z-50">
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-white font-bold">
        ✖
      </button>
    </div>
  );
};

export default PopupModal;
