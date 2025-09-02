import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieHeader from "./MovieHeader";

const MoviePage = () => {
  const MY_API_KEY = import.meta.env.VITE_MOVIE_APP_API_KEY;
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getApiUrl = () => {
    if (searchQuery) {
      return `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&query=${searchQuery}`;
    } else {
      const endpoints = {
        popular: "movie/popular",
        trending: "trending/movie/week",
        all: "movie/top_rated"
      };
      return `https://api.themoviedb.org/3/${endpoints[category]}?api_key=${MY_API_KEY}`;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(getApiUrl());
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [category, searchQuery]);
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MY_API_KEY}`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="relative md:pt-11 px-auto mx-auto mt-5 ">
      <MovieHeader setCategory={setCategory} setSearchQuery={setSearchQuery} />
      <div className="mt-40 pt-10 mx-3 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 lg:mt-11 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.release_date?.split("-")[0] || "N/A"}
              rating={movie.vote_average || "N/A"}
              poster={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              onInfoClick={() => fetchMovieDetails(movie.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No movies found</p>
        )}
      </div>
      {selectedMovie && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-80 md:w-130 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-extrabold">{selectedMovie.title}</h2>
            <button
              onClick={() => setSelectedMovie(null)}
              className="text-gray-600 hover:text-black"
            >
              ✖
            </button>
          </div>
          <hr />
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedMovie.genres.length > 0 ? (
              selectedMovie.genres.map((genre) => (
                <button
                  key={genre.id}
                  className="px-3 py-1 bg-gray-300 text-black rounded-full text-sm"
                >
                  {genre.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No genres available</p>
            )}
          </div>
          <div className="mt-4 max-h-60 overflow-auto text-wrap">
            <p className="text-gray-600">
              <strong>Overview:</strong> {selectedMovie.overview || "Not Available"}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Language:</strong> {selectedMovie.original_language.toUpperCase()}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Production Companies:</strong>{" "}
              {selectedMovie.production_companies
                .map((company) => company.name)
                .join(", ") || "Not Available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
