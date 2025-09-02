import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../FirstPage/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchQuery, setSearchQuery } from "../../features/blogging/BookmarkSlice";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const BlogHeader = ({ showBookmarked, setShowBookmarked }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(setSearchQuery(value));
  };

  const clearSearch = () => {
    setSearch("");
    dispatch(clearSearchQuery());
  };

  const toggleBookmarkedView = () => {
    setShowBookmarked(!showBookmarked);
    if (search) {
      setSearch("");
      dispatch(clearSearchQuery());
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-[#f0f4fc] z-10 p-4 flex flex-col sm:flex-row items-stretch gap-3 lg:pl-[20%]">
        <div className="hidden lg:flex items-center absolute left-2 ml-[20%] pl-4">
          <div 
            className="flex flex-col cursor-pointer"
            onClick={() => navigate('/dashboard/blogging-app')}
          >
            <h1 className="text-xl font-bold text-blue-900">ByteBlogs</h1>
            <h3 className="text-sm text-gray-600">Tiny bytes, big ideas</h3>
          </div>
        </div>

        {/* Mobile top row */}
        <div className="flex justify-between items-center w-full sm:hidden">
          <button
            className="text-blue-900 text-2xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FiMenu />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-blue-900">ByteBlogs</h1>
            <h3 className="text-sm text-gray-600">Tiny bytes, big ideas</h3>
          </div>
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleBookmarkedView}
          >
            {showBookmarked ? (
              <BsBookmarkHeartFill size={20} className="text-yellow-500" />
            ) : (
              <BsBookmarkHeart size={20} />
            )}
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full md:pl-25 sm:w-auto sm:flex-1 sm:max-w-2xl sm:mx-auto">
          <div className="flex border border-gray-400 rounded-2xl px-3 bg-white">
            <input
              type="text"
              className="w-full py-2 px-2 focus:outline-none"
              placeholder={showBookmarked ? "Search bookmarks..." : "Search blogs..."}
              value={search}
              onChange={handleSearch}
            />
            {search && (
              <button onClick={clearSearch} className="text-gray-500">
                <RxCross2 />
              </button>
            )}
          </div>
        </div>

        {/* My Blogs */}
        <div className="hidden sm:flex items-center gap-2 cursor-pointer min-w-fit px-2"
          onClick={toggleBookmarkedView}
        >
          {showBookmarked ? (
            <BsBookmarkHeartFill size={20} className="text-yellow-500" />
          ) : (
            <BsBookmarkHeart size={20} />
          )}
          <h3>My Bookmarks </h3>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default BlogHeader;