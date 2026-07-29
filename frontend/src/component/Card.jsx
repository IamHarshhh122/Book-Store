import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';

const Card = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.stopPropagation();

    //  authenticated user check
    const storageUser = localStorage.getItem("Users");
    const authUser = storageUser ? JSON.parse(storageUser) : null;

    //  unauthenticated user check
    if (!authUser || !authUser._id) {
      setShowAuthAlert(true);
      return;
    }

    if (item.category === "Free") {
      if (item.pdfUrl) {
        window.open(item.pdfUrl, "_blank");
      } else {
        alert("Sorry, PDF URL not available.");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleGoToLogin = () => {
    setShowAuthAlert(false);
    navigate('/Signup');
  };

  return (
    <div className="py-6 px-4 md:px-2"> 
      <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl duration-500 transition-all flex flex-col h-[450px] md:h-[400px] w-full">
        <figure className="relative h-64 md:h-56 overflow-hidden shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              item.category === "Free" ? "bg-emerald-500 text-white" : "bg-pink-600 text-white"
            }`}>
              {item.category}
            </span>
          </div>
        </figure>

        <div className="p-6 md:p-5 flex flex-col justify-between flex-grow text-left">
          <div>
            <h2 className="text-xl md:text-lg font-black text-slate-900 dark:text-white leading-tight line-clamp-1">
              {item.name}
            </h2>
            <p className="text-xs md:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 italic">
              {item.title || "Explore the depths of wisdom and knowledge."}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Price</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {item.price === 0 ? "FREE" : `₹${item.price}`}
              </span>
            </div>
            <button onClick={handleAction} className="px-8 py-3 md:px-6 md:py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-xs md:text-[10px] font-black uppercase tracking-tighter hover:bg-pink-600 hover:text-white transition-all duration-300 active:scale-95">
              {item.category === "Free" ? "Read Now" : "Unlock"}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal ka logic */}
      {isModalOpen && (
        <PaymentModal 
          key={item?._id || item?.id || "temp-key"} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          bookId={item?._id || item?.id || (item?.id ? item.id : undefined)} 
          bookName={item?.name}
          bookPrice={item?.price}
          onProgressComplete={() => {
            setIsModalOpen(false);
            if(item.pdfUrl) window.open(item.pdfUrl, "_blank");
          }}
        />
      )}

      {showAuthAlert && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            onClick={() => setShowAuthAlert(false)} 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="relative bg-[#0f172a] text-white w-full max-w-md p-8 rounded-[2rem] shadow-[0_0_50px_rgba(219,39,119,0.3)] border border-white/10 z-10 text-center flex flex-col items-center">
            
            <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center border border-pink-500/20 mb-5">
              <span className="text-3xl">🔒</span>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-white mb-2">
              Login Required
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              Please Sign in Or Log in to read <span className="text-pink-500 font-bold">"{item.name}"</span>.
            </p>

            <div className="flex flex-col w-full gap-3">
     
              <button 
                onClick={handleGoToLogin}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all active:scale-95 shadow-lg shadow-pink-600/30"
              >
                Go to Login / Signup 🚀
              </button>

              <button 
                onClick={() => setShowAuthAlert(false)}
                className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Cancel
              </button>
            </div>

            <button 
              onClick={() => setShowAuthAlert(false)} 
              className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Card;
