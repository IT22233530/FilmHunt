import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Calendar, Clock, Globe, Film } from 'lucide-react';

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieResponse, castResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=a07097b1790ca0b3b085d11b7bf8aca4`),
          axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=a07097b1790ca0b3b085d11b7bf8aca4`)
        ]);
        console.log(movieResponse);

        setMovie(movieResponse.data);
        setCast(castResponse.data.cast.slice(0, 8));
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    fetchMovieData();
  }, [movie_id]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-white/50"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex justify-center items-center text-white text-2xl">
      {error}
    </div>
  );

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Poster Section */}
          <div className="flex flex-col items-center">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="rounded-lg shadow-2xl max-w-full h-auto object-cover border-4 border-white/20"
            />
          </div>

          {/* Movie Details Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="italic text-white/75 mb-6">{movie.tagline}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="text-white/75" />
                <span>Release Date: {new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="text-yellow-400" />
                <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-white/75" />
                <span>Runtime: {movie.runtime} minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <Film className="text-white/75" />
                <span>Genres: {movie.genres.map(genre => genre.name).join(', ')}</span>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-white/90 mb-6">{movie.overview}</p>

            {movie.homepage && (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
              >
                <Globe className="mr-2" /> Official Website
              </a>
            )}
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {cast.map((actor) => (
              <div 
                key={actor.id} 
                className="text-center bg-white/10 rounded-lg p-4 shadow-lg hover:scale-105 transition"
              >
                {actor.profile_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                    alt={actor.name}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-full h-48 bg-white/20 flex items-center justify-center rounded-lg mb-2">
                    No Image
                  </div>
                )}
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-white/75">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;