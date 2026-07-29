import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import PaymentModal from './PaymentModal.jsx'; 
import Card from './Card.jsx'; 
import { useAuth } from "../context/AuthProvider";
import CourseAI from './CourseAI.jsx';

function Course() {
  const { authUser } = useAuth();
  const [books, setBooks] = useState([]);
  const [paidBooks, setPaidBooks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        // Direct Render Backend API Call - No local API file dependency
        const res = await axios.get('https://bobook-store-backend.onrender.com/books');
        
        const rawData = Array.isArray(res.data) ? res.data : [];
        setBooks(rawData);
        
        const filteredPaid = rawData.filter((data) => {
          if (!data.category) return true; 
          return data.category.trim().toLowerCase() !== "free";
        });
        
        setPaidBooks(filteredPaid);
      } catch (error) {
        console.error("Error fetching books from repository:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const displayedLocalBooks = showAll ? paidBooks : paidBooks.slice(0, 4);

  const handleAcquire = (book) => {
    if (book.isAiGenerated) {
      window.open(book.amazonUrl, "_blank");
    } else {
      setSelectedBook(book);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full min-h-screen font-['Poppins'] transition-colors duration-500 overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 pt-24 pb-0 flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="w-full md:w-3/5 z-10 mt-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-600 mb-6 leading-tight drop-shadow-sm">
              विद्या ददाति विनयं, विनयाद् याति पात्रताम्।<br />
              <span className="text-2xl md:text-4xl opacity-90 text-slate-700 dark:text-slate-300">पात्रत्वात् धनमाप्नोति, धनात् धर्मं ततः सुखम्॥</span>
            </h1>

            <div className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 italic mb-8 h-12 border-l-4 border-amber-500 pl-4">
              <Typewriter words={['Knowledge gives humility, humility gives worthiness.', 'परम्परा और आधुनिकता का अद्भुत संगम।']} loop={0} cursor cursorStyle='|' typeSpeed={50} deleteSpeed={30} delaySpeed={2000} />
            </div>
            
            <div className="p-8 md:p-10 rounded-[2.5rem] border-2 shadow-xl relative overflow-hidden transition-all duration-500 bg-slate-50 dark:bg-slate-900/50 border-amber-100 dark:border-amber-900/30 shadow-slate-200 dark:shadow-none">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-amber-600"></span>
                <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600">The Core Purpose</h2>
              </div>
              <h3 className="text-2xl md:text-4xl font-serif font-black mb-6 leading-tight italic text-slate-900 dark:text-amber-400">
                "जब नाश मनुज पर छाता है, पहले <span className="text-red-600 dark:text-red-500 underline decoration-amber-500 underline-offset-4">विवेक</span> मर जाता है।"
              </h3>
              <p className="text-base md:text-lg leading-relaxed font-medium text-slate-600 dark:text-slate-300">
                Isliye humne in special <span className="text-amber-600 font-bold">libraries</span> ka collection kiya hai...
              </p>
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative min-h-[520px]">
          <div className="relative flex items-center justify-center scale-90 md:scale-100 -mt-24">
            <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-amber-500/20 dark:bg-amber-500/10 rounded-full blur-[100px]"></div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="w-72 h-72 md:w-[400px] md:h-[400px]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 opacity-60 dark:opacity-40">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {[...Array(36)].map((_, i) => (
                  <line key={i} x1="50" y1="15" x2="50" y2="2" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 10} 50 50)`} />
                ))}
              </svg>
            </motion.div>
            <div className="absolute z-20 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-600 shadow-2xl bg-white dark:bg-slate-800">
              <img src="https://imgs.search.brave.com/GXDlwNgAJYijZJfXni16rRbbATsyxhN2gpzN2FBURB0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQyLzE5/Lzc0LzQyMTk3NGY1/MDA4YjFhZmMwZTI0/OThjOTdmOWQ4YjNi/LmpwZw" alt="Dinkar Ji" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </div>

      <CourseAI paidBooks={paidBooks} handleAcquire={handleAcquire} />

      {/* GOLDEN COLLECTION GRID */}
      <div className='max-w-screen-2xl mx-auto px-6 md:px-20 mt-16 pb-20'>
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-amber-600">
            Golden Collection
          </h2>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-amber-600 to-transparent"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-amber-600 font-bold animate-pulse tracking-widest">
            SHASTRA LOADING...
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <AnimatePresence mode="popLayout">
                {displayedLocalBooks.map((item, index) => (
                  <motion.div
                    key={item._id || item.id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Card item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination- Define to extend the page mtlb ek page bahut bada h to uske kuch elemnt dikhana ya chupana */}
            {paidBooks.length > 4 && (
              <div className="flex justify-center mt-16">
                <button 
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-3 px-10 py-4 rounded-full border-2 border-amber-600 text-amber-600 font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-600 hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(217,119,6,0.2)] hover:shadow-[0_0_30px_rgba(217,119,6,0.4)] active:scale-95 bg-transparent"
                >
                  {showAll ? (
                    <><span className="text-xl">—</span> Show Less</>
                  ) : (
                    <><span className="text-xl">+</span> Show More</>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedBook && (
        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBook(null);
          }} 
          bookId={selectedBook._id || selectedBook.id} 
          bookName={selectedBook.name} 
          bookPrice={selectedBook.price} 
          onProgressComplete={() => { 
            setIsModalOpen(false); 
            if(selectedBook.pdfUrl) window.open(selectedBook.pdfUrl, "_blank"); 
            setSelectedBook(null);
          }} 
        />
      )}
    </div>
  );
}

export default Course;
