import { useState } from 'react';
import { Send, CheckCircle, Monitor, Smartphone, Tv } from 'lucide-react';

const RequestTest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    device: 'Smart TV'
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/request-trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // Reset after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', device: 'Smart TV' });
        }, 3000);
      } else {
        if (response.status === 404) {
          alert("DEVELOPER NOTE: The email system works on the Live Site (Vercel), not Localhost.\n\nPush to GitHub/Vercel to test the real email!");
          // Fake success for local testing satisfaction
          setStatus('success');
          setTimeout(() => setStatus('idle'), 3000);
        } else {
          alert("Something went wrong with the server.");
          setStatus('idle');
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. check your connection.");
      setStatus('idle');
    }
  };

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden" id="free-trial">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-12">
          
          {/* Text Content */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              24-Hour Free Trial
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Test it before <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                you buy it.
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Experience our premium quality with zero commitment. Get a full-access 24-hour pass sent directly to your email instantly.
            </p>

            <div className="flex justify-center">
              <ul className="text-left space-y-4 mb-8 inline-block">
                {[
                  "Access to 15,000+ Live Channels",
                  "Library of 80,000+ Movies & Series",
                  "4K / UHD Quality on Supported Channels",
                  "No Credit Card Required"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <form onSubmit={handleSubmit} className="relative space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-gray-950/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Device Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Smart TV', icon: Tv, label: 'Smart TV' },
                    { id: 'Mobile', icon: Smartphone, label: 'Phone/Tab' },
                    { id: 'PC', icon: Monitor, label: 'Computer' },
                  ].map((device) => (
                    <button
                      key={device.id}
                      type="button"
                      onClick={() => setFormData({...formData, device: device.id})}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                        formData.device === device.id 
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                          : 'bg-gray-950/50 border-gray-700 text-gray-500 hover:border-gray-600'
                      }`}
                    >
                      <device.icon size={20} />
                      <span className="text-xs font-medium">{device.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={status !== 'idle'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'idle' && (
                  <>
                    Request Test Link <Send size={18} />
                  </>
                )}
                {status === 'submitting' && (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                )}
                {status === 'success' && (
                  <>
                    Sent! Check Inbox <CheckCircle size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                By requesting, you agree to receive a one-time email with login details.
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestTest;
