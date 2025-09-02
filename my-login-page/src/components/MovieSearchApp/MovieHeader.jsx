import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../FirstPage/Sidebar";

const MovieHeader = ({ setCategory, setSearchQuery }) => {
  const [search, setSearch] = useState("");
  const [activeButton, setActiveButton] = useState("popular");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (search.trim().length > 0) {
      setSearchQuery(search);
    }
  }, [search, setSearchQuery]);

  const handleSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setActiveButton(category);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="fixed top-0 md:left-[20%] md:w-[80%] bg-[#f0f4fc]  z-50 p-4 sm:left-0 sm:w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-start items-center gap-5 mb-3 ">
          <button
            className="lg:hidden text-2xl text-gray-700 justify-self-start sm:mb-0"
            onClick={() => setIsSidebarOpen(true)}
          >
            <GiHamburgerMenu />
          </button>
          <h2 className="font-semibold text-2xl sm:text-3xl text-center">
            Movie Search App
          </h2>
          </div>

          <form
            className="relative w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg sm:ml-auto"
            onSubmit={handleSearch}
          >
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none"
              type="text"
              placeholder="Search Movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            {search && (
              <FiX
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
                onClick={handleSearch}
              />
            )}
          </form>
        </div>
        <div className="flex justify-center gap-3 mt-3 md:gap-10">
          {["popular", "trending", "all"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-2 border-b-2 transition-all ${
                activeButton === category
                  ? "text-blue-900 border-blue-900 font-semibold"
                  : "text-gray-600 border-transparent"
              }`}
            >
              {category.toUpperCase()} MOVIES
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieHeader;
