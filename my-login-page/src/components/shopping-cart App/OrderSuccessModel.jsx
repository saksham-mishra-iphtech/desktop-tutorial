import React from "react";

const OrderSuccessModel = ({ onClose, payerName, transactionId }) => {
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-gradient-to-br from-[#e0f0ff] to-[#eaffea] rounded-3xl shadow-xl p-18 w-[360px] sm:w-[400px] text-center relative animate-fade-in">
        <div className="mx-auto mb-16 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={4}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="absolute inset-0">
            <div className="w-1 h-1 bg-red-400 rounded-full absolute top-1 left-4" />
            <div className="w-1 h-1 bg-yellow-500 rounded-full absolute bottom-2 right-6" />
            <div className="w-1 h-1 bg-purple-400 rounded-full absolute top-3 right-3" />
            <div className="w-1 h-1 bg-blue-400 rounded-full absolute bottom-4 left-5" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">
          Your order has been
          <br />
          accepted
        </h2>
        {payerName && transactionId && (
          <div>
            <p>
              Transaction completed by <strong>{payerName}</strong>.
            </p>
            <p className="text-sm text-gray-600 mb-6 font-medium">
              Transaction ID: {transactionId}
            </p>
          </div>
        )}
        {!transactionId && (
          <p className="text-sm text-gray-600 mb-6">
            Transaction ID: <span className="font-medium">8984294820</span>
          </p>
        )}

        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModel;
