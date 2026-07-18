import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom"; 
import Login from "../component/login";
import Logout from "../component/Logout";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const { authUser } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      element.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      element.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeChange = () => setTheme(theme === "light" ? "dark" : "light");

  const getNavClass = ({ isActive }) => 
    isActive 
      ? "text-gray-400 border-b-2 border-white pb-1 font-black transition-all" 
      : "hover:text-gray-400 transition-all font-semibold";

  const getDropdownBtnClass = (activeColor) => ({ isActive }) => 
    isActive 
      ? `flex items-center gap-2 px-3 py-2 ${activeColor} border border-white/20 text-white rounded-lg shadow-lg scale-105`
      : "flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-slate-800 border border-white/5 text-white rounded-lg transition-all duration-300 group";

  const navItems = (
    <>
      <li><NavLink to="/" className={getNavClass}>Home</NavLink></li>
      <li><NavLink to="/course" className={getNavClass}>Books</NavLink></li>
      <li><NavLink to="/contact" className={getNavClass}>Contact</NavLink></li>
     {authUser && (
      <li>
        <NavLink to="/dashboard" className={getNavClass}>
           Your Library
        </NavLink>
      </li>
    )}
    </>
  );

  return (
    <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${sticky 
        ? "shadow-2xl bg-slate-900/95 backdrop-blur-md py-2 border-b border-slate-800" 
        : "bg-slate-800 py-5" 
      }`}>
      
      <div className="navbar min-h-0 p-0 flex justify-between items-center text-white">
        <div className="navbar-start w-auto flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-slate-800 rounded-xl w-52 border border-white/10 text-white">
              {navItems}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <img src="/Bookstore-logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform" />
            <span className="text-xl md:text-3xl font-black tracking-tighter text-white">
              <span className="text-pink-600">book</span>Store
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-8 text-white font-medium">
            {navItems}
          </ul>
        </div>

        <div className="navbar-end w-auto flex items-center gap-3 md:gap-6">
          <button 
            onClick={handleThemeChange} 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90 text-xl"
          >
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-orange-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          {authUser ? (
            <div className="dropdown dropdown-end group relative py-2"> 
              <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-circle avatar border-2 border-slate-600 bg-slate-800 transition-transform active:scale-90 shadow-lg overflow-hidden"
              >
                <div className="w-10 rounded-full">
                  <img 
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${authUser.email}`} 
                    alt="avatar" 
                  />
                </div>
              </div>
              
              <ul tabIndex={0} className="absolute right-0 top-[110%] z-[100] p-1.5 shadow-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl w-60 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-out">
                <div className="px-3 py-2 border-b border-white/5 bg-white/5 mb-2 rounded-xl">
                  <p className="text-white font-black truncate text-[12px] uppercase">{authUser.fullname}</p>
                  <p className="text-slate-400 text-[9px] truncate">{authUser.email}</p>
                </div>
                
                <div className="space-y-1.5 px-1 pb-1">
                  

                  <li>
                    <NavLink to="/admin" className={getDropdownBtnClass("bg-purple-600")}>
                      <span className="text-sm">🛡️</span>
                      <span className="font-bold text-[10px] uppercase tracking-wider">Admin Panel</span>
                    </NavLink>
                  </li>
                </div>
                
                <div className="mt-1 pt-1 border-t border-white/5">
                  <Logout />
                </div>
              </ul>
            </div>
          ) : (
            <Login /> 
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;