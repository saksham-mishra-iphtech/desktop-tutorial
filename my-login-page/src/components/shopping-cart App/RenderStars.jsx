import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RenderStars = ({ rating }) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {halfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

export default RenderStars;
