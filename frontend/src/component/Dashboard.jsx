import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import Navbar from "./Navbar";
import Footer from "./Footers"; 
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from "react-router-dom";

// --- ASTEROIDS ENGINE ---
const AsteroidRain = () => {
  const stones = useMemo(() => [...Array(20)].map((_, i) => i), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stones.map((s) => (
        <motion.div
          key={s}
          initial={{ x: Math.random() * 800, y: -20, opacity: 0 }}
          animate={{ x: [null, Math.random() * 500], y: [null, 600], opacity: [0, 0.7, 0] }}
          transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-[1px] shadow-[0_0_10px_#10b981]"
        />
      ))}
    </div>
  );
};

const SolarSystem = () => (
  <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] flex items-center justify-center scale-90 mt-10 z-10">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute w-20 h-20 z-30 bg-yellow-500 rounded-full shadow-[0_0_100px_#10b981] border-[6px] border-red-400/50 flex items-center justify-center"
    >
       <div className="w-10 h-10 bg-white opacity-20 rounded-full blur-xl animate-pulse"></div>
    </motion.div>
    <div className="absolute w-full h-full border-[3px] border-slate-900 dark:border-emerald-500/40 rounded-full">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="relative w-full h-full">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full shadow-[0_0_30px_#10b981] border-4 border-white/20"></div>
      </motion.div>
    </div>
    <div className="absolute w-[72%] h-[72%] border-[3px] border-slate-900 dark:border-blue-500/40 rounded-full">
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="relative w-full h-full">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_25px_#3b82f6] border-4 border-white/20"></div>
      </motion.div>
    </div>
  </div>
);

function Dashboard() {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState('english');

  useEffect(() => {
    const stages = ['english', 'hindi', 'sanskrit'];
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % stages.length;
      setStage(stages[currentIndex]);
    }, 5000);

    const fetchMyBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4001/user/mybooks/${authUser?._id}`);
        setPurchasedBooks(Array.isArray(res.data) ? res.data : []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    
    if (authUser?._id) fetchMyBooks();
    return () => clearInterval(interval);
  }, [authUser]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      <Navbar />
      
      <div className="flex-grow max-w-7xl mx-auto px-6 pt-24 w-full relative z-10">
        
        <div className="w-full flex justify-center mb-0"> 
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="flex items-center gap-3 text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
              <span className="text-slate-900 dark:text-red-500 underline decoration-4 underline-offset-8">Your</span>
              <span className="text-blue-500 dark:text-cyan-700 underline decoration-4 underline-offset-8">Library</span>
            </h1>
            <div className="mt-2 px-4 py-0.5 border border-emerald-500/20 bg-emerald-500/5 rounded-full">
              <span className="text-[20px] font-black  text-yellow-600 ">॥ तव-ग्रन्थागार: ॥</span>
            </div>
          </motion.div>
        </div>

        <header className="relative mt-0 pt-0 flex flex-col lg:flex-row items-center justify-between gap-2 border-b border-slate-200 dark:border-white/5 pb-16">
          <AsteroidRain />
          <div className="flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1 relative z-10">
            
            <div className="h-24 md:h-36 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                {stage === 'english' && (
                  <motion.h1 key="eng" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.8 }} className="text-6xl md:text-9xl font-black tracking-tighter leading-none uppercase">
                    THE <span className="text-emerald-500 italic">CODEX</span>
                  </motion.h1>
                )}
                {stage === 'hindi' && (
                  <motion.h1 key="hindi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="text-5xl md:text-8xl font-bold leading-none text-emerald-500">
                    ज्ञान <span className="text-gray-500 italic">संहिता</span>
                  </motion.h1>
                )}
                {stage === 'sanskrit' && (
                  <motion.h1 key="sans" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }} className="text-5xl md:text-8xl font-bold leading-none text-emerald-500 font-serif">
                    ग्रन्थ -<span className="text-gray-500 italic">आगर:</span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            <div className="border-l-4 border-emerald-500/40 pl-6">
              <TypeAnimation
                sequence={[
                  'Scanning the corridors of the Infinite Library...', 2500,
                  'Unlocking the vaults of ancient and modern wisdom...', 2500,
                  'Knowledge is the only wealth that grows when shared...', 2500,
                  'Your library is a map to the universe within you...', 2500,
                  'Building the ultimate sanctuary for the curious mind...', 2500,
                  'Where every page is a portal to a new dimension...', 2500,
                ]}
                wrapper="span" speed={65} style={{ fontSize: '1.1rem', fontWeight: '800', color: '#64748b' }} repeat={Infinity}
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                <b>Welcome,</b> {authUser?.fullname || ""}! Here lies your exclusive collection.
              </p>

              <div className="p-6 border-l-2 border-emerald-500/30 bg-emerald-500/5 rounded-r-2xl max-w-xl mx-auto lg:mx-0">
                <h3 className="text-emerald-500 font-bold mb-2 tracking-wide text-xs">॥ मिथक नववर्ष : एक कवि का सवाल ॥</h3>
                <div className="text-sm italic font-serif text-slate-600 dark:text-slate-300 leading-relaxed space-y-1">
                  <div className="space-y-3 text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
  <p>आज राम, अभी राम, कल राम, कभी राम,</p>
  <p>संकट में जब घिरूँ, तो रक्षक सदा तभी राम।</p>
  <p>आकाश राम, पाताल राम, ठिठुरन राम, जली राम,</p>
  <p>वृक्ष राम, तना राम, वन की सघन गली राम।</p>
  <p>आदि राम, अनंत राम, पल-पल और अतीत राम,</p>
  <p className="text-pink-600 dark:text-pink-500 font-bold text-lg mt-2">
    <b>सृष्टि के कण-कण में, पुरुषोत्तम के में संगीत राम।</b>
  </p>
</div>
                  
                  <div className="mt-6 flex items-center gap-4">
                    <motion.a 
                      href="https://www.instagram.com/bhatta_harsh" target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white px-4 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-pink-500/20"
                    >
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      More Poetry
                    </motion.a>
                    <p className="text-[15px] font-black text-slate-400 tracking-tighter">@bhatta_harsh <span className="text-emerald-500 ml-1">Verified_Access</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 order-1 lg:order-2 relative z-10"><SolarSystem /></div>
        </header>

        {/* --- SEARCH & GRID --- */}
        <div className="mt-12 mb-20 max-w-xl mx-auto lg:mx-0">
          <input type="text" placeholder="SEARCH YOUR BOOKS..." className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-12 py-5 outline-none focus:ring-4 ring-emerald-500/10 transition-all font-bold text-sm tracking-wide shadow-sm" onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        {loading ? (
          <div className="py-24 flex justify-center"><div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-40">
            {purchasedBooks.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map((book) => (
              <motion.div key={book?._id} whileHover={{ y: -15 }} className="group relative cursor-pointer">
                <div className="relative h-[450px] w-full rounded-[70px] overflow-hidden shadow-2xl transition-all duration-700 border border-white/5">
                  <img src={book?.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                      <button onClick={() => window.open(book?.pdfUrl, "_blank")} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all shadow-xl">Initialize</button>
                  </div>
                </div>
                <div className="mt-8 text-center"><h2 className="text-xl font-black uppercase tracking-tighter group-hover:text-emerald-500 transition-colors italic truncate px-4">{book?.name}</h2></div>
              </motion.div>
            ))}
            <motion.div whileHover={{ y: -15, scale: 1.02 }} onClick={() => navigate("/course")} className="group relative cursor-pointer">
              <div className="relative h-[450px] w-full rounded-[70px] border-4 border-dashed border-emerald-500/20 group-hover:border-emerald-500 transition-all duration-500 flex flex-col items-center justify-center p-8 bg-emerald-500/5 overflow-hidden shadow-xl">
                <div className="w-24 h-24 rounded-full border-2 border-emerald-500/50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-all duration-500 group-hover:shadow-[0_0_50px_#10b981]"><span className="text-5xl font-light text-emerald-500 group-hover:text-white">+</span></div>
                <div className="text-center space-y-4 relative z-10"><p className="text-xl font-black uppercase italic leading-tight group-hover:scale-110 transition-transform">Access more Books</p></div>
              </div>
              <div className="mt-8 text-center"><h2 className="text-xl font-black uppercase tracking-tighter opacity-30 group-hover:opacity-100 group-hover:text-emerald-500 transition-all italic">Explore Library</h2></div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
