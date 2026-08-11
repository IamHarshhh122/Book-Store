import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthProvider";

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
        fullname: "Admin",
        email: adminEmail,
        role: "admin"
      };

      localStorage.setItem("bossJustLoggedIn", "true");
      localStorage.setItem("Users", JSON.stringify(adminUser));
      setAuthUser(adminUser);

      toast.success('Welcome back, Admin!', {
        duration: 3000,
        position: 'top-center',
        style: { 
          borderRadius: '12px', 
          background: '#18181b', 
          color: '#fff', 
          border: '1px solid #27272a',
          fontWeight: '500',
          fontSize: '14px',
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

        toast.success('Logged in successfully!', {
          duration: 3000,
          position: 'top-center',
          style: { 
            borderRadius: '12px', 
            background: '#18181b', 
            color: '#fff', 
            border: '1px solid #27272a',
            fontWeight: '500',
            fontSize: '14px',
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
      toast.error(err.response ? err.response.data.message : "Invalid email or password", {
        duration: 4000,
        position: 'top-center',
        style: { 
          borderRadius: '12px', 
          background: '#18181b', 
          color: '#ef4444', 
          border: '1px solid #27272a',
          fontWeight: '500',
          fontSize: '14px',
        },
      });
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 font-medium text-white text-sm">Please wait...</p>
        </div>
      )}

      <button 
        onClick={() => document.getElementById("my_modal_3").showModal()} 
        className="p-2 active:scale-95 transition-all"
      >
        <img src="/logout2.png" alt="Login" className="w-10 h-10 rounded-full border border-slate-700 object-cover shadow-sm" />
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl relative text-slate-900 dark:text-white max-w-md w-full">
          <button 
            type="button" 
            onClick={() => document.getElementById("my_modal_3").close()} 
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            ✕
          </button>

          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
              <span>Read, Buy & Review</span>
            </div>
            
            <h3 className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              Welcome to <span className="text-emerald-500">BookStore</span>
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unlock worlds without unlocking your wallet.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all text-sm" 
                {...register("email", { required: true })} 
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 block">Email is required</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all text-sm" 
                {...register("password", { required: true })} 
              />
              {errors.password && <span className="text-red-500 text-xs mt-1 block">Password is required</span>}
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              Log in to Continue
            </button>
          </form>

          <p className="text-center mt-6 text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              onClick={() => document.getElementById("my_modal_3").close()} 
              className="text-emerald-500 font-semibold hover:underline ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
        
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Login;
