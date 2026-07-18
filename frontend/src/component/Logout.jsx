import React, { useState } from 'react';
import { createPortal } from "react-dom"; 
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 

const Logout = () => {
  const { authUser, setAuthUser } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setShowConfirm(false);
    setLoading(true);

    try {
      const userId = authUser?._id || JSON.parse(localStorage.getItem("Users"))?._id;
      
      // Safe Backend API Request
      if (userId) {
        try {
          await axios.post("http://localhost:4001/user/logout", { userId });
        } catch (apiError) {
          // Agar backend fail ho ya router na mile, toh console me error dikhega par app crash nahi hogi
          console.error("Backend logout request failed (safely bypassed for frontend):", apiError);
        }
      }

      // Auth Cleanup (Ye hamesha execute hoga)
      setAuthUser(null);
      localStorage.removeItem("Users");

      toast.success("Bye Buddy & Bestie See you soon! ☕", {
        icon: '☕',
        position: "top-center",
        style: {
          borderRadius: '15px',
          background: '#1e293b',
          color: '#fff',
          border: '1px solid #6366f1'
        },
      });

      setTimeout(() => {
        navigate("/"); 
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error("Critical Logout Error:", error);
      setLoading(false);
      toast.error("Logout failed, try again!");
    }
  };

  return (
    <>
      {showConfirm && createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center">
          <AnimatePresence>
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setShowConfirm(false)} 
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.8, opacity: 0, y: 20 }} 
                className="relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-white/10 max-w-[340px] w-full text-center space-y-6"
              >
                <div className="text-6xl animate-bounce">☕</div>
                <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight uppercase">Tea Break?</h3>
                <p className="text-slate-400 text-sm italic">"We'll keep the tea warm. See you for the next chapter!"</p>
                
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all rounded-2xl bg-slate-100 dark:bg-slate-800">Stay</button>
                  <button onClick={handleLogout} className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-black shadow-lg shadow-red-500/20 active:scale-95 transition-all">Log Out</button>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        </div>,
        document.body
      )}

      {loading && createPortal(
        <div className="fixed inset-0 z-[1000000] flex flex-col items-center justify-center bg-[#050816]/95 backdrop-blur-xl">
          <div className="loading loading-spinner loading-lg text-[#6366f1]"></div>
          <p className="mt-6 font-medium text-slate-300 italic animate-pulse text-lg">Your Sip Of tea waits for you ☕</p>
        </div>,
        document.body
      )}

      <div className="relative flex items-center justify-center">
        <button
          onClick={() => setShowConfirm(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative p-1 rounded-full active:scale-90 group"
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -45 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bg-slate-800 text-white text-[10px] font-black uppercase px-3 py-1 rounded-md border border-white/10 shadow-xl z-50 whitespace-nowrap"
              >
                Logout
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-white/10"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <img 
            src="/logout(1).png" 
            alt="Logout" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white/10 shadow-lg group-hover:scale-110 group-hover:border-red-500/50 transition-all duration-300" 
          />
        </button>
      </div>
    </>
  );
};

export default Logout;