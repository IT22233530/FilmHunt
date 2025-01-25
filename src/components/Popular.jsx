import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PopularMoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=a07097b1790ca0b3b085d11b7bf8aca4"
        );
        const filteredMovies = response.data.results.filter(
          (movie) => movie.original_language === "en"
        );
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const nextMovie = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevMovie = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Enhanced Title */}
      <div className="absolute top-4 md:top-2 w-full px-4 z-10">
        <h1 className="
          text-3xl md:text-5xl lg:text-6xl p-4 
          font-extrabold text-center 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-400 to-pink-600
          tracking-tight
          animate-pulse
        ">
          Popular English Movies
        </h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="
            w-full max-w-6xl mx-auto 
            flex flex-col md:flex-row 
            items-center justify-between 
            p-4 md:p-6 
            mt-16 md:mt-8
          "
        >
          {/* Movie Poster */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="
              w-full md:w-2/5 lg:w-1/3 
              mb-6 md:mb-0 
              transform hover:scale-105 
              transition-transform duration-300
            "
          >
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
              alt={currentMovie.title}
              className="
                w-full 
                rounded-2xl 
                shadow-2xl 
                border-4 
                border-white/20
              "
            />
          </motion.div>

          {/* Movie Details */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="
              w-full md:w-1/2 lg:w-2/3 
              text-white 
              space-y-4 
              p-6 
              bg-black/40 
              backdrop-blur-sm 
              rounded-2xl 
              shadow-lg
            "
          >
            <h2 className="
              text-2xl md:text-3xl lg:text-4xl 
              font-bold 
              mb-3 
              text-gradient 
              bg-clip-text 
              text-transparent 
              bg-gradient-to-r 
              from-blue-400 
              to-purple-600
            ">
              {currentMovie.title}
            </h2>
            <p className="
              text-sm md:text-base 
              text-gray-300 
              line-clamp-3 
              leading-relaxed
            ">
              {currentMovie.overview}
            </p>
            <div className="
              flex flex-wrap 
              items-center 
              space-x-4 
              mt-3
            ">
              <div className="
                flex items-center 
                space-x-2 
                text-yellow-400
              ">
                <Star fill="currentColor" className="w-5 h-5" />
                <span className="
                  text-lg md:text-xl 
                  font-bold
                ">
                  {currentMovie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="
                text-sm md:text-base 
                text-gray-400
              ">
                Release: {currentMovie.release_date}
              </span>
            </div>
            <button
              onClick={() => handleMovieClick(currentMovie.id)}
              className="
                mt-4 
                px-6 py-2 
                bg-indigo-600 
                hover:bg-indigo-700 
                text-white 
                rounded-full 
                transition-colors 
                text-sm md:text-base 
                shadow-lg 
                hover:shadow-xl
              "
            >
              View Details
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevMovie}
        className="
          absolute 
          left-2 md:left-10 
          top-1/2 -translate-y-1/2 
          bg-black/50 
          hover:bg-black/70 
          p-2 
          rounded-full 
          z-10
        "
      >
        <ChevronLeft className="w-6 md:w-8 h-6 md:h-8 text-white" />
      </button>
      <button
        onClick={nextMovie}
        className="
          absolute 
          right-2 md:right-10 
          top-1/2 -translate-y-1/2 
          bg-black/50 
          hover:bg-black/70 
          p-2 
          rounded-full 
          z-10
        "
      >
        <ChevronRight className="w-6 md:w-8 h-6 md:h-8 text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="
        absolute 
        bottom-4 md:bottom-6 
        left-1/2 -translate-x-1/2 
        flex 
        space-x-2
      ">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 md:w-3 md:h-3 
              rounded-full 
              transition-all 
              duration-300 
              cursor-pointer
              ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }
            `}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularMoviesSlider;