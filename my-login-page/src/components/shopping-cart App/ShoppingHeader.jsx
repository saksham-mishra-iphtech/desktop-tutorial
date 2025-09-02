import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsPatchPlus } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../FirstPage/Sidebar";
import { useDispatch } from "react-redux";
import { IoBagOutline } from "react-icons/io5";
import { updateSearchQuery } from "../../features/shopping/searchSlice";

const ShoppingHeader = () => {
  const navigate = useNavigate();
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);
  const cartCount = useSelector((state) => state.cart.cart.length);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(updateSearchQuery(searchQuery));
  }, [searchQuery, dispatch]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="bg-[#f0f4fc] fixed top-0 left-0 md:left-[20%] md:w-[80%] w-full z-50 p-3 ">
        <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between w-full ">
          <div className="flex items-center gap-9">
            <button
              className="lg:hidden text-2xl text-gray-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <GiHamburgerMenu />
            </button>
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => navigate("/dashboard/e-shopping-cart")}
            >
              <h1 className="text-blue-700 font-bold text-2xl md:mb-0 mb-2">ShoppyGo</h1>
              <div className="md:flex items-center hidden  gap-1">
                <p className="text-gray-500 text-xs font-medium ">
                  Explore <span className="text-yellow-400">Plus</span>
                </p>
                <BsPatchPlus className="text-yellow-400 text-xs font-medium" />
              </div>
            </div>
          </div>

          <div
            className="flex items-center bg-white rounded-xl px-2 py-2  min-w-[300px] w-full md:w-[600px] md:mb-0 mb-4"
            onClick={() => navigate("/dashboard/e-shopping-cart")}
          >
            <IoIosSearch className="text-gray-500 text-xs" />
            <input
              type="text"
              placeholder="Search for Products brands and more...."
              className="p-1 w-full bg-white outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchQuery && (
              <IoMdClose
                className="cursor-pointer text-gray-500"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>

          <div className="flex items-center gap-4 md:gap-7  font-light md:text-xl text-lg cursor-pointer ">
            <div
              className="flex items-center gap-1 relative"
              onClick={() => navigate("/dashboard/e-shopping-cart/cart")}
            >
              <IoCartOutline />
              <p>Cart</p>
              {cartCount > 0 && (
                <span className="absolute -top-2 left-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            <div
              className="flex items-center gap-1 relative"
              onClick={() => navigate("/dashboard/e-shopping-cart/wishlist")}
            >
              <FaRegHeart />
              <p>Wishlist</p>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 left-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>

            <div
              className="flex items-center gap-1 relative"
              onClick={() => navigate("/dashboard/e-shopping-cart/my-orders")}
            >
              <IoBagOutline />
              <p>My Orders</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingHeader;
