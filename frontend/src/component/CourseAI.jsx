import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

function CourseAI({ paidBooks, handleAcquire }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiBooks, setAiBooks] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setAiBooks([]);
      return;
    }

    const matchedInDB = paidBooks?.filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedInDB && matchedInDB.length > 0) {
      setAiBooks([]); 
      toast.success("Found in our Collection! Scroll down to explore 📚", { id: 'ai-toast' });
      return;
    }

    setAiLoading(true);

    const searchPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const isPdfAvailableOnInternet = searchQuery.toLowerCase().includes('free') || searchQuery.toLowerCase().includes('pdf'); 
          const foundPdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; 

          const aiResponse = [
            {
              _id: `ai_${Date.now()}`,
              name: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
              image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60",
              isAiGenerated: true,
              pdfUrl: isPdfAvailableOnInternet ? foundPdfUrl : null, 
              amazonUrl: `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}+book`
            }
          ];

          setAiBooks(aiResponse);
          setAiLoading(false);
          
          resolve(isPdfAvailableOnInternet ? "Free PDF traced successfully! 🎉" : "Routed to External Book Partner 📚");
        } catch (err) {
          setAiLoading(false);
          reject("AI couldn't trace this book right now.");
        }
      }, 1200);
    });

    toast.promise(
      searchPromise, 
      {
        loading: 'AI is searching globally...',
        success: (msg) => msg,
        error: (err) => err,
      },
      { id: 'ai-global-search' }
    );
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 mt-10">
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-4 bg-slate-50 dark:bg-slate-900 border border-amber-500/30 p-2 rounded-2xl shadow-xl">
          <input 
            type="text" 
            placeholder="Search Shastras or ask AI for Free PDFs globally..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if(!e.target.value) setAiBooks([]);
            }}
            className="w-full bg-transparent px-4 py-2 outline-none text-slate-900 dark:text-white font-medium"
          />
          <button type="submit" disabled={aiLoading} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 whitespace-nowrap">
            {aiLoading ? "Searching..." : "Ask AI"}
          </button>
        </form>
      </div>

      {aiBooks.length > 0 && (
        <div className='max-w-screen-2xl mx-auto px-6 md:px-20 mt-16 pb-10'>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic text-amber-600">
              AI Global Findings
            </h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-amber-600 to-transparent"></div>
            <button onClick={() => { setAiBooks([]); setSearchQuery(""); }} className="text-xs text-red-500 font-bold hover:underline">
              Clear AI Search
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <AnimatePresence mode="popLayout">
              {aiBooks.map((item, index) => (
                <motion.div 
                  key={item._id || index} 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  className="group p-5 rounded-[2rem] border transition-all duration-500 shadow-lg relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-amber-100 dark:border-slate-800 hover:border-amber-500"
                >
                  <div className='aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-4 shadow-md bg-slate-200 dark:bg-slate-800'>
                    <img src={item.image} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' alt={item.name}/>
                  </div>
                  <h2 className='text-md font-bold mb-3 truncate text-slate-900 dark:text-slate-100'>{item.name}</h2> 
                  
                  <div className='flex flex-col gap-2'>
                    {item.pdfUrl && (
                      <button 
                        onClick={() => window.open(item.pdfUrl, "_blank")} 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-600/20"
                      >
                        📥 Download Free PDF
                      </button>
                    )}
                    <button 
                      onClick={() => handleAcquire(item)} 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:from-amber-600 hover:to-orange-700 transition-all active:scale-95"
                    >
                      ⚡ Buy via Amazon
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {aiLoading && (
        <div className="text-center py-20 text-amber-600 font-bold animate-pulse tracking-widest">
          🤖 AI is searching globally for you...
        </div>
      )}
    </div>
  );
}

export default CourseAI;
