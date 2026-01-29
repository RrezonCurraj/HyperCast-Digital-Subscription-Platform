import { Tv, Wrench } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="flex items-center gap-2 text-3xl font-bold text-white mb-8">
        <Tv className="text-blue-500 w-10 h-10" />
        <span>Hyper<span className="text-blue-500">Cast</span></span>
      </div>
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-500/10 p-4 rounded-full">
            <Wrench className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Maintenance Break
        </h1>
        
        <p className="text-gray-400 mb-6">
          We are currently performing scheduled maintenance to improve our services. We will be back shortly.
        </p>
        
        <div className="text-sm text-gray-500">
          Thank you for your patience.
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
