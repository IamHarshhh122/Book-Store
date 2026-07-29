import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    //  Frontend Bypass Condition
    if (data.email === adminEmail && data.password === adminPassword) {
      const adminUser = {
        _id: "admin_bypass_id_123",
        fullname: "Admin Boss",
        email: adminEmail,
        role: "admin"
      };

      localStorage.setItem("bossJustLoggedIn", "true");
      localStorage.setItem("Users", JSON.stringify(adminUser));

      toast.success('Welcome Back Boss! Ready to rule? 👑', {
        duration: 4000,
        position: 'top-center',
        style: { borderRadius: '15px', background: '#1e293b', color: '#fff', border: '1px solid #db2777' },
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

        toast.success('Logged in successfully!! Pack your bags and Ready to dive? ☺️', {
          duration: 4000,
          position: 'top-center',
          style: { borderRadius: '15px', background: '#1e293b', color: '#fff', border: '1px solid #db2777' },
        });

        localStorage.setItem("Users", JSON.stringify(loggedInUser));
        
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();

        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response ? "Error: " + err.response.data.message : "Network Error!");
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
          <div className="loading loading-spinner loading-lg text-pink-600"></div>
          <p className="mt-4 font-bold text-slate-800 dark:text-white animate-pulse text-lg">Authenticating...</p>
        </div>
      )}

      <button onClick={() => document.getElementById("my_modal_3").showModal()} className="p-2 active:scale-90 transition-all">
        <img src="/logout2.png" alt="Login" className="w-10 h-10 rounded-full border-2 border-white/10 shadow-lg" />
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-slate-900 border border-slate-700 rounded-[2rem] p-8 shadow-2xl relative text-slate-900 dark:text-white">
          <button type="button" onClick={() => document.getElementById("my_modal_3").close()} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
          <div className="text-center mb-8"><h3 className="font-black text-2xl uppercase tracking-tighter">For Better <span className="text-pink-600">Experience</span></h3></div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input type="email" placeholder="Email Address" className="w-full px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 ring-pink-600" {...register("email", { required: true })} />
            <input type="password" placeholder="Password" className="w-full px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 ring-pink-600" {...register("password", { required: true })} />
            <button type="submit" className="w-full py-4 rounded-2xl bg-pink-600 text-white font-black hover:bg-pink-700 active:scale-95 transition-all shadow-lg">Login Now</button>
          </form>
          <p className="text-center mt-6 text-sm text-slate-500 font-medium">Don't have an account? <Link to="/signup" onClick={() => document.getElementById("my_modal_3").close()} className="text-red-600 font-bold hover:underline">Sign up for free</Link></p>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
