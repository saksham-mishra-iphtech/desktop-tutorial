import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import BlogHeader from "./BlogHeader";
import { useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fallbackImage =
    "https://theessentialcreative.com/wp-content/uploads/2021/08/my-blogs-books1.png";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://dev.to/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ArrowPathIcon className="h-16 w-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!article) {
    return <div className="text-center mt-10">Article not found</div>;
  }

  return (
  <div className="flex flex-col min-h-screen bg-[#f0f4fc]">
      <BlogHeader />

      <div className="bg-[#f0f4fc] min-h-screen mx-auto p-6 ml-0 md:ml-[20%] mt-[5%] relative">
        <div className="sticky md:top-17 top-30 bg-[#f0f4fc] py-2 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline flex items-center"
        >
          <span className="mr-1">←</span> Back 
        </button>
      </div>
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-fit h-64 object-cover rounded-lg mb-6 text-center "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />

        <div className="mt-8 flex items-center justify-between">
         <div className="mt-8 flex items-center gap-3">
         <img
            src={article.user?.profile_image || fallbackImage}
            alt={article.user?.name}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
          <div>
            <p className="font-medium">
              {article.user?.name || article.user?.username}
            </p>
            <p className="text-sm text-gray-600">
              {article.readable_publish_date}
            </p>
          </div>
         </div>
          <div className="mt-8 text-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block  text-blue-500 font-medium py-2 px-4  transition-colors"
          >
            Read Full Article →
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
