import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bg_img from '../assets/Home_image.jpg';

const HomePoster = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
    }
  };

  return (
    <div
      className="relative min-h-[500px] md:h-[600px] w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg_img})`,
        backgroundBlendMode: 'overlay',
      }}
      aria-label="Movie and TV Show Search Background"
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 text-center">
        <h1
          className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          aria-describedby="subtitle"
        >
          Discover Your Next Favorite Film
        </h1>
        <p
          id="subtitle"
          className="text-base md:text-lg text-white mb-8 max-w-2xl mx-auto"
        >
          Search, explore, and dive into the world of movies.
        </p>
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl mx-auto"
          role="search"
        >
          <div className="relative shadow-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search movies, shows, actors..."
              aria-label="Search input"
              className="w-full pl-12 pr-16 py-4 rounded-full text-black bg-white/90 placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-lg font-medium"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700"
              size={24}
              aria-hidden="true"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Submit search"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePoster;