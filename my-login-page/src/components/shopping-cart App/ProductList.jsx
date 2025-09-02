import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleWishlist as toggleWishlistAction } from "../../features/shopping/wishlistSlice";
import { addToCart } from "../../features/shopping/cartSlice";
import { useLocation } from "react-router-dom";
import RenderStars from "./RenderStars";
import { ArrowPathIcon } from "@heroicons/react/24/outline"

const ProductList = () => {
  const location = useLocation();
  const { source, productId } = useParams();
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [reviewCounts, setReviewCounts] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productIdNumber = Number(productId);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const handleWishlistClick = (product) => {
    dispatch(toggleWishlistAction(product));
  };

  const searchQuery = useSelector((state) => state.search.searchQuery);
  const searchResults = location.state?.searchResults || null;
  useEffect(() => {
    if (searchResults) {
      setProductsByCategory(
        searchResults.reduce((acc, product) => {
          const category = product.category?.toLowerCase() || "uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {})
      );
    }
  }, [searchResults]);

  const handleNavigate = useCallback(
    (source, id) => {
      navigate(`/dashboard/e-shopping-cart/product/${source}/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [fakeStoreResponse, dummyJsonResponse] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://dummyjson.com/products"),
        ]);

        const fakeStoreProducts = fakeStoreResponse.data.map((product) => ({
          ...product,
          source: "fakestore",
        }));

        const dummyJsonProducts = dummyJsonResponse.data.products.map(
          (product) => ({
            ...product,
            source: "dummyjson",
          })
        );

        const categorizedProducts = {};

        [...fakeStoreProducts, ...dummyJsonProducts].forEach((product) => {
          const category = product.category?.toLowerCase() || "uncategorized";
          if (!categorizedProducts[category]) {
            categorizedProducts[category] = [];
          }
          categorizedProducts[category].push(product);
        });

        setProductsByCategory(categorizedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = Object.keys(productsByCategory).reduce(
    (acc, category) => {
      const filteredItems = productsByCategory[category].filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredItems.length > 0) acc[category] = filteredItems;
      return acc;
    },
    {}
  );

  useEffect(() => {
    const counts = {};

    Object.values(productsByCategory).forEach((products) => {
      products.forEach((product) => {
        const key = `${product.id}-${product.source}`;
        if (!counts[key]) {
          counts[key] = Math.floor(Math.random() * 30) + 100;
        }
      });
    });

    setReviewCounts((prev) => ({ ...prev, ...counts }));
  }, [productsByCategory]);

  return (
    <div
      className="md:mx-1 mx-0 my-3 md:mt-0 mt-38 w-screen overflow-x-hidden
"
    >
      <h1 className="text-3xl font-bold text-start px-3 my-4 md:pt-0 pt-5">
        All Products
      </h1>

      {loading ? (
        <div className="flex ml-[40%] h-screen md:mt-0 mt-[50%]">
        <ArrowPathIcon className="h-20 w-20 animate-spin text-blue-600" />
      </div>
      ) : (
        Object.keys(filteredProducts).map((category) => (
          <div key={category} className="mb-1  p-5 ">
            <h2 className="text-2xl font-semibold text-gray-800 my-3 px-3 capitalize">
              {category}
            </h2>

            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredProducts[category].map((product) => {
                const isWishlisted = wishlist?.some(
                  (item) =>
                    item.id === product.id && item.source === product.source
                );

                return (
                  <div
                    key={`${product.id}-${product.source}`}
                    className="relative p-4 cursor-pointer shadow-md hover:shadow-xl transition-transform transform hover:scale-105 bg-white rounded-lg"
                    onClick={() => handleNavigate(product.source, product.id)}
                  >
                    <button
                      className="absolute top-2 right-2 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistClick(product);
                      }}
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-500 text-2xl transition duration-200" />
                      ) : (
                        <FaRegHeart className="text-gray-500 text-2xl transition duration-200" />
                      )}
                    </button>

                    <img
                      src={
                        product.image ||
                        product.thumbnail ||
                        "https://via.placeholder.com/150"
                      }
                      alt={product.title}
                      className="w-full h-48 object-contain mb-2 rounded"
                    />

                    <h2 className="text-lg font-semibold truncate">
                      {product.title}
                    </h2>

                    <p className="text-gray-600 font-bold mb-1">
                      ${product.price?.toFixed(2)}
                    </p>

                    <div className="mb-2 flex items-center gap-2">
                      <RenderStars
                        rating={
                          typeof product.rating === "object"
                            ? product.rating?.rate ?? 0
                            : product.rating ?? 0
                        }
                      />

                      <span className="text-sm text-gray-500">
                        ({reviewCounts[`${product.id}-${product.source}`] || 0})
                      </span>
                    </div>

                    <button
                      className="rounded-full px-7 py-2 text-black border border-black bg-white hover:bg-[#204F20] hover:border-none hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart(product));
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
