
import { Check } from 'lucide-react';

const plans = [
  {
    duration: '1 Month',
    price: '9.99',
    features: ['Stable Performance', 'SD, HD, FHD, 4K', '+20K Live TVs', '+80K VODs', 'Sports, News, Shows...', 'Supports all devices', 'EPG & Catch-Up', '7/7 Support'],
    recommended: false
  },
  {
    duration: '3 Months',
    price: '27.99',
    features: ['Stable Performance', 'SD, HD, FHD, 4K', '+20K Live TVs', '+80K VODs', 'Sports, News, Shows...', 'Supports all devices', 'EPG & Catch-Up', '7/7 Support'],
    recommended: false
  },
  {
    duration: '6 Months',
    price: '49.99',
    features: ['Stable Performance', 'SD, HD, FHD, 4K', '+20K Live TVs', '+80K VODs', 'Sports, News, Shows...', 'Supports all devices', 'EPG & Catch-Up', '7/7 Support'],
    recommended: false
  },
  {
    duration: '12 Months',
    price: '69.99',
    features: ['Stable Performance', 'SD, HD, FHD, 4K', '+20K Live TVs', '+80K VODs', 'Sports, News, Shows...', 'Supports all devices', 'EPG & Catch-Up', '7/7 Support'],
    recommended: true
  },
  {
    duration: '24 Months',
    price: '119.99',
    features: ['Stable Performance', 'SD, HD, FHD, 4K', '+20K Live TVs', '+80K VODs', 'Sports, News, Shows...', 'Supports all devices', 'EPG & Catch-Up', '7/7 Support'],
    recommended: false
  }
];

const Pricing = ({ onSelectPlan }) => {
  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden" id="pricing">
      {/* Background Blur Elements - Same as RequestTest */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Styled like RequestTest */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Flexible Plans
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Plan
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select the perfect subscription package for your needs. Instant activation and money-back guarantee.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 flex flex-col group ${
                plan.recommended 
                  ? 'border-blue-500/50 scale-105 z-10' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Glow Effect on Hover or Recommended */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur transition duration-500 ${
                plan.recommended ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
              }`}></div>
              
              <div className="relative">
                {plan.recommended && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Best Value
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.duration}</h3>
                  <div className="flex justify-center items-baseline gap-1">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">€{plan.price}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Check size={12} className="text-blue-400" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    plan.recommended 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-600/25' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
