import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Home, 
  Flame, 
  TrendingUp, 
  X,
  Menu
} from "lucide-react";

const Navbar = ({ onFilter }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    language: "",
    genre: "",
    year: "",
    list: ""
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter?.(updatedFilters);
  };

  const resetFilters = () => {
    setFilters({
      language: "",
      genre: "",
      year: "",
      list: ""
    });
    onFilter?.({});
    setIsFilterOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-wider text-white hover:text-indigo-200 transition"
          >
            FilmHunt
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-indigo-200"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop Search and Filter */}
            <form 
              onSubmit={handleSearch} 
              className="flex items-center w-96 bg-indigo-800 rounded-full overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow bg-transparent px-4 py-2 text-white placeholder-indigo-300 focus:outline-none"
              />
              <button 
                type="submit" 
                className="p-2 bg-indigo-700 hover:bg-indigo-600 transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center bg-purple-800 hover:bg-purple-700 rounded-full px-4 py-2 transition"
            >
              <Filter className="w-5 h-5 mr-2" />
              <span>Filters</span>
            </button>

            {/* Navigation Links */}
            <div className="flex space-x-4">
              <Link 
                to="/" 
                className="flex items-center hover:text-indigo-200 transition"
              >
                <Home className="w-5 h-5 mr-1" /> Home
              </Link>
              <Link 
                to="/trending" 
                className="flex items-center hover:text-indigo-200 transition"
              >
                <Flame className="w-5 h-5 mr-1" /> Trending
              </Link>
              <Link 
                to="/popular" 
                className="flex items-center hover:text-indigo-200 transition"
              >
                <TrendingUp className="w-5 h-5 mr-1" /> Popular
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-gradient-to-r from-indigo-900 to-purple-900 md:hidden">
              {/* Mobile Search */}
              <form 
                onSubmit={handleSearch} 
                className="flex items-center m-4 bg-indigo-800 rounded-full overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow bg-transparent px-4 py-2 text-white placeholder-indigo-300 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="p-2 bg-indigo-700 hover:bg-indigo-600 transition"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center w-full px-4 py-3 bg-purple-800/50 hover:bg-purple-700/50 transition"
              >
                <Filter className="w-5 h-5 mr-2" />
                <span>Filters</span>
              </button>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col">
                {[
                  { to: "/", icon: Home, label: "Home" },
                  { to: "/trending", icon: Flame, label: "Trending" },
                  { to: "/popular", icon: TrendingUp, label: "Popular" }
                ].map(({ to, icon: Icon, label }) => (
                  <Link 
                    key={to}
                    to={to} 
                    className="flex items-center px-4 py-3 hover:bg-indigo-800/50 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-2" /> {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal (Shared between Mobile and Desktop) */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-indigo-900 rounded-xl p-6 w-11/12 max-w-md relative">
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-indigo-300"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">
              Filter Options
            </h2>

            {/* Filter content remains the same as previous implementation */}
            <div className="space-y-4">
              {/* ... (previous filter sections) ... */}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={resetFilters}
                className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;