import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../features/shopping/wishlistSlice";
import { addToCart } from "../../features/shopping/cartSlice";
import ShoppingHeader from "./ShoppingHeader";
import { MdDelete, MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const cartItems = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    const source = item.source || "fakestore";
    navigate(`/dashboard/e-shopping-cart/product/${source}/${item.id}`);
  };

  return (
    <div className="bg-[#f0f4fc] min-h-screen">
      <div className="fixed w-full z-50">
        <ShoppingHeader />
      </div>

      <div className="container mx-auto p-5 pt-24 md:ml-[20%] pr-[10%] md:mt-0 mt-20 ">
        {wishlistItems.length > 0 && (
          <h2 className="text-2xl font-bold bg-white p-7">
            My Wishlist ({wishlistItems.length})
          </h2>
        )}

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-10">
            <TfiShoppingCart size={140} />
            <p className="text-gray-500 text-center text-3xl">
              Your wishlist is empty!
            </p>
            <button
              className="bg-blue-700 text-white font-semibold rounded-md px-7 py-2"
              onClick={() => navigate("/dashboard/e-shopping-cart")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid gap-0.2">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 my-1 p-3 shadow-md rounded-md  cursor-pointer bg-white"
                onClick={() => handleNavigate(item)}
              >
                <img
                  src={
                    item.image ||
                    item.thumbnail ||
                    "https://via.placeholder.com/150"
                  }
                  alt={item.title}
                  className="w-24 h-24 sm:w-20 sm:h-20 object-contain"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold hover:text-blue-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">
                    Price: ${item.price}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-5">
                  {/* <button
                    className="text-gray-400 text-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(item));
                      dispatch(toggleWishlist(item));

                    }}
                  >
                    <MdOutlineShoppingCart />
                  </button> */}

                  {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                    <button
                      className="text-gray-600 font-medium border border-gray-300 px-3 py-1 rounded hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // dispatch(toggleWishlist(item));
                        navigate("/dashboard/e-shopping-cart/cart");
                      }}
                    >
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="text-gray-400 text-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart(item));
                        dispatch(toggleWishlist(item));
                      }}
                    >
                      <MdOutlineShoppingCart />
                    </button>
                  )}

                  <button
                    className="text-gray-400 text-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleWishlist(item));
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
