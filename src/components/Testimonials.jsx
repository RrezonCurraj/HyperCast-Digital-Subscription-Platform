import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Michael R.",
    role: "Premium Subscriber",
    image: "https://i.pravatar.cc/150?img=11",
    text: "The 4K streams are actually 4K, no buffering during big games. Top tier.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Yearly Plan",
    image: "https://i.pravatar.cc/150?img=5",
    text: "Finally found a service that doesn't freeze. Clear layout, massive selection.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "6 Month Plan",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Setup was instant. Received the email in 2 minutes. Highly recommended.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Subscriber",
    image: "https://i.pravatar.cc/150?img=9",
    text: "Customer support is actually helpful. Fixed my setup issue instantly.",
    rating: 5
  },
  {
    name: "James K.",
    role: "Sports Fan",
    image: "https://i.pravatar.cc/150?img=60",
    text: "Watched the UCL final without a single stutter. Worth every penny.",
    rating: 5
  },
  {
    name: "Robert Fox",
    role: "Movie Buff",
    image: "https://i.pravatar.cc/150?img=12",
    text: "The VOD library is insane. All the latest movies are there in high quality.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-400">Join thousands of happy customers streaming seamlessly.</p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-20" />

          {/* Sliding Track */}
          <div className="flex animate-scroll hover:pause gap-6 w-max">
            {/* Original Set */}
            {testimonials.map((item, index) => (
              <TestimonialCard key={`original-${index}`} item={item} />
            ))}
            {/* Duplicate Set for Infinite Loop */}
            {testimonials.map((item, index) => (
              <TestimonialCard key={`dup-${index}`} item={item} />
            ))}
             {/* Triplicate Set for Infinite Loop Safety on wide screens */}
             {testimonials.map((item, index) => (
              <TestimonialCard key={`tri-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Add Custom Animation Style if not in Tailwind Config */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Move 1/3 since we have 3 sets */
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const TestimonialCard = ({ item }) => (
  <div className="w-[300px] md:w-[350px] flex-shrink-0 bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
    <div className="flex items-center gap-4 mb-4">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-12 h-12 rounded-full object-cover border border-gray-700" 
      />
      <div>
        <h4 className="text-white font-bold text-sm">{item.name}</h4>
        <p className="text-blue-400 text-xs">{item.role}</p>
      </div>
      <div className="ml-auto text-blue-500/20">
        <Quote size={20} fill="currentColor" />
      </div>
    </div>
    
    <div className="flex gap-1 mb-3 text-yellow-400">
      {[...Array(item.rating)].map((_, i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
    
    <p className="text-gray-300 text-sm leading-relaxed">
      "{item.text}"
    </p>
  </div>
);

export default Testimonials;
