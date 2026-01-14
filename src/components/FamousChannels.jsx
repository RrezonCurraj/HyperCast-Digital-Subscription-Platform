import { famousChannels } from '../data/channels';
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
    TV Channels
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

const FamousChannels = () => {
  return (
    <div className="py-12 bg-gray-900 border-b border-gray-800 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
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
        <div className="flex animate-scroll-reverse hover:pause gap-8 w-max px-4">
          {/* Original Set */}
          {famousChannels.map((channel, index) => (
            <ChannelCard key={`original-${channel.id}-${index}`} channel={channel} />
          ))}
          {/* Duplicate Set */}
          {famousChannels.map((channel, index) => (
            <ChannelCard key={`dup-${channel.id}-${index}`} channel={channel} />
          ))}
          {/* Triplicate Set */}
          {famousChannels.map((channel, index) => (
            <ChannelCard key={`tri-${channel.id}-${index}`} channel={channel} />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scroll-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const ChannelCard = ({ channel }) => (
  <div className="w-40 sm:w-56 flex-shrink-0 group cursor-default">
    <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-800 bg-gray-800/50 p-6 mb-3 transition-transform duration-300 group-hover:-translate-y-2 flex items-center justify-center h-32 sm:h-40">
      <img
        src={channel.logo}
        alt={channel.name}
        className="w-full h-full object-contain transition-all duration-300 transform group-hover:scale-110"
      />
    </div>
    
    <div className="px-1 text-center">
      <h3 className="text-white font-bold text-lg truncate">{channel.name}</h3>
      <p className="text-gray-400 text-sm">{channel.category}</p>
    </div>
  </div>
);

export default FamousChannels;
