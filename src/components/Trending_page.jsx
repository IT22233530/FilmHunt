import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Star, Loader2, Clock, Calendar } from "lucide-react";

const TrendingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTrendingMovies = useCallback(async (window) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${window}?api_key=a07097b1790ca0b3b085d11b7bf8aca4`
      );

      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to load trending movies. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingMovies(timeWindow);
  }, [timeWindow, fetchTrendingMovies]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
          Trending Movies
        </h1>

        {/* Time Window Toggle */}
        <div className="flex justify-center mb-8 space-x-4">
          {[
            { 
              window: "day", 
              label: "Daily Trending", 
              icon: Clock 
            },
            { 
              window: "week", 
              label: "Weekly Trending", 
              icon: Calendar 
            }
          ].map(({ window, label, icon: Icon }) => (
            <button
              key={window}
              className={`flex items-center px-6 py-2 rounded-full transition-all 
                ${timeWindow === window 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "bg-white/10 hover:bg-white/20 text-gray-300"}`}
              onClick={() => setTimeWindow(window)}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white/10 rounded-xl overflow-hidden shadow-2xl 
                         hover:scale-105 hover:shadow-3xl transition-all duration-300 
                         cursor-pointer group"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/path/to/placeholder-image.jpg"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover group-hover:brightness-75 transition-all"
                />
                <div className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-1 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-center truncate">
                  {movie.title}
                </h2>
                <p className="text-center text-sm text-gray-400 mt-1">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <Loader2 className="animate-spin text-white w-8 h-8" />
            <span className="ml-2">Loading trending movies...</span>
          </div>
        )}
        {error && (
          <div className="text-lg text-red-400 text-center mt-8">{error}</div>
        )}
      </div>
    </div>
  );
};

export default TrendingMoviesPage;