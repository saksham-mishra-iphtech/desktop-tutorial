import React from "react";
import ShoppingHeader from "./ShoppingHeader";
import ProductList from "./ProductList";
import Sidebar from "../FirstPage/Sidebar";
import head from "../../assets/images/head.png";

const ShoppingHome = () => {
  return (
    <div className="bg-[#f0f4fc] ">
      <div className="md:w-[20%] fixed left-0 top-0 h-screen bg-white  z-50">
        <Sidebar />
      </div>
      <div className="w-[80%] md:ml-[20%]">
        <div className="fixed w-[80%] z-50 bg-gray-100">
          <ShoppingHeader />
        </div>

        <div className="mt-16 w-full overflow-visible">
         
          <div className="hidden md:block w-full h-[400px] p-3 mt-18 ">
            <img
              src={head}
              alt="Shopping Banner"
              className="w-full h-full object-fit"
            />
          </div>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ShoppingHome;
