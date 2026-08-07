import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Frontend Bypass Condition
    if (adminEmail && adminPassword && data.email === adminEmail && data.password === adminPassword) {
      const adminUser = {
        _id: "admin_bypass_id_123",
        fullname: "System Architect",
        email: adminEmail,
        role: "admin"
      };

      localStorage.setItem("bossJustLoggedIn", "true");
      localStorage.setItem("Users", JSON.stringify(adminUser));
      setAuthUser(adminUser);

      toast.success('Access Granted: Administrator Matrix', {
        duration: 4000,
        position: 'top-center',
        style: { 
          borderRadius: '16px', 
          background: '#020617', 
          color: '#10b981', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          fontWeight: 'bold',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        },
      });

      const modal = document.getElementById("my_modal_3");
      if (modal) modal.close();

      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 500);
      
      return; 
    }

    const userInfo = { email: data.email, password: data.password };

    try {
      const res = await axios.post("https://bobook-store-backend.onrender.com/user/login", userInfo);
      
      if (res.data) {
        const loggedInUser = res.data.user;

        toast.success('Authentication Successful. Welcome to the Codex.', {
          duration: 4000,
          position: 'top-center',
          style: { 
            borderRadius: '16px', 
            background: '#020617', 
            color: '#10b981', 
            border: '1px solid rgba(16, 185, 129, 0.2)',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          },
        });

        localStorage.setItem("Users", JSON.stringify(loggedInUser));
        setAuthUser(loggedInUser);
        
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();

        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response ? err.response.data.message : "Authentication Error: Invalid Credentials", {
        style: { 
          borderRadius: '16px', 
          background: '#020617', 
          color: '#ef4444', 
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontWeight: 'bold',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        },
      });
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="mt-4 font-black tracking-widest text-emerald-400 uppercase text-xs animate-pulse">Establishing Secure Link...</p>
        </div>
      )}

      <button 
        onClick={() => document.getElementById("my_modal_3").showModal()} 
        className="p-2 active:scale-90 transition-all group"
      >
        <img src="/logout2.png" alt="Login" className="w-10 h-10 rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all object-cover" />
      </button>

      <dialog id="my_modal_3" className="modal backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="modal-box bg-[#020617] border border-emerald-500/30 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative text-white max-w-md w-full"
        >
          <button 
            type="button" 
            onClick={() => document.getElementById("my_modal_3").close()} 
            className="absolute right-6 top-6 w-8 h-8 rounded-full bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all font-bold"
          >
            ✕
          </button>

          <div className="text-center mb-8 pt-2">
            <h3 className="font-black text-2xl uppercase tracking-tighter italic">
              ENTER <span className="text-emerald-500">THE NEXUS</span>
            </h3>
            <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-1">
              Secure Terminal Authentication
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="name@domain.com" 
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all" 
                {...register("email", { required: true })} 
              />
              {errors.email && <span className="text-red-500 text-[10px] font-bold mt-1 block">Field required</span>}
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all" 
                {...register("password", { required: true })} 
              />
              {errors.password && <span className="text-red-500 text-[10px] font-bold mt-1 block">Field required</span>}
            </div>

            <button 
              type="submit" 
              className="w-full py-4 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Start your session
            </button>
          </form>

          <p className="text-center mt-6 text-xs text-slate-400 font-medium">
            New user?{' '}
            <Link 
              to="/signup" 
              onClick={() => document.getElementById("my_modal_3").close()} 
              className="text-emerald-400 font-bold hover:underline ml-1"
            >
              Create Account
            </Link>
          </p>
        </motion.div>
        
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Login;
