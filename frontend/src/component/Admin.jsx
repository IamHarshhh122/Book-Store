import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Plus, Flower2, Database, Cpu, Code2, Box, Star, Calendar, Clock, Shield, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openUserId, setOpenUserId] = useState(null);
  const [text, setText] = useState("");
  
  const mantra = "ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा। यः स्मरेत् पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः॥";

  // Mantra Typing Effect
  useEffect(() => {
    let i = 0;
    let isWaiting = false; 

    const interval = setInterval(() => {
      if (!isWaiting) {
        setText(mantra.slice(0, i));
        i++;

        if (i > mantra.length) {
          isWaiting = true; 
          setTimeout(() => {
            i = 0; 
            isWaiting = false; 
          }, 3000);
        }
      }
    }, 100); 

    return () => clearInterval(interval);
  }, []);

  // Fetch Users API Call
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://bobook-store-backend.onrender.com";
        const res = await axios.get(`${BACKEND_URL}/user/admin-all-users`);
        
        if (res.data) {
          setUsers(res.data);
        }
      } catch (err) { 
        console.error("Fetch Error:", err); 
        toast.error("Failed to fetch user records!", { id: "admin-fetch-err" });
      } finally { 
        setLoading(false); 
      }
    };
    fetchAdmins();
  }, []);

  if (loading) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <Flower2 className="text-pink-500 animate-spin-slow mb-4" size={50} />
      <p className="text-slate-900 font-black tracking-[0.5em] animate-pulse uppercase">Accessing Master Records</p>
    </div>
  );

  return (
    <div className="min-h-screen text-slate-900 font-sans overflow-x-hidden relative pb-40">
      
      {/* LEFT ANIMATED YANTRA DECORATION */}
      <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-0 hidden xl:block pointer-events-none">
        <div className="relative w-[500px] h-[500px] flex items-center justify-center opacity-60">
          <div className="absolute inset-0 border-[12px] border-yellow-600 rounded-full animate-spin-slow shadow-[0_0_50px_rgba(190,24,93,0.2)]"></div>
          <div className="absolute w-[350px] h-[350px] border-[8px] border-pink-600 rounded-full flex items-center justify-center">
            <div className="flex items-center gap-1 opacity-60">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 bg-blue-600 rounded-full animate-wave" style={{ animationDelay: `${i * 0.1}s`, height: '40px' }}></div>
              ))}
            </div>
          </div>
          <div className="absolute w-[200px] h-[200px] border-[4px] border-slate-900/10 rounded-full animate-reverse-spin flex items-center justify-center">
            <Database className="text-pink-600 absolute -top-4" size={32} />
            <Cpu className="text-purple-700 absolute -bottom-4" size={32} />
            <Code2 className="text-blue-600 absolute -left-4" size={32} />
            <Box className="text-orange-600 absolute -right-4" size={32} />
          </div>
        </div>
      </div>

      {/* RIGHT 3D TECH CUBE */}
      <div className="absolute right-32 top-1/2 -translate-y-1/2 hidden lg:block perspective-1000 z-0 pointer-events-none">
        <div className="w-32 h-32 relative preserve-3d animate-cube-rotate">
          <div className="absolute inset-0 bg-gray-600 border-4 border-cyan-500 flex items-center justify-center translate-z-16 shadow-lg text-cyan-600 font-black text-sm italic">REACT</div>
          <div className="absolute inset-0 bg-slate-900 border-4 border-pink-500 flex items-center justify-center rotate-y-180 translate-z-16 shadow-lg text-pink-500 font-black text-sm italic">MERN</div>
          <div className="absolute inset-0 bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center rotate-y-90 translate-z-16 shadow-lg text-yellow-900 font-black text-sm italic">JS</div>
          <div className="absolute inset-0 bg-sky-400 border-4 border-sky-600 flex items-center justify-center -rotate-y-90 translate-z-16 shadow-lg text-white font-black text-[10px] italic">TAILWIND</div>
          <div className="absolute inset-0 bg-orange-500 border-4 border-orange-700 flex items-center justify-center rotate-x-90 translate-z-16 shadow-lg text-white font-black text-sm italic">HTML</div>
          <div className="absolute inset-0 bg-purple-600 border-4 border-purple-900 flex items-center justify-center -rotate-x-90 translate-z-16 shadow-lg text-white font-black text-sm italic">NODE</div>
        </div>
      </div>

      <main className="relative z-10 max-w-xl mx-auto pt-10 px-6">
        
        {/* MANTRA TYPING BANNER */}
        <div className="text-center mb-6 mt-16 min-h-[50px] px-4 relative z-20">
          <p className="text-red-700 font-black text-lg leading-relaxed bg-white/60 backdrop-blur-sm py-2 rounded-full inline-block px-10 shadow-md border border-red-200">
            {text}<span className="w-1 h-5 bg-red-600 inline-block ml-1 animate-pulse align-middle"></span>
          </p>
        </div>

        <header className="flex flex-col items-center mb-12">
          <h1 className="text-7xl font-black italic tracking-tighter text-slate-400 leading-none">USERS</h1>
          <h1 className="text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 leading-none mt-[-5px]">REVIEWS</h1>
        </header>

        {/* USER CARDS LIST */}
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={user._id || index} className={`group rounded-[2.5rem] border-2 transition-all duration-500 ${
                  openUserId === user._id ? 'bg-slate-950 border-pink-900 shadow-2xl scale-[1.02]' : 'bg-gray-600 border-slate-200 shadow-sm hover:border-slate-400'
                }`}>
                
                <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setOpenUserId(openUserId === user._id ? null : user._id)}>
                  <div className="flex items-center gap-5">
                    <span className={`text-2xl font-black italic ${openUserId === user._id ? 'text-pink-500' : 'text-slate-300'}`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={`text-base font-black uppercase italic tracking-tight ${openUserId === user._id ? 'text-white' : 'text-slate-800'}`}>
                        {user.fullname || user.name || "Anonymous User"}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div className={`p-2.5 rounded-xl transition-all duration-500 ${openUserId === user._id ? 'bg-pink-500 text-white rotate-90' : 'bg-slate-900 text-slate-400'}`}>
                      {openUserId === user._id ? <Activity size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {openUserId === user._id && (
                  <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-cyan-400" />
                          <span className="text-white text-[9px] font-black uppercase tracking-wider">Last Entry</span>
                        </div>
                        <span className="text-slate-400 text-[10px] font-bold">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Initial Sync"}
                        </span>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Activity size={12} className="text-rose-400" />
                          <span className="text-white text-[9px] font-black uppercase tracking-wider">Last Exit</span>
                        </div>
                        <span className="text-slate-400 text-[10px] font-bold">
                          {user.lastLogout ? new Date(user.lastLogout).toLocaleString() : "Active Now"}
                        </span>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                        <Shield size={12} className="text-green-400" />
                        <span className="text-white text-[10px] font-bold tracking-widest uppercase">Verified Member</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                        <Calendar size={12} className="text-blue-400" />
                        <span className="text-white text-[10px] font-bold">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] pl-1 italic">Reader Chronicles</p>
                      {user.reviews && user.reviews.length > 0 ? (
                        user.reviews.map((rev, i) => (
                          <div key={`rev-${i}`} className="bg-white/5 rounded-2xl border border-white/5 p-4 border-l-2 border-l-orange-500 mb-2">
                             <div className="flex justify-between items-start">
                              <span className="text-xs font-black text-white uppercase italic">{rev.bookName || "Archive Item"}</span>
                              <div className="flex text-orange-400">
                                 {[...Array(5)].map((_, starI) => (
                                   <Star key={starI} size={10} fill={starI < rev.rating ? "currentColor" : "none"} />
                                 ))}
                              </div>
                             </div>
                             <p className="text-[11px] text-slate-300 italic mt-2">"{rev.message}"</p>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 border border-dashed border-white/10 rounded-2xl text-center text-white/20 text-[10px] uppercase">No logs found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 font-bold">No user records found in database.</div>
          )}
        </div>
      </main>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .translate-z-16 { transform: translateZ(64px); }
        .rotate-y-180 { transform: rotateY(180deg) translateZ(64px); }
        .rotate-y-90 { transform: rotateY(90deg) translateZ(64px); }
        .-rotate-y-90 { transform: rotateY(-90deg) translateZ(64px); }
        .rotate-x-90 { transform: rotateX(90deg) translateZ(64px); }
        .-rotate-x-90 { transform: rotateX(-90deg) translateZ(64px); }

        @keyframes cube-rotate { 0% { transform: rotateX(0deg) rotateY(0deg); } 100% { transform: rotateX(360deg) rotateY(360deg); } }
        .animate-cube-rotate { animation: cube-rotate 12s linear infinite; }
        
        @keyframes wave { 0%, 100% { height: 10px; } 50% { height: 60px; } }
        .animate-wave { animation: wave 1.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-reverse-spin { animation: spin 10s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
