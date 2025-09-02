// import React, { useState } from "react";
// import { Logo } from "./Logo";
// import { AuthForm } from "./AuthForm";
// import SignUpForm from "./SignUpForm";


// export const Authpage = () => {
//   const [isLogin,setisLogin] = useState(true);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 md:p-4 ">
//       <div className="flex flex-col md:flex-row bg-white w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl shadow-gray-900/90 ">
//         {/* Left Section */}
//         <div className="md:w-1/2 bg-gradient-to-b from-blue-900 to-blue-400 flex flex-col items-center justify-around md:pb-20 p-8 text-white">
//           <div className="hidden md:block font-bold text-2xl md:text-3xl mb-4">
//             Welcome to
//           </div>
//           <Logo />
//           <p className="hidden md:block text-center mt-4 md:text-base">
//             We specialize in creating excellent web and mobile applications that
//             drive growth and innovation. From ideation to execution, our expert
//             team delivers reflexive, high-performance solutions designed to meet
//             your unique business necessities.
//           </p>
//         </div>

//         {/* Right Section (Form) */}
//         <div className="md:w-1/2 p-5 md:pl-5 flex flex-col justify-center">
//         {isLogin ? (<AuthForm toggleform ={()=>setisLogin(false)}/>) : (<SignUpForm toggleform={() => setisLogin(true)} onSignupSuccess={() => setisLogin(true)} />
// ) } 
//         </div>
//       </div>
//     </div>
//   );
// };




import React, { useState } from "react";
import { AuthForm } from "./AuthForm";
import SignUpForm from "./SignUpForm";
import { Logo } from "./Logo";

export const Authpage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#363fb6] via-[#2472d3] to-[#4bc0f8] md:p-7 relative overflow-y-hidden">
      
      <div className="hidden md:flex flex-col justify-center items-center text-white w-[25%] pt-20 pb-11 ">
        <div className="text-4xl">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold mt-2">Welcome</h2>
        <p className="w-4/5 text-sm text-center mt-2">
          "Welcome to AppHub – Explore, Experiment, and Innovate!"
        </p>
        <div className="flex flex-col justify-end gap-45">
          <div></div>
          <button
            className="mt-19 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200"
            onClick={toggleForm} 
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className=" absolute md:relative md:w-[74%] md:h-[600px] h-full  md:top-0 top-10  bg-white md:rounded-l-[130px] md:rounded-t-[0] rounded-t-[150px] shadow-lg p-6">
        {isLogin ? (
          <AuthForm toggleForm={toggleForm} /> 
        ) : (
          <SignUpForm toggleForm={toggleForm} onSignupSuccess={toggleForm} /> 
        )}
      </div>
    </div>
  );
};


