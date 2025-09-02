// import React from "react";
// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";

// const Header = ({ heading, Todo }) => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <div 
//       className={`fixed top-0 left-0 w-full bg-white z-1 m-0 p-0 flex flex-col sm:flex-row ${Todo ? "px-8" : "px-6 "} sm:px-3  md:px-5 lg:px-40 py-6`}
//       style={{ borderBottom: "none" }}
//     >
//       <div className="self-start">
//         <button className="flex text-center items-center font-semibold text-xl text-blue-900" onClick={handleBack}>
//           <div><IoIosArrowBack /></div>
//           <div>Back</div>
//         </button>
//       </div>
//       <div className="w-full text-center font-bold text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-2">
//         {heading}
//       </div>
//       <div className="hidden sm:block w-20 sm:w-24 md:w-32 lg:w-40"></div>
//     </div>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; 
import Sidebar from "./FirstPage/Sidebar";

const Header = ({ heading }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-[#f0f4fc] z-10 p-4 flex items-center justify-between ">
        <button 
          className="lg:hidden text-blue-900 text-2xl"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu />
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:pl-90 flex-1">
          {heading}
        </h1>
        <div className="w-10 sm:w-20 md:w-32"></div>
      </div>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Header;
