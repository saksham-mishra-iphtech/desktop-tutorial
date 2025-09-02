// import React from "react";
// import Header from "../Header";
// import TodoCard from "./TodoCard";

// const Demo2 = () => {
//   return (
//     <div className="bg-white pt-22 text-black min-h-screen w-full flex flex-col items-center overflow-x-hidden">
//       <Header heading="TODO List" />
//       <div className="w-full flex justify-center mt-5 px-4">
//         <div className="">
//           <TodoCard  Todo={true}/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Demo2;



import React from "react";
import Header from "../Header";
import TodoCard from "./TodoCard";
import Sidebar from "../FirstPage/Sidebar";

const Demo2 = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#f0f4fc] text-black">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="w-full md:w-[80%] md:ml-[20%] flex flex-col items-center overflow-x-hidden">
        <Header heading="TODO List" />

        <div className="w-full flex justify-center mt-5 px-4">
          <div className="">
            <TodoCard Todo={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo2;


