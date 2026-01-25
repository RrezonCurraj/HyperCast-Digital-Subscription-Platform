import { useEffect, useRef, useState } from 'react';
import { Tv, Film, Video, Cast, Monitor, Radio, Disc, Music } from 'lucide-react';

const ActivityIcon = ({size, className}) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
);

const genericChannels = [
  { id: 1, name: "Prime Channel", category: "Entertainment", icon: Tv },
  { id: 2, name: "Movie Central", category: "Movies", icon: Film },
  { id: 3, name: "Sports Arena", category: "Sports", icon: ActivityIcon },
  { id: 4, name: "News 24/7", category: "News", icon: Radio },
  { id: 5, name: "Kids Zone", category: "Kids", icon: Cast },
  { id: 6, name: "DocuWorld", category: "Documentary", icon: Monitor },
  { id: 7, name: "Music Hits", category: "Music", icon: Music },
  { id: 8, name: "Classic TV", category: "Classics", icon: Disc },
];

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
    Featured Partners
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
          {genericChannels.map((channel, index) => (
            <ChannelCard key={`original-${channel.id}-${index}`} channel={channel} />
          ))}
          {/* Duplicate Set */}
          {genericChannels.map((channel, index) => (
            <ChannelCard key={`dup-${channel.id}-${index}`} channel={channel} />
          ))}
          {/* Triplicate Set */}
          {genericChannels.map((channel, index) => (
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
      <channel.icon size={64} className="text-gray-600 group-hover:text-blue-400 transition-colors duration-300" />
    </div>
    
    <div className="px-1 text-center">
      <h3 className="text-white font-bold text-lg truncate">{channel.name}</h3>
      <p className="text-gray-400 text-sm">{channel.category}</p>
    </div>
  </div>
);

export default FamousChannels;

