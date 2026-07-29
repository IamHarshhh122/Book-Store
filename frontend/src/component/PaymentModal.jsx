import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, bookId, bookName, bookPrice, onProgressComplete }) => {
  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setLoading(false);
      setCardData({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
      console.log("Modal Mounted for Book:", bookId);
    }
  }, [isOpen, bookId]);

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleFakePay = async (e) => {
    e.preventDefault();
    const storageUser = localStorage.getItem("Users");
    const authUser = storageUser ? JSON.parse(storageUser) : null;
    
    const finalBookId = bookId;

    if (!finalBookId) {
      toast.error("Book ID missing! Refresh karke wapas try karo.");
      return;
    }

    if (!authUser?._id) {
      toast.error("Bhai, pehle login toh kar lo!");
      return;
    }

    setStep('processing');
    setLoading(true);

    try {
      const response = await axios.post("https://bobook-store-backend.onrender.com/user/purchase", {
        userId: authUser._id, 
        bookId: finalBookId,  
      });

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          setStep('success');
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("PAYMENT ERROR DETAILS:", error);
      const errorMsg = error.response?.data?.message || "Payment Failed! Server connectivity issue.";
      toast.error(errorMsg);
      setStep('form');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-xl"></div>
    
      <div className="relative bg-[#0f172a] text-white w-full max-w-4xl min-h-[550px] rounded-[2rem] shadow-[0_0_50px_rgba(219,39,119,0.2)] overflow-hidden flex flex-col md:flex-row border border-white/10 z-10">
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-6 right-8 z-[110] text-slate-400 hover:text-pink-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* PAYMENT FORM */}
        {step === 'form' && (
          <>
            <div className="w-full md:w-2/5 bg-black/40 p-10 border-r border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="text-pink-500 font-bold uppercase tracking-[0.2em] text-xs mb-8">Order Summary</h3>
                <h2 className="text-2xl font-black">{bookName || "Digital Book"}</h2>
                <div className="text-3xl font-black mt-6 text-pink-500">₹{bookPrice}</div>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-10">
              <h2 className="text-3xl font-black mb-10">Secure Payment</h2>
              <form onSubmit={handleFakePay} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Cardholder Name</label>
                    <input 
                      name="cardName" 
                      value={cardData.cardName} 
                      onChange={handleChange} 
                      required 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full bg-slate-800/50 p-4 text-sm border border-white/5 rounded-xl focus:border-pink-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Card Number</label>
                    <input 
                      name="cardNumber" 
                      value={cardData.cardNumber} 
                      onChange={handleChange} 
                      required 
                      type="text" 
                      placeholder="**** **** **** 0000" 
                      className="w-full bg-slate-800/50 p-4 text-sm border border-white/5 rounded-xl focus:border-pink-500 outline-none" 
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <input 
                        name="expiry" 
                        value={cardData.expiry} 
                        onChange={handleChange} 
                        required 
                        placeholder="MM/YY" 
                        className="w-full bg-slate-800/50 p-4 text-sm border border-white/5 rounded-xl outline-none focus:border-pink-500" 
                      />
                    </div>
                    <div className="w-1/2">
                      <input 
                        name="cvc" 
                        value={cardData.cvc} 
                        onChange={handleChange} 
                        required 
                        type="password" 
                        placeholder="***" 
                        className="w-full bg-slate-800/50 p-4 text-sm border border-white/5 rounded-xl outline-none focus:border-pink-500" 
                      />
                    </div>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] transition-all active:scale-95 mt-4 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Complete Payment"}
                </button>
              </form>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="w-full flex flex-col items-center justify-center p-20 animate-pulse">
            <div className="w-20 h-20 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-8 text-2xl font-black tracking-widest uppercase">Authenticating...</p>
          </div>
        )}

        {/*  SUCCESS STATE */}
        {step === 'success' && (
          <div className="w-full flex flex-col items-center justify-center p-16 text-center">
            <h2 className="text-5xl font-black text-emerald-500 mb-6">✓ CONFIRMED</h2>
            <button 
              onClick={onProgressComplete} 
              className="bg-white hover:bg-slate-200 text-black px-12 py-4 rounded-full font-black uppercase transition-all active:scale-95 shadow-lg"
            >
              Launch Digital Copy 📖
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PaymentModal;
