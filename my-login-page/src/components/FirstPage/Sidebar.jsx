import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {
  FaCalculator,
  FaTasks,
  FaFilm,
  FaShoppingCart,
} from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md"
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.login.currentUser);

  const navItems = [
    { icon: <MdDashboard />, text: "Dashboard", route: "/dashboard" },
    {
      icon: <FaCalculator />,
      text: "Counter App",
      route: "/dashboard/counter-app",
    },
    { icon: <FaTasks />, text: "Todo List", route: "/dashboard/todo-list" },
    {
      icon: <FaFilm />,
      text: "Movie Search",
      route: "/dashboard/movie-search",
    },
    {
      icon: <FaShoppingCart />,
      text: "E-Shopping Cart",
      route: "/dashboard/e-shopping-cart",
    },
    {
      icon: <MdOutlineMarkUnreadChatAlt />,
      text: "Blogging App",
      route: "/dashboard/blogging-app",
    },
    { icon: <FaUserCircle />, text: "Profile", route: "/dashboard/profile" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-md transform z-[1000] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:w-1/5 transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex flex-col items-center py-6 relative">
        <button
          className="lg:hidden absolute top-4 right-4 text-2xl text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose />
        </button>
        <div
          className="flex items-center justify-center gap-7 pb-2 pr-16 h-[50px] border-b-2 w-full cursor-pointer"
          onClick={() => navigate("/dashboard/profile")}
        >
          {currentUser?.profileImage ? (
            <img
              src={currentUser.profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-5xl text-gray-400" />
          )}

          <p className=" text-lg font-semibold text-gray-700">
            {currentUser?.username || "Guest"}
          </p>
        </div>

        <nav className="mt-4 w-full">
          {navItems.map((item, index) => {
            const isActive =
              item.route === "/dashboard"
                ? location.pathname === item.route
                : location.pathname.startsWith(item.route);

            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.route);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 py-3 px-5 w-full transition 
        ${isActive ? "bg-blue-900 text-white" : ""}`}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
