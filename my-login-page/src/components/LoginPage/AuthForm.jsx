// import React, { useState } from "react";
// import { InputField } from "./InputField";
// import { Button } from "./Button";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import PopupModal from "../PopUpModal";
// import { useDispatch, useSelector } from "react-redux";
// import { login2 } from "../../features/login/LoginSlice";

// export const AuthForm = ({ toggleform }) => {
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [errors, seterrors] = useState({});
//   const [showPassword, setshowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const dispatch = useDispatch();
//   const currentUser = useSelector((state)=>state.login.currentUser);

//   const navigate = useNavigate();

//   const showModal = (message) => {
//     setModalMessage(message);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     let newErrors = {};

//     if (!email.trim()) {
//       newErrors.email = "Required";
//     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//       newErrors.email = "Invalid Email";
//     }
//     if (!password.trim()) {
//       newErrors.password = "Required";
//     }
//     if(!termsAccepted){
//       newErrors.termsAccepted = "Required"
//     }

//     if (Object.keys(newErrors).length > 0) {
//       seterrors(newErrors);
//       return;
//     }

//     dispatch(login2({ email, password }));
//     if(currentUser){
//       navigate("/dashboard");
//     }
//     else{
//       showModal("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="bg-white px-6 w-full max-w-[90%] sm:max-w-md mx-auto">
//       <h2 className="text-center text-2xl font-bold text-black pb-9 mt-10">
//         Login to Your Account
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mt-4 mb-6 space-y-7 text-gray-700">

//           {/* Email Input */}
//           <div className="flex flex-col">
//             <InputField
//               label="E-mail Address"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(event) => setemail(event.target.value)}
//             />
//             <div className="min-h-[20px] text-sm text-red-500">
//               {errors.email && errors.email}
//             </div>
//           </div>

//           {/* Password Input */}
//           <div className="flex flex-col relative">
//             <InputField
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(event) => setpassword(event.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setshowPassword(!showPassword)}
//               className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-600"
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </button>
//             <div className="min-h-[20px] text-sm text-red-500">
//               {errors.password && errors.password}
//             </div>
//           </div>
//         </div>

//         {/* Terms & Conditions Checkbox */}
//         <div className="flex items-center mt-4">
//           <input
//             type="checkbox"
//             id="terms"
//             className="mr-2"
//             checked={termsAccepted}
//             onChange={(event) => setTermsAccepted(event.target.checked)}
//           />
//           <label htmlFor="terms" className="text-[8px] md:text-sm text-gray-600">
//             By Logging in, I agree with{" "}
//             <a href="#" className="text-blue-500">Terms & Conditions</a>
//           </label>
//         </div>
//         <div className="min-h-[20px] text-sm text-red-500">
//           {errors.termsAccepted}
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex md:gap-5 mb-25 ">
//           <Button text="Login" isPrimary type="submit" />
//           <Button text="Sign Up" onClick={toggleform} />
//         </div>
//       </form>

//       {/* Popup Modal */}
//       {isModalOpen && <PopupModal message={modalMessage} onClose={closeModal} />}
//     </div>
//   );
// };






import React, { useState } from "react";
import { Button } from "./Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PopupModal from "../PopUpModal";
import { useDispatch, useSelector } from "react-redux";
import { login2 } from "../../features/login/LoginSlice";

export const AuthForm = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);
  const navigate = useNavigate();

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid Email";
    }
    if (!password.trim()) {
      newErrors.password = "Required";
    }
    if (!termsAccepted) {
      newErrors.termsAccepted = "Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(login2({ email, password }));
    if (currentUser) {
      showModal("please wait navigating....");
    setTimeout(() => {
        navigate("/dashboard");
      }, 1500); 
    } 
    else {
      showModal("Invalid Credentials");
    }
  };

  return (
    <div className="bg-white md:max-w-xl max-w-full mx-auto md:mt-3 mt-15">
      <h2 className="text-center texl-xl md:text-2xl font-bold text-black md:p-10  md:pb-15  ">
        Login to Your Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 space-y-5 text-gray-700 max-h-[520px] md:px-25 md:w-full w-screen  px-5 overflow-y-auto py-9">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={(e) => e.target.parentNode.classList.add("focused")}
              onBlur={(e) =>
                !e.target.value &&
                e.target.parentNode.classList.remove("focused")
              }
              className="peer w-full p-3 border border-gray-600 rounded-lg outline-none focus:border-blue-500 placeholder-transparent"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-3 text-gray-400 transition-all transform scale-100 
                         peer-focus:scale-90 peer-focus:-top-6 peer-focus:left-1 peer-focus:text-gray-500 text-lg 
                         peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:-top-6 peer-[&:not(:placeholder-shown)]:left-1"
            >
              E-mail Address
            </label>

            <div className="min-h-[20px] text-sm text-red-500">
              {errors.email}
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={(e) => e.target.parentNode.classList.add("focused")}
              onBlur={(e) =>
                !e.target.value &&
                e.target.parentNode.classList.remove("focused")
              }
              className="peer w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 placeholder-transparent"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-3 text-gray-400 transition-all transform scale-100 
                         peer-focus:scale-90 peer-focus:-top-6 peer-focus:left-1 peer-focus:text-gray-500 text-lg 
                peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:-top-6 peer-[&:not(:placeholder-shown)]:left-1"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            <div className="min-h-[20px] text-sm text-red-500">
              {errors.password}
            </div>
          </div>
        

        {/* Terms & Conditions Checkbox */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            className="mr-2"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
          />
          <label
            htmlFor="terms"
            className="text-[10px] md:text-sm text-gray-600"
          >
            By Logging in, I agree with{" "}
            <a href="#" className="text-blue-500">
              Terms & Conditions
            </a>
          </label>
        </div>
        <div className="min-h-[20px] text-sm text-red-500">
          {errors.termsAccepted}
        </div>
      </div>

        {/* Buttons */}
        <div className="mt-6 flex md:gap-5 justify-between">
          <div></div>
          <div className="md:hidden">
            <Button text="Sign Up" onClick={toggleForm} />
          </div>
          <Button text="Login" isPrimary type="submit" />
        </div>
      </form>

      {/* Popup Modal */}
      {isModalOpen && (
        <PopupModal message={modalMessage} onClose={closeModal} />
      )}
    </div>
  );
};
