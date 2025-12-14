import React from 'react';
import { Movie } from '../types';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  rank: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, rank }) => {
  // Generate a dynamic gradient based on the movie ID
  const getGradient = (id: number) => {
    const gradients = [
      'from-purple-500 to-indigo-600',
      'from-pink-500 to-rose-600',
      'from-blue-500 to-cyan-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
    ];
    return gradients[id % gradients.length];
  };

  const percentage = Math.round((movie.similarity || 0) * 100);

  return (
    <div className="group relative flex items-center bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 animate-slide-up" style={{ animationDelay: `${rank * 100}ms` }}>
      
      {/* Rank Indicator */}
      <div className={`w-16 h-32 flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${getGradient(movie.id)}`}>
        <span className="text-2xl font-bold text-white">#{rank}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
              {movie.year}
            </span>
          </div>
          
          <div className="flex gap-2 mt-2">
            {movie.genres.map(genre => (
              <span key={genre} className="text-xs text-gray-400">
                #{genre}
              </span>
            ))}
          </div>
        </div>

        {/* Match Score */}
        <div className="text-right pl-4 border-l border-white/5">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-semibold">Match</div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Star className="w-4 h-4 fill-emerald-400/20" />
            <span className="text-2xl font-mono font-bold">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

export default MovieCard;
