import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname, 
      email: data.email,
      password: data.password,
    };

    setLoading(true);
// FIXED: Localhost se badal kar live backend link laga diya
await axios.post("https://bobook-store-backend.onrender.com/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success('Account Created! Welcome to the BookStore family .Ready to explore? 😎'); 

          localStorage.setItem("Users", JSON.stringify(res.data.user));
          
          setTimeout(() => {
            setLoading(false);
            navigate("/");
            window.location.reload(); 
          }, 3000); 
        }
      })
      .catch((err) => {
        setLoading(false); 
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        } else {
          toast.error(" Network Error! Check Your  Backend ");
        }
      });
  };

  const handleLoginClick = () => {
    navigate("/");
    setTimeout(() => {
      const modal = document.getElementById("my_modal_3");
      if (modal) {
        modal.showModal();
      }
    }, 200);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-950 px-4 transition-colors duration-300">
      
      {/* --- FULL SCREEN BLUR LOADER --- */}
      {loading && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
          <div className="loading loading-spinner loading-lg text-pink-600"></div>
          <p className="mt-4 font-bold text-slate-800 dark:text-white animate-pulse text-lg">
            Creating your account, please wait...
          </p>
        </div>
      )}

      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-10 shadow-2xl relative">
        
        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6 text-slate-400 hover:text-red-600 transition-all">✕</Link>

        <div className="text-center space-y-2 mb-10">
          <h3 className="font-black text-4xl text-slate-900 dark:text-white tracking-tighter uppercase">
            Create <span className="text-pink-600">Account</span>
          </h3>
          <p className="text-sm text-slate-500 font-medium italic">Join the premium wisdom circle</p>
        </div>

  
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-pink-600 outline-none transition-all text-slate-900 dark:text-white font-medium"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <span className="text-xs text-red-500 ml-2">Name is required</span>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter Your Gmail" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-pink-600 outline-none transition-all text-slate-900 dark:text-white font-medium"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-xs text-red-500 ml-2">Email is required</span>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-pink-600 outline-none transition-all text-slate-900 dark:text-white font-medium"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="text-xs text-red-500 ml-2">Password is required</span>}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all mt-4 
                ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-pink-600 text-white shadow-pink-500/20 hover:bg-pink-700 hover:scale-[1.02] active:scale-95"}`}
            >
              {loading ? "Registering..." : "Sign Up Now"}
            </button>
          </div>
        </form>

        <div className="text-center mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account? 
            <button 
              onClick={handleLoginClick}
              disabled={loading}
              className="text-red-600 font-black ml-1 hover:underline cursor-pointer disabled:no-underline disabled:text-slate-400"
            >
              Login Here
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup;
