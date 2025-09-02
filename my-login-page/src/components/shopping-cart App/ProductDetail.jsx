import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaRegHeart, FaHeart, FaShareAlt } from "react-icons/fa";
import ShoppingHeader from "./ShoppingHeader";
import { toggleWishlist } from "../../features/shopping/wishlistSlice";
import { addToCart } from "../../features/shopping/cartSlice";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import RenderStars from "./RenderStars";
import {
  incrementQuantity,
  decrementQuantity,
  setBuyNowItem
} from "../../features/shopping/cartSlice";
import ProductImageZoom from "./ProductImageZoom";

const ProductDetail = () => {
  const { source, productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [codAvailable, setCodAvailable] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart?.cart || []);
  const productIdNumber = parseInt(productId);
  const cartItem = cart.find((item) => item.id === productIdNumber);

  const [starnum] = useState(() => {
    return Math.floor(Math.random() * 30) + 100;
  });

  // const [randomPrice] = useState(() => {
  //   return (Math.random() * (999 - 900) + 100).toFixed(2);
  // });
  // const [discountPercentage] = useState(() => {
  //   return Math.floor(Math.random() * 21) + 10;
  // });

  const [itemsLeft] = useState(() => {
    return Math.floor(Math.random() * 21) + 10;
  });

  const availableOffers = [
    {
      type: "Bank Offer",
      details:
        "10% Instant Discount on HDFC Bank Credit Cards, up to $1500. On orders of $5000 and above",
    },
    {
      type: "No Cost EMI",
      details:
        "No Cost EMI on Bajaj Finserv EMI Card on cart value above $2999",
    },
    {
      type: "Bank Offer",
      details: "Flat $100 Cashback on Paytm Wallet and Postpaid transaction",
    },
    {
      type: "Special Price",
      details: "Get extra $500 off (price inclusive of discount)",
    },
    {
      type: "Cashback",
      details: "Get $200 cashback on transactions via PhonePe",
    },
    {
      type: "Exchange Offer",
      details: "Exchange your old mobile and get up to $3000 off",
    },
  ];
  const offersToShow = showAllOffers
    ? availableOffers
    : availableOffers.slice(0, 0);

  const wishlist = useSelector((state) => state.wishlist?.wishlist || []);
  // const isWishlisted = wishlist.some((item) => item.id === productIdNumber);
  const handleNavigate = () => {
    navigate(`/dashboard/e-shopping-cart`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!source || !productId)
          throw new Error("Invalid product source or ID.");

        let url = "";
        if (source === "fakestore") {
          url = `https://fakestoreapi.com/products/${productId}`;
        } else if (source === "dummyjson") {
          url = `https://dummyjson.com/products/${productId}`;
        }

        if (!url) throw new Error("Invalid product source.");

        const response = await axios.get(url);
        const productData = response.data;
        if (!productData) throw new Error("No product data found.");

        setProduct(productData);

        if (productData.category) {
          let categoryUrl = "";
          if (source === "fakestore") {
            categoryUrl = `https://fakestoreapi.com/products/category/${encodeURIComponent(
              productData.category
            )}`;
          } else if (source === "dummyjson") {
            categoryUrl = `https://dummyjson.com/products/category/${encodeURIComponent(
              productData.category
            )}`;
          }

          const similarRes = await axios.get(categoryUrl);
          const similarList =
            source === "dummyjson" ? similarRes.data.products : similarRes.data;
          const filteredList = similarList.filter(
            (p) => p.id !== productData.id
          );
          setSimilarProducts(filteredList);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [source, productId]);

  if (loading)
    return (
      <p className=" flex justify-center items-center h-screen text-center text-lg">
        {" "}
        <ArrowPathIcon className="h-20 w-20 animate-spin text-blue-600" />{" "}
        Loading product details...
      </p>
    );
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center text-lg">No products found.</p>;

  // const handleWishlistClick = () => {
  //   dispatch(toggleWishlist({ ...product, source }));
  // };
  const handleBuyNow = () => {
    const quantity = cartItem?.quantity || 1; 
    dispatch(setBuyNowItem({ ...product, quantity }));
    navigate("/dashboard/e-shopping-cart/placeOrder");
  };
  

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, source }));
  };
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };
  const goToPreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const checkDelivery = () => {
    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      setDeliveryChecked(false);
      return;
    }

    setPincodeError("");

    const daysToDeliver = Math.floor(Math.random() * 5) + 2;
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + daysToDeliver);
    const formattedDate = estimatedDate.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    setDeliveryDate(formattedDate);
    setDeliveryCharge(Math.random() < 0.5 ? "Free" : "$40");
    setCodAvailable(Math.random() < 0.8);
    setDeliveryChecked(true);
  };

  return (
    <div className="h-full bg-[#f0f4fc]">
      <ShoppingHeader />

      <div className="flex flex-col md:flex-row md:ml-[20%] bg-[#f0f4fc] md:mt-18 mt-38 md:h-full overflow-visible">
        <div className="md:w-[40%] flex flex-col items-center p-3 overflow-visible bg-[#f0f4fc]">
          <div className="relative md:p-10 p-2 w-full">
            {/* <span
              className="absolute top-4 right-3 bg-white border p-3 border-gray-300 rounded-full cursor-pointer shadow-md"
              onClick={handleWishlistClick}
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-2xl" />
              )}
            </span> */}

            {/* <img
              src={
                product.image ||
                product.thumbnail ||
                "https://via.placeholder.com/300"
              }
              alt={product.title}
              className="w-full h-100 md:w-90 md:h-96 object-cover rounded-md shadow-md bg-white p-10 mb-4"
            /> */}

            {/* <div className="relative">
              <img
                src={
                  product.images?.[selectedImageIndex] ||
                  product.image ||
                  product.thumbnail ||
                  "https://via.placeholder.com/300"
                }
                alt={`Product ${selectedImageIndex}`}
                className="w-full h-100 md:w-99 md:h-96 object-contain rounded-md shadow-md bg-white p-10 mb-4"
              />

              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
                  >
                    <FaChevronLeft className="text-lg" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
                  >
                    <FaChevronRight className="text-lg" />
                  </button>
                </>
              )}
            </div> */}

            <ProductImageZoom  className="w-full md:w-[80%] h-auto object-contain" product={product} selectedImageIndex={selectedImageIndex} goToNextImage={goToNextImage} goToPreviousImage={goToPreviousImage}/>
          </div>

          {/* {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(1, 5).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className="w-26 h-36 object-cover rounded-md bg-white shadow-md"
                />
              ))}
            </div>
          )} */}

          <div className="flex gap-2 overflow-x-auto ">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-30 h-30 object-cover rounded-md bg-white shadow-md cursor-pointer border-2 ${
                  idx === selectedImageIndex
                    ? "border-gray-300"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(idx)}
              />
            ))}
          </div>
        </div>

        <div className="md:flex-1 overflow-y-auto p-6 pb-6  ">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-800 mb-4">{product.description}</p>
          <div className="mb-2 flex items-center gap-2 ">
            <RenderStars
              rating={
                typeof product.rating === "object"
                  ? product.rating?.rate ?? 0
                  : product.rating ?? 0
              }
            />

            <span className="text-sm text-gray-500">({starnum})</span>
          </div>
          <div className="border-b my-1 border-gray-300"></div>
          <p className="text-green-700 font-bold mb-1">special price</p>
          {/* <div className="mb-4 space-y-1 flex items-center gap-3 ">
            <p className="text-2xl text-gray-800 font-bold ">
              ${randomPrice}
            </p>
            <p className="text-xl text-gray-400 line-through">
              ${product.price?.toFixed(2)}
            </p>

            <p className="text-green-700 font-semibold">
              {product.discountPercentage
                ? `-${product.discountPercentage}%`
                : `-${discountPercentage}%`}
            </p>
          </div> */}
          <p className="text-xl font-bold">${product.price}</p>
          <div className="border-b  border-gray-200"></div>

          <div className="flex items-center justify-center gap-5 w-fit">
            <div className="flex-grow items-center gap-4 mt-4 bg-gray-200 w-fit px-4 rounded-full ">
              <button
                onClick={() => dispatch(decrementQuantity(product.id))}
                className="px-4 py-2"
              >
                -
              </button>
              <span className="text-lg font-semibold text-green-700">
                {cartItem?.quantity || 0}
              </span>
              <button onClick={handleAddToCart} className="px-4 py-2 ">
                +
              </button>
            </div>
            <div className="flex flex-col mt-3 font-semibold text-gray-700 text-xs">
              <p>
                Only{" "}
                <span className="text-yellow-400 font-bold">
                  {itemsLeft} items
                </span>{" "}
                left
              </p>
              <p>Don't miss it</p>
            </div>
          </div>

          <div className="flex gap-4 md:w-[70%] mt-4 mb-3">
            <button
              className="text-white rounded-full bg-[#235A38] hover:bg-green-900 px-3 py-2 w-full transition"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
            {/* <button
              className="text-green-800 bg-white border-2 border-green-800 rounded-full px-3 py-2 w-full hover:bg-gray-100 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button> */}
  {cartItem && cartItem.quantity > 0 ? (
    <button
    className="text-green-800 bg-white border-2 border-green-800 rounded-full px-3 py-2 w-full hover:bg-gray-100 transition"
    onClick={()=>navigate("/dashboard/e-shopping-cart/cart")}
    >
      Go to Cart
    </button>
  ) : (
    <button
    className="text-green-800 bg-white border-2 border-green-800 rounded-full px-3 py-2 w-full hover:bg-gray-100 transition"
    onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  )}

          </div>
          <div className="border-b my-2 mt-4  border-gray-200"></div>

          <div className="flex flex-col gap-1 text-gray-700 border border-gray-200 my-2 w-fit pr-5 py-2 ">
            <div className="w-full  px-4">
              <h3 className="md:text-lg text-sm font-semibold mb-2 flex items-center gap-1">
                <span className="text-yellow-500">
                  <TbTruckDelivery size={20} />
                </span>
                Check for Delivery Options
              </h3>

              <div className="flex w-full gap-3 mb-3">
                <input
                  type="text"
                  value={pincode}
                  onFocus={() => setShowCheckButton(true)}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter your postal code for delivery avilability"
                  className="underline focus:outline-none px-1 py-2 md:w-[330px] max-w-[500px]"
                />
                {showCheckButton && (
                  <button
                    onClick={checkDelivery}
                    className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    Check
                  </button>
                )}
              </div>
              {deliveryChecked && (
                <div className="text-sm text-gray-700">
                  <p>
                    Estimated Delivery:{" "}
                    <span className="font-medium">{deliveryDate}</span>
                  </p>
                  <p>
                    Delivery Charge:{" "}
                    <span className="font-medium">{deliveryCharge}</span>
                  </p>
                  <p>
                    COD Available:{" "}
                    <span className="font-medium">
                      {codAvailable ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              )}
              {pincodeError && (
                <p className="text-red-500 text-sm mt-1">{pincodeError}</p>
              )}
              <div className="border-b  border-gray-200"></div>
            </div>

            <div>
              <div className="flex flex-col justify-center px-4">
                <div className="text-lg font-semibold mb-2 flex items-center gap-1">
                  <span className="text-yellow-500">
                    {" "}
                    <MdOutlineAssignmentReturn size={20} />
                  </span>
                  <p>Return Delivery</p>
                </div>
                <h3 className="text-xs mb-2 flex items-center gap-1">
                  Free 30days Delivery Returns.{" "}
                  <span className="text-blue-400 underline">Details</span>
                </h3>
              </div>
            </div>
          </div>

          <div className=" rounded mb-2 ">
            {/* <div className="flex items-center justify-between cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Offers
              </h2>
            </div> */}

            <ul className="mt- space-y-3">
              {offersToShow.map((offer, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 font-semibold mr-2">•</span>
                  <div>
                    <span className="font-medium">{offer.type}:</span>{" "}
                    <span className="text-gray-700">
                      {offer.details}{" "}
                      <span className="text-blue-600 text-sm font-semibold">
                        T&C
                      </span>{" "}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {!showAllOffers && (
              <button
                className="text-blue-600 text-lg font-light mt-1"
                onClick={() => setShowAllOffers(true)}
              >
                View Available offers
              </button>
            )}

            {showAllOffers && (
              <button
                className="text-blue-600 text-sm mt-3 mb-2"
                onClick={() => setShowAllOffers(false)}
              >
                Hide
              </button>
            )}
          </div>

          {/* <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Free Shipping
            </span>
            <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
              {product.returnPolicy
                ? product.returnPolicy
                : "7 days return policy"}
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
              Secure Payment
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaShareAlt className="text-gray-500" />
            <span className="text-gray-600 text-sm">Share this product</span>
          </div> */}
        </div>
      </div>

      <div className=" flex flex-col md:flex-row md:ml-[20%] ml-0 justify-center items-center px-2 gap- ">
        <div className="mt- border border-gray-300 md:w-[40%] w-full bg-white  p-4 ">
          <h2 className="text-2xl font-semibold mb-4">
            Product Specifications
          </h2>
          <table className="w-full text-left text-gray-700">
            <tbody>
              <tr>
                <td className="py-2 font-medium">Category</td>
                <td>{product.category || "N/A"}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Brand</td>
                <td>{product.brand || "N/A"}</td>
              </tr>

              <tr>
                <td className="py-2 font-medium">Stock</td>
                <td>
                  {product.stock !== undefined ? product.stock : "Out of stock"}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Rating</td>
                <td>
                  {product.rating && product.rating.rate
                    ? product.rating.rate
                    : "4.5"}
                </td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Warranty</td>
                <td>{product.warrantyInformation || "1-year Warranty"}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Weight</td>
                <td>{product.weight || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="   bg-white border-gray-300 m-2  md:w-[60%] w-full border">
          <h2 className="text-2xl p-3 font-semibold ">Customer Reviews</h2>

          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="bg-white p-2  mb-1">
                <p className="font-bold">
                  {review.reviewerName || "Anonymous"}
                </p>

                <p className="text-yellow-500 flex items-center gap-1">
                  <RenderStars
                    rating={
                      typeof product.rating === "object"
                        ? product.rating?.rate ?? 0
                        : product.rating ?? 0
                    }
                  />
                </p>

                <p className="text-gray-700 mt-1">
                  {review.comment || "No comment provided."}
                </p>
                {review.email && (
                  <p className="text-sm text-gray-500 mt-1 italic">
                    ({review.email})
                  </p>
                )}
              </div>
            ))
          ) : (
            <>
              <div className=" p-2 border-b border-gray-300 mb-1">
                <p className="font-bold">Jane D.</p>
                <p className="text-yellow-500 flex items-center gap-1">
                  <RenderStars
                    rating={
                      typeof product.rating === "object"
                        ? product.rating?.rate ?? 0
                        : product.rating ?? 0
                    }
                  />
                </p>
                <p className="text-gray-700 mt-1">
                  Loved it! Excellent quality and fast delivery.
                </p>
              </div>
              <div className="text-gray-700 border-b border-gray-300 p-2  mb-1">
                <p className="font-bold">Alex P.</p>
                <p className="text-yellow-500 flex items-center gap-1">
                  <RenderStars
                    rating={
                      typeof product.rating === "object"
                        ? product.rating?.rate ?? 0
                        : product.rating ?? 0
                    }
                  />
                </p>
                <p className=" text-gray-700 mt-1">
                  Pretty good, matches the description perfectly.
                </p>
              </div>
              <div className="p-2 mb-1">
                <p className="font-bold">Maria L.</p>
                <p className="text-yellow-500 flex items-center gap-1">
                  <RenderStars
                    rating={
                      typeof product.rating === "object"
                        ? product.rating?.rate ?? 0
                        : product.rating ?? 0
                    }
                  />
                </p>
                <p className="text-gray-700 mt-1">
                  Great value for the price. Would buy again.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="px-6 bg-[#f0f4fc] md:ml-[20%]">
          <h2 className="text-2xl font-semibold mb-4">
            {" "}
            Similar Items You Might Like
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md p-4 rounded-lg"
                onClick={handleNavigate}
              >
                <img
                  src={item.image || item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-green-700 font-bold">
                  ${item.price?.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
