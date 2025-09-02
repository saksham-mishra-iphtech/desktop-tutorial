import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../FirstPage/Sidebar";
import { ArrowPathIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../../features/blogging/BookmarkSlice";
import { useNavigate } from "react-router-dom";
import BlogHeader from "./BlogHeader";

const BlogList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const searchData = useSelector((state) => state.bookmark.query);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmark.bookmarks);

  const apiUrl = "https://dev.to/api/articles";
  const fallbackImage =
    "https://theessentialcreative.com/wp-content/uploads/2021/08/my-blogs-books1.png";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(apiUrl);
        setArticles(response.data || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const isBookmarked = (id) => bookmarks.some((bookmark) => bookmark.id === id);

  // const filteredArticles = articles.filter((article) => {
  //   const matchesSearch = article.title
  //     ?.toLowerCase()
  //     .includes((searchData || "").toLowerCase());
  //   return showBookmarked
  //     ? isBookmarked(article.id) && matchesSearch
  //     : matchesSearch;
  // });

  
  const filteredArticles = articles.filter((article) => {
    const hasImage = !!article.cover_image;
    const matchesSearch = article.title
      ?.toLowerCase()
      .includes((searchData || "").toLowerCase());
    return hasImage && (showBookmarked ? isBookmarked(article.id) && matchesSearch : matchesSearch);
  });
  

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4fc]">
      <BlogHeader
        showBookmarked={showBookmarked}
        setShowBookmarked={setShowBookmarked}
      />

      <div className="flex flex-1 pt-16">
        <Sidebar />

        <div className="flex-1 p-6 ml-0 md:ml-[20%] md:mt-3 mt-13">
          {isLoading ? (
            <div className="flex justify-center items-center h-full ">
              <ArrowPathIcon className="h-16 w-16 animate-spin text-blue-600" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <p className="text-center text-gray-500 text-lg mt-10">
              {showBookmarked ? "No bookmarked blogs found" : "No blogs found"}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col h-full"
                >
                  <img
                    src={item.cover_image || fallbackImage}
                    alt={item.title || "Blog cover"}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />

                  <h3 className="text-xl font-bold mb-2 text-blue-700 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {item.description || "No description available."}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.user?.profile_image || fallbackImage}
                        alt={item.user?.name}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallbackImage;
                        }}
                      />
                      <div>
                        <p className="text-sm text-gray-600">
                          {item.user?.name || item.user?.username || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.readable_publish_date}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(toggleBookmark(item))}
                      title={
                        isBookmarked(item.id)
                          ? "Remove bookmark"
                          : "Add bookmark"
                      }
                    >
                      <BookmarkIcon
                        className={`h-6 w-6 ${
                          isBookmarked(item.id)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/blogging-app/article/${item.id}`)
                    }
                    className="mt-4 text-blue-500 hover:underline transition-colors "
                  >
                    Read more →
                  </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-blue-500 hover:underline  transition-colors"
                    >
                      Read Full Article →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
