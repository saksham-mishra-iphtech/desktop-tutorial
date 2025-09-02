import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/shopping/cartSlice";
import ShoppingHeader from "./ShoppingHeader";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdOutlineShoppingCart } from "react-icons/md";
import { TfiShoppingCart } from "react-icons/tfi";
import {
  incrementQuantity,
  decrementQuantity,
  setCartItemsForOrder,
} from "../../features/shopping/cartSlice";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    const source = item.source || "fakestore";
    navigate(`/dashboard/e-shopping-cart/product/${source}/${item.id}`);
  };
  const handlePlaceOrder = () => {
    dispatch(setCartItemsForOrder(cartItems));
    navigate("/dashboard/e-shopping-cart/placeOrder")
    
  };

  return (
    <div className="bg-[#f0f4fc] min-h-screen">
      <div className="fixed z-50 w-full">
        <ShoppingHeader />
      </div>

      <div className="container mx-auto p-5 pt-24 md:ml-[20%] md:pr-[10%] md:mt-0 mt-22 ">
        {cartItems.length>0 &&
        <h2 className="text-2xl font-bold bg-white p-6 mx-4 ">
        Shopping Cart ({cartItems.length})
      </h2>
       }

        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-10">
            <TfiShoppingCart size={140} />
            <p className="text-gray-500 text-center text-3xl">
              Your basket is empty!
            </p>
            <button
              className="bg-blue-700 text-white font-semibold rounded-md px-7 py-2"
              onClick={() => navigate("/dashboard/e-shopping-cart")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 md:px-4 px-2 pt-2 min-h-screen">
            <div className=" w-full">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center  p-3 gap-3 cursor-pointer rounded-md shadow-lg bg-white my-2"
                  onClick={() => handleNavigate(item)}
                >
                  <div className="flex flex-col justify-between items-center">
                    <img
                      src={
                        item.image ||
                        item.thumbnail ||
                        "https://via.placeholder.com/150"
                      }
                      alt={item.title}
                      className="w-34 h-24 sm:w-20 sm:h-20 object-contain"
                    />
                    <div className="flex items-center justify-center sm:justify-start mt-2  border border-gray-300 rounded-full">
                      <button
                        className="px-2 py-1  text-sm font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(decrementQuantity(item.id));
                        }}
                      >
                        −
                      </button>
                      <span className="font-semibold text-green-700 px-5 py-0.5">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2 py-1 text-sm font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(incrementQuantity(item.id));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left pl-5 space-y-1">
                    <h3 className="text-lg font-semibold hover:text-blue-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">
                      {/* Price:{" "}
                      <span className="line-through text-gray-500 mr-2">
                        ${(item.price * 1.2).toFixed(2)}
                      </span>
                      <span className="text-green-600 font-bold">
                        ${item.price.toFixed(2)}
                      </span> */}
                      ${item.price}
                    </p>
                  </div>
                  <button
                    className="text-gray-600 text-[18px] pr-2 font-bold hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromCart(item.id));
                    }}
                  >
                    <MdDelete size={25} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                className="mt-4 bg-orange-500 text-white text-lg font-semibold px-13 py-3 rounded"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>

            <div className="flex items-center gap-2 w-full text-sm font-bold text-gray-400 text-left pr-5 mt-4">
              <span>
                <IoShieldCheckmarkSharp size={30} />
              </span>
              <p>
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
