import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from 'framer-motion'; 
import { FaInstagram, FaGithub, FaLinkedin, FaStar, FaEnvelope, FaPenNib, FaCode } from 'react-icons/fa';
import { SiJavascript, SiReact, SiPython, SiTailwindcss, SiMongodb, SiCplusplus } from 'react-icons/si';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0); 
  const [submitted, setSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icons, setIcons] = useState([]);
  
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const iconOptions = [SiJavascript, SiReact, SiPython, SiTailwindcss, SiMongodb, SiCplusplus];
  const colors = ['#F7DF1E', '#61DAFB', '#3776AB', '#06B6D4', '#47A248', '#00599C'];

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const tempIcons = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      Icon: iconOptions[i % iconOptions.length],
      color: colors[i % colors.length],
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 10 + 20,
      duration: 12 + Math.random() * 15
    }));
    setIcons(tempIcons);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("Users"));
    const userEmail = userInfo ? userInfo.email : null;
    
    if (!userEmail) { 
        alert("Login please : without login you cannot continue "); 
        setLoading(false); 
        return; 
    }
    if (rating === 0) { 
        alert("False : plase rate the book"); 
        setLoading(false); 
        return; 
    }

    try {
      const response = await axios.post('http://localhost:4001/user/submit-review', { 
        ...data, 
        rating, 
        email: userEmail 
      });

      if (response.status === 201) { 
        setSubmitted(true); 
        setTimeout(() => { 
          setSubmitted(false); 
          reset(); 
          setRating(0);
          navigate("/"); 
        }, 5000); 
      }
    } catch (e) { 
        console.error("Submission Error:", e);
        alert("Bhai, Review save nahi ho paya. Backend check karo!"); 
    } finally { 
        setLoading(false); 
    }
  };

  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden ${isDark ? 'bg-[#020205]' : 'bg-[#f8fafc]'}`}>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        {icons.map((item) => (
          <motion.div
            key={item.id}
            initial={{ left: `${item.left}%`, top: `${item.top}%` }}
            animate={{ x: [0, 80, 0], y: [0, 80, 0], rotate: 360 }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "linear" }}
            className="absolute opacity-50" 
            style={{ color: item.color }}
          >
            <item.Icon size={item.size} /> 
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative z-10 w-full max-w-4xl mt-12 flex flex-col lg:flex-row rounded-[3rem] shadow-2xl overflow-hidden border ${isDark ? 'bg-[#0a0a1a]/80 border-white/10' : 'bg-white border-slate-200'} backdrop-blur-2xl`}
      >
        =
        <div className={`lg:w-[35%] p-10 flex flex-col items-center justify-between border-r ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
          <div className="w-full flex justify-between items-center opacity-30">
            <FaCode size={18} />
            <div className="h-[1px] flex-1 bg-current mx-4"></div>
            <FaPenNib size={18} />
          </div>

          <div className="relative group my-6">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-700"></div>
            <img src="/harsh.jpg" alt="Harsh" className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-xl" />
          </div>

          <div className="text-center">
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Harsh Bhatta</h2>
            <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-[0.3em] mt-1">Founder & Poet</p>
          </div>

          <div className="mt-8 flex flex-col w-full gap-3">
            <a href="mailto:harshbhatta5@gmail.com" className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ea4335] text-white text-[10px] font-bold uppercase tracking-widest shadow-lg transition-transform hover:scale-105">
              <FaEnvelope size={14} /> Gmail
            </a>
            <div className="flex gap-2">
              <a href="https://github.com/IamHarshhh122" target="_blank" className={`flex-1 flex justify-center py-3 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-slate-100'} border border-transparent dark:border-white/5 transition-all shadow-sm`}><FaGithub size={18} /></a>
              <a href="https://linkedin.com/in/harsh-bhatta-64985b32a" target="_blank" className={`flex-1 flex justify-center py-3 rounded-xl ${isDark ? 'bg-white/5 hover:bg-blue-600/10' : 'bg-white hover:bg-blue-50'} border border-transparent dark:border-white/5 transition-all shadow-sm text-blue-500`}><FaLinkedin size={18} /></a>
              <a href="https://instagram.com/bhatta_harsh" target="_blank" className={`flex-1 flex justify-center py-3 rounded-xl ${isDark ? 'bg-white/5 hover:bg-pink-600/10' : 'bg-white hover:bg-pink-50'} border border-transparent dark:border-white/5 transition-all shadow-sm text-pink-500`}><FaInstagram size={18} /></a>
            </div>
          </div>
        </div>

        <div className="flex-1 p-10 lg:p-12 flex flex-col justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Drop a <span className="text-indigo-500">Word.</span></h1>
                  <p className="text-slate-500 text-sm mt-1">Every story matters in our collection.</p>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <input {...register("name")} required className={`w-full bg-transparent border-b-2 py-2 outline-none font-bold text-xl transition-all ${isDark ? 'border-white/10 text-white focus:border-indigo-500' : 'border-slate-200 text-slate-900 focus:border-indigo-500'}`} placeholder="Who are you?" />
                  </div>
                  <div className='relative group'>
                    <input {...register("book") } required className={`w-full bg-transparent border-b-2 py-2 outline-none font-bold text-xl transition-all ${isDark ? 'border-white/10 text-white focus:border-indigo-500' : 'border-slate-200 text-slate-900 focus:border-indigo-500'}`} placeholder="Book Name?" />
                  </div>
                  <textarea {...register("message")} required rows="3" className={`w-full rounded-2xl p-5 outline-none font-bold text-sm transition-all border ${isDark ? 'bg-white/5 border-white/5 text-white focus:border-indigo-500/50' : 'bg-slate-50 border-transparent text-slate-900 focus:ring-1 ring-indigo-500/20'}`} placeholder="What's the vibe?" />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Rating</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FaStar key={s} onClick={() => setRating(s)} className={`text-2xl cursor-pointer transition-all ${s <= (hover || rating) ? 'text-yellow-400' : 'text-slate-300'}`} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} />
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-indigo-700 transition-all active:scale-95">
                    {loading ? 'Engraving...' : 'Post Entry'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
                <div className="relative inline-block">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mx-auto">
                    <span className="text-green-500 text-3xl">✓</span>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>"Your words meant a lot! 🥂"</h2>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto">Har view ek nayi kahani hai. Shukriya humari duniya ka hissa banne ke liye.</p>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`p-5 rounded-[2rem] border italic ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  <p className="text-[11px] leading-relaxed">
                    "आपकी राय, हमारी पहचान...,<br/>
                    धन्यवाद् इस सफर को ख़ास बनाने के लिए.".<br/>
                    <b className="text-indigo-500">Your Voice Matters</b>
                  </p>
                </motion.div>

                <div className="w-32 h-[1px] bg-slate-200 dark:bg-white/10 mx-auto overflow-hidden">
                  <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 bg-indigo-500" />
                </div>
                <p className="text-[8px] text-slate-400 uppercase tracking-widest font-black">Redirecting to Home</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;