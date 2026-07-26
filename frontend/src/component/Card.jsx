import React, { useState } from 'react'
import PaymentModal from './PaymentModal';

const Card = ({item}) => {
  console.log("Open this Object:", item);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (e) => {
    e.stopPropagation(); 
    if (item.category === "Free") {
      if (item.pdfUrl) {
        window.open(item.pdfUrl, "_blank");
      } else {
        alert("Sorry, PDF URL not available.");
      }
    } else {
      setIsModalOpen(true);
    }
  }


  return (
    <div className="py-6 px-4 md:px-2"> 
      <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl duration-500 transition-all flex flex-col h-[450px] md:h-[400px] w-full">
        <figure className="relative h-64 md:h-56 overflow-hidden shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              item.category === "Free" ? "bg-emerald-500 text-white" : "bg-pink-600 text-white"
            }`}>
              {item.category}
            </span>
          </div>
        </figure>

        <div className="p-6 md:p-5 flex flex-col justify-between flex-grow text-left">
          <div>
            <h2 className="text-xl md:text-lg font-black text-slate-900 dark:text-white leading-tight line-clamp-1">
              {item.name}
            </h2>
            <p className="text-xs md:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 italic">
              {item.title || "Explore the depths of wisdom and knowledge."}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Price</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {item.price === 0 ? "FREE" : `₹${item.price}`}
              </span>
            </div>
            <button onClick={handleAction} className="px-8 py-3 md:px-6 md:py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-xs md:text-[10px] font-black uppercase tracking-tighter hover:bg-pink-600 hover:text-white transition-all duration-300 active:scale-95" >
              {item.category === "Free" ? "Read Now" : "Unlock"}
            </button>
          </div>
        </div>
      </div>

    
{isModalOpen && (
  <PaymentModal 
    key={item?._id || item?.id || "temp-key"} 
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)} 
    bookId={item?._id || item?.id || (item?.id ? item.id : undefined)} 
    bookName={item?.name}
    bookPrice={item?.price}
    onProgressComplete={() => {
      setIsModalOpen(false);
      if(item.pdfUrl) window.open(item.pdfUrl, "_blank");
    }}
  />
)}
    </div>
  )
}

export default Card;
