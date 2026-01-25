import { useState } from 'react';
import Hero from '../components/Hero';
import LatestMovies from '../components/LatestMovies';
import FamousChannels from '../components/FamousChannels';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import HowItWorks from '../components/HowItWorks';
import Support from '../components/Support';
import OrderModal from '../components/OrderModal';

const Home = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsOrderOpen(true);
  };

  return (
    <div>
      <Hero />
      <LatestMovies />
      <FamousChannels />
    
      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="pricing">
         <Pricing onSelectPlan={handleSelectPlan} />
      </section>

      <Testimonials />
      
      <section id="support">
         <Support />
      </section>
  
      <OrderModal 
        isOpen={isOrderOpen} 
        onClose={() => setIsOrderOpen(false)} 
        plan={selectedPlan} 
      />
    </div>
  );
};

export default Home;
