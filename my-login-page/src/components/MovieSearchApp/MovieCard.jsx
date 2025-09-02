import React from "react";
import { Button } from "../LoginPage/Button";
import { BsInfoCircle } from "react-icons/bs";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const getLanguageName = {
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  hi: "Hindi",
  ar: "Arabic",
  pt: "Portuguese",
  nl: "Dutch",
  sv: "Swedish",
  da: "Danish",
  fi: "Finnish",
  no: "Norwegian",
  pl: "Polish",
  tr: "Turkish",
  he: "Hebrew",
  th: "Thai",
  id: "Indonesian",
  ms: "Malay",
  vi: "Vietnamese",
};

const MovieCard = ({
  title,
  year,
  rating,
  poster,
  overview,
  language,
  production,
  genres,
  onInfoClick,
}) => {
  const starRating = Math.round(rating / 2);
  const fullLanguage = getLanguageName[language] || language || "Unknown";


  return (
    <div className="relative min-w-fit bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img src={poster} alt={title} className="p-2 w-full h-96 object-fit" />
      <div className="px-5 flex items-center justify-between">
        <div
          className="mt-2 font-bold text-lg text-gray-800 truncate w-full max-w-[200px] overflow-hidden whitespace-nowrap"
          title={title}
        >
          {title}
        </div>
        <span className="font-extrabold text-gray-500 cursor-pointer">
          <BsInfoCircle onClick={onInfoClick} size={20} />
        </span>
      </div>
      <div className="px-5 flex items-center justify-between mt-2 text-sm text-gray-600">
        <div>{year}</div>
        <div className="text-yellow-500 text-lg">
          {"★".repeat(starRating)}
          {"☆".repeat(5 - starRating)}
        </div>
      </div>
      <div className="px-5 mt-2 text-sm text-gray-700 ">
        <strong>Language:</strong> {getLanguageName[language] || language || "Unknown"}
      </div>
      <div className="flex justify-end px-5 mt-4 mb-3">
        <Button text="Watch" isPrimary />
      </div>
    </div>
  );
};

export default MovieCard;

