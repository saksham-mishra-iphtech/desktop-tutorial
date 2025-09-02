import React from "react";
import MovieHeader from "./MovieHeader";
import MoviePage from "./MoviePage";
import Sidebar from "../FirstPage/Sidebar";

const MovieSearch = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#f0f4fc]  text-black">
    <div className="md:w-[20%] fixed left-0 top-0 h-full bg-gray-200">
      <Sidebar />
    </div>
    <div className="md:w-[80%] md:ml-[20%] flex flex-col items-center overflow-x-hidden">
      <MovieHeader />
      <MoviePage />
    </div>
  </div>
);
};

export default MovieSearch;
