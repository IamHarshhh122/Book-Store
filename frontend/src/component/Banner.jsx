import React from "react";
import banner from "/banners.png";
import { TypeAnimation } from "react-type-animation";

function Banner() {
  const elements = [
    { id: 1, angle: 0,   name: "Prithvi (Earth)",   book: "The Hidden Life of Trees", color: "bg-emerald-600", shadow: "shadow-emerald-500/40" },
    { id: 2, angle: 72,  name: "Jal (Water)",       book: "The Shape of Water",       color: "bg-blue-600",   shadow: "shadow-blue-500/40" },
    { id: 3, angle: 144, name: "Agni (Fire)",       book: "Atomic Habits",             color: "bg-orange-600", shadow: "shadow-orange-500/40" },
    { id: 4, angle: 216, name: "Vayu (Air)",        book: "The Power of Now",          color: "bg-sky-500",    shadow: "shadow-sky-400/40" },
    { id: 5, angle: 288, name: "Aakash (Space)",    book: "History of Time",           color: "bg-indigo-700", shadow: "shadow-indigo-500/40" },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 z-10 overflow-visible mb-0 pb-0">
      {/* Seamless Dot Pattern */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-20 max-w-screen-2xl mx-auto px-6 md:px-20 pt-28 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <div className="border-l-4 border-red-900 pl-5">
            <h1 className="text-3xl md:text-5xl font-serif font-black italic text-slate-900 dark:text-slate-100">
             विद्या ददाति विनयं, विनयाद्याति पात्रताम् ।
            </h1>
            <h2 className="text-xl md:text-3xl font-serif font-bold italic text-slate-800 dark:text-slate-400 mt-2">
              पात्रत्वाद्धनमाप्नोति, धनाद्धर्मं ततः सुखम् ॥
            </h2>
          </div>

          <TypeAnimation
            sequence={[
              'अर्थ: "विद्या विनम्रता देती है"', 2000,
              'Meaning: "Knowledge grants humility"', 2000,
            ]}
            repeat={Infinity}
            className="block text-sm md:text-lg font-bold italic text-red-900 dark:text-red-700"
          />

          <h1 className="text-4xl md:text-7xl font-black text-slate-800 dark:text-white leading-tight">
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-700 to-slate-900">
              Inner Bibliophile
            </span>{" "}
            📖
          </h1>
        </div>

        <div className="relative w-full md:w-1/2 h-[500px] md:h-[650px] flex items-center justify-center mt-12 md:mt-0">
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-dashed border-red-900/20 dark:border-white/10 rounded-full"></div>

          <div className="relative z-40 bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-2xl animate-pulse-slow border-2 border-red-900/30">
            <img src={banner} alt="banner" className="w-32 md:w-48 rounded-xl" />
          </div>

          {elements.map((el) => (
            <div
              key={el.id}
              className="absolute w-full h-full flex items-center justify-center animate-orbit pointer-events-none"
              style={{ "--start-angle": `${el.angle}deg` }}
            >
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translateY(var(--orbit-radius))",
                }}
              >
                <div className="animate-counter-spin">
                  <div
                    className={`group pointer-events-auto relative w-12 h-16 md:w-16 md:h-20 
                                ${el.color} ${el.shadow} rounded-r-lg rounded-l-sm 
                                shadow-2xl flex items-center justify-center 
                                cursor-pointer hover:scale-110 transition z-50`}
                  >
                    <span className="text-xl md:text-2xl">📖</span>

                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 
                                    opacity-0 group-hover:opacity-100 
                                    transition-all duration-300 z-[9999]">
                      <div className="bg-black text-white text-xs px-4 py-2 rounded-xl shadow-2xl text-center whitespace-nowrap">
                        <p className="font-extrabold text-pink-500">{el.book}</p>
                        <p className="italic opacity-80 text-[10px]">{el.name}</p>
                      </div>
                      <div className="w-2 h-2 bg-black rotate-45 mx-auto -mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute inset-0 bg-red-900/20 dark:bg-red-950/40 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        :root { --orbit-radius: -150px; }
        @media (min-width: 768px) { :root { --orbit-radius: -225px; } }
        @keyframes orbit {
          from { transform: rotate(var(--start-angle)); }
          to { transform: rotate(calc(var(--start-angle) + 360deg)); }
        }
        @keyframes counter-spin {
          from { transform: rotate(calc(var(--start-angle) * -1)); }
          to { transform: rotate(calc((var(--start-angle) + 360deg) * -1)); }
        }
        @keyframes pulse-slow {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-orbit { animation: orbit 25s linear infinite; }
        .animate-counter-spin { animation: counter-spin 25s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default Banner;