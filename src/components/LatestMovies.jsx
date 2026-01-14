import { latestMovies } from '../data/movies';
import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const HeadLine = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 1.0 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2 
      ref={ref} 
      className={`text-3xl md:text-4xl font-bold text-white mb-4 inline-block relative ${isVisible ? 'in-view' : ''}`}
    >
      Latest Movies
      <svg 
        className="absolute -bottom-2 left-0 w-full h-3 text-blue-600" 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none"
      >
          <path 
            d="M0 5 Q 50 10 100 5" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none"
            className="path-underline"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
      </svg>
      <style>{`
        .path-underline {
          transition: stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .in-view .path-underline {
          stroke-dashoffset: 0;
        }
      `}</style>
    </h2>
  );
};

const LatestMovies = () => {
  return (
    <div className="py-12 bg-gray-900 border-b border-gray-800 relative overflow-hidden">
      {/* Background Gradients (Similar to Testimonials for consistency) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] right-[20%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <HeadLine />
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent z-20" />

        {/* Sliding Track */}
        <div className="flex animate-scroll hover:pause gap-6 w-max px-4">
          {/* Original Set */}
          {latestMovies.map((movie, index) => (
            <MovieCard key={`original-${movie.id}-${index}`} movie={movie} />
          ))}
          {/* Duplicate Set */}
          {latestMovies.map((movie, index) => (
            <MovieCard key={`dup-${movie.id}-${index}`} movie={movie} />
          ))}
          {/* Triplicate Set */}
          {latestMovies.map((movie, index) => (
            <MovieCard key={`tri-${movie.id}-${index}`} movie={movie} />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const MovieCard = ({ movie }) => (
  <div className="w-48 sm:w-64 flex-shrink-0 group cursor-default">
    <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-800 mb-3 transition-transform duration-300 group-hover:-translate-y-2">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-72 sm:h-96 object-cover"
      />
    </div>
    
    <div className="px-1">
      <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
      <div className="flex items-center justify-between text-sm mt-1">
        <span className="text-gray-400">{movie.year}</span>
        <div className="flex items-center text-yellow-500 gap-1">
          <Star size={14} fill="currentColor" />
          <span>{movie.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

export default LatestMovies;
