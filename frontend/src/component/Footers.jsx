import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const Footers = () => {
  return (
   
    <div className="mt-0">    
      <footer className="footer py-8 px-4 md:px-10 bg-base-200 text-base-content dark:bg-slate-900 dark:text-slate-300 transition-colors duration-500 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* LEFT SECTION */}
        <aside className="flex flex-col items-center md:items-start text-center md:text-left">
          <svg width="45" height="45" viewBox="0 0 24 24" className="fill-pink-600">
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold mt-2">
            Book Store Pvt. Ltd.
            <br />
            <span className="font-normal opacity-80 text-sm">Providing wisdom at your doorstep since 2025.</span>
          </p>
        </aside>

        <nav className="flex flex-col items-center w-full md:w-auto">
          <h6 className="footer-title text-pink-600 opacity-100 font-bold mb-4 uppercase text-sm">Connect With Us</h6>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-4 rounded-2xl border border-slate-700/50 shadow-sm w-full sm:w-auto">
            <div className="flex gap-6 sm:gap-4 border-b sm:border-b-0 sm:border-r border-slate-700 pb-4 sm:pb-0 sm:pr-4">
              <a href="https://www.instagram.com/bhatta_harsh" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="https://www.linkedin.com/in/harsh-bhatta-915ab5349/" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="mailto:harshbhatta5@gmail.com" className="hover:text-red-500 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
            </div>
            <div className="min-w-150px] text-[12px] font-medium text-slate-400 italic text-center sm:text-left">
              <Typewriter 
  words={[
    "Explore the world of stories.",  
    "Join the community of bibliophiles.", 
    "Books are a dream you hold in your hand."
  ]} 
  loop={0} 
  cursor 
  cursorStyle="|" 
  typeSpeed={70} 
  deleteSpeed={50} 
  delaySpeed={1500} 
/>
            </div>
          </div>
        </nav>

        {/* RIGHT SECTION */}
        <nav className="flex flex-col items-center md:items-end text-center md:text-right">
          <h6 className="footer-title text-pink-600 opacity-100 font-bold uppercase text-sm mb-2">Our vision</h6>
          <p className="max-w-xs md:max-w-md text-sm italic">"Har panna ek nayi shuruat hai. Hum sirf kitabein nahi, tajurbe ghar pahunchate hain"</p>
          <p className="text-[10px] opacity-50 mt-1"><b>Available 24/7</b></p>
        </nav>
      </footer>
    </div>
  )
}

export default Footers;