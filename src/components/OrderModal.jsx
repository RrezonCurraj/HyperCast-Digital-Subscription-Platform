import { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

const OrderModal = ({ plan, isOpen, onClose }) => {
  const [step, setStep] = useState('form'); // form, payment, processing, success
  const [formData, setFormData] = useState({ email: '', confirmEmail: '' });
  const [referenceCode, setReferenceCode] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [paypalLoading, setPaypalLoading] = useState(true);
  const paypalContainerRef = useRef(null);
  const paypalButtonsRendered = useRef(false);

  // Define handleOrderCompletion FIRST using useCallback
  const handleOrderCompletion = useCallback((paypalOrder) => {
    console.log("Finalizing Order:", paypalOrder);
    
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        plan: `${plan?.duration} Plan`,
        price: plan?.price,
        referenceCode: referenceCode,
        transactionId: paypalOrder.id
      })
    })
    .then(async (res) => {
      const isJson = res.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await res.json() : null;
      if (!res.ok) {
        console.error('Email API Error:', (data && data.message) || res.status);
      } else {
        console.log('Email Sent Successfully:', data);
      }
    })
    .catch(err => {
      console.error('Email Network Error:', err)
    });

    setTimeout(() => {
      setOrderDetails({
        id: paypalOrder.id,
        payer: paypalOrder.payer,
        plan: plan,
        contact: formData
      });
      setStep('success');
    }, 1500);
  }, [formData, plan, referenceCode]);

  // Reset paypal state when modal closes
  useEffect(() => {
    if (!isOpen) {
      paypalButtonsRendered.current = false;
      setPaypalLoading(true);
    }
  }, [isOpen]);

  // Render PayPal buttons when step changes to 'payment'
  useEffect(() => {
    if (step !== 'payment' || !paypalContainerRef.current || paypalButtonsRendered.current) {
      return;
    }

    // Wait for PayPal SDK to load
    const checkPayPal = () => {
      if (window.paypal) {
        paypalButtonsRendered.current = true;
        setPaypalLoading(false);
        
        window.paypal.Buttons({
          style: { layout: "vertical", color: "blue", shape: "rect", label: "pay" },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: referenceCode,
                amount: {
                  value: plan.price,
                  currency_code: "EUR"
                },
              }],
            });
          },
          onApprove: async (data, actions) => {
            console.log("User Approved. Capturing funds...");
            try {
              const order = await actions.order.capture();
              console.log(`Capture Success! Status: ${order.status}`);
              handleOrderCompletion(order);
            } catch (err) {
              console.error("PayPal Capture Error:", err);
              if (err.message && (err.message.includes("Window closed") || err.message.includes("Connection closed"))) {
                console.log("Safety Net Triggered.");
                handleOrderCompletion({ 
                  id: data.orderID || 'ERR-CAPTURED', 
                  payer: { email_address: formData.email },
                  status: 'COMPLETED_VIA_SAFETY_NET',
                  errorDetails: err.message
                });
              } else {
                alert(`Payment Failed: ${err.message}\n\nPlease try a different card or account.`);
              }
            }
          },
          onError: (err) => {
            console.error("PayPal Button Error:", err);
            alert("Payment Error: " + err.message);
          }
        }).render(paypalContainerRef.current);
        return true;
      }
      return false;
    };

    // Try immediately
    if (checkPayPal()) return;

    // Otherwise poll every 100ms for up to 5 seconds
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (checkPayPal() || attempts > 50) {
        clearInterval(interval);
        if (attempts > 50 && !window.paypal) {
          setPaypalLoading(false);
          console.error("PayPal SDK failed to load after 5 seconds");
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [step, referenceCode, plan?.price, formData.email, handleOrderCompletion]);

  if (!isOpen || !plan) return null;

  // Initial Form Submit -> Go to Payment
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.email !== formData.confirmEmail) {
      setError("Email addresses do not match!");
      return;
    }
    // Generate reference code immediately
    const code = 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setReferenceCode(code);
    setStep('payment');
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const reset = () => {
    setStep('form');
    setFormData({ email: '', confirmEmail: '' });
    setOrderDetails(null);
    setError('');
    paypalButtonsRendered.current = false;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md border border-gray-700 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={reset}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6 overflow-y-auto">
          
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <>
              <h3 className="text-2xl font-bold text-white mb-2">Complete Order</h3>
              <p className="text-gray-400 mb-6">
                You selected the <span className="text-blue-400 font-bold">{plan.duration}</span> plan for <span className="text-white font-bold">€{plan.price}</span>.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full bg-gray-900 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`}
                    placeholder="Re-enter your email"
                    value={formData.confirmEmail}
                    onChange={(e) => updateFormData('confirmEmail', e.target.value)}
                    onPaste={(e) => e.preventDefault()} 
                  />
                  <p className="text-xs text-gray-500 mt-1">We will send the playlist code here.</p>
                </div>

                {error && (
                  <div className="text-red-500 text-sm font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
                >
                  Continue to Payment
                </button>
              </form>
            </>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep('form')} className="text-gray-400 hover:text-white">
                   <ArrowLeft size={20} />
                </button>
                <h3 className="text-2xl font-bold text-white">Payment Method</h3>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white font-semibold">{plan.duration}</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-gray-400">Total</span>
                  <span className="text-blue-400 font-bold">€{plan.price}</span>
                </div>
              </div>

              <div className="text-center">
                {paypalLoading && (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                    <span className="ml-2 text-gray-400">Loading PayPal...</span>
                  </div>
                )}
                <div ref={paypalContainerRef} id="paypal-button-container"></div>
                <p className="text-xs text-gray-500 mt-4">
                  Secure payment processed by PayPal. 
                  <br/>We do not store your financial details.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <Loader2 size={48} className="text-blue-500 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white">Verifying Payment...</h3>
              <p className="text-gray-400 mt-2">Please do not close this window.</p>
              <p className="text-xs text-gray-500 mt-4">Generating your secure playlist...</p>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-300 mb-6">
                We have received your order.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-700 text-left">
                <div className="flex justify-between mb-2">
                   <span className="text-gray-500 text-sm">Amount Paid</span>
                   <span className="text-white font-bold">€{plan.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                   <span className="text-gray-500 text-sm">Transaction ID</span>
                   <span className="text-white font-mono text-xs">{orderDetails?.id || 'PENDING'}</span>
                </div>
                <div className="border-t border-gray-800 my-2 pt-2">
                  <p className="text-sm text-gray-400 text-center mb-1">Reference Code</p>
                  <p className="text-xl font-mono font-bold text-center text-blue-400">{referenceCode}</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-200">
                  <strong>Order sent to dispatch!</strong><br/>
                  Check your email <b>{formData.email}</b>. Your playlist will arrive shortly.<br/>
                  <span className="text-blue-100/70 text-xs">(Please check your Spam/Junk folder if you don't see it)</span>
                </p>
              </div>

              <button
                onClick={reset}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
