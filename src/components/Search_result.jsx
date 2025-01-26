import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Film, Tv, Filter } from "lucide-react";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const [moviesResponse ] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=a07097b1790ca0b3b085d11b7bf8aca4`
          ),
          
        ]);
        console.log(moviesResponse);

        const combinedResults = [
          ...moviesResponse.data.results.map(r => ({...r, type: 'movie'})),

        ];
        setResults(combinedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleItemClick = (item) => {
    navigate(`/${item.type}/${item.id}`);
  };

  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6">
      {/* Search Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="
          text-3xl md:text-4xl lg:text-4xl 
          font-bold mb-4 p-4
          bg-clip-text text-transparent 
          bg-gradient-to-r from-purple-400 to-pink-600
        ">
          Search Results for "{query}"
        </h1>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mt-4">
          {[
            { value: 'all', icon: Search, label: 'All' },
            { value: 'movie', icon: Film, label: 'Movies' },
            { value: 'tv', icon: Tv, label: 'TV Shows' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                flex items-center space-x-2 
                px-4 py-2 rounded-full 
                transition-all duration-300
                ${activeFilter === filter.value 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-white/10 hover:bg-white/20'}
              `}
            >
              <filter.icon className="w-5 h-5" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-white"></div>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="text-center text-xl">
          No results found. Try a different search.
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="
            grid grid-cols-2 sm:grid-cols-3 
            md:grid-cols-4 lg:grid-cols-5 
            gap-4 max-w-6xl mx-auto
          "
        >
          <AnimatePresence>
            {filteredResults.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="
                  bg-white/10 
                  rounded-xl 
                  overflow-hidden 
                  shadow-lg 
                  hover:scale-105 
                  transition-transform 
                  cursor-pointer
                "
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-3">
                  <h3 className="
                    text-sm font-semibold 
                    truncate 
                    text-white
                  ">
                    {item.title || item.name}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="
                      text-xs 
                      text-gray-400 
                      bg-white/10 
                      px-2 py-1 
                      rounded-full
                    ">
                      {item.type === 'movie' ? 'Movie' : 'TV Show'}
                    </span>
                    <span className="
                      text-xs 
                      text-yellow-400
                    ">
                      {(item.release_date || item.first_air_date || 'N/A').split('-')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default SearchResults;