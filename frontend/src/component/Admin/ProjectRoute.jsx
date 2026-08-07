import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthProvider"; 
import 'sweetalert2/dist/sweetalert2.min.css';

const ProjectRoute = ({ children }) => {
  const { authUser } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(sessionStorage.getItem("isAdmin") === "true");
  const [loading, setLoading] = useState(true);

  const allowedEmail = (import.meta.env.VITE_ADMIN_EMAIL || "harshbhatta5@gmail.com").toLowerCase().trim();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "harsh@7140";

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }
    const currentEmail = (authUser?.email || "").toLowerCase().trim();

    if (currentEmail !== allowedEmail) {
      toast.error("Access Denied: Restricted Zone Onlt Admin can entre in this gate !", { 
        id: "no-boss",
        style: { 
          borderRadius: '12px', 
          background: '#020617', 
          color: '#ef4444', 
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontWeight: 'bold',
          fontSize: '13px'
        }
      });
      setLoading(false);
      return;
    }

    if (!isAuthorized) {
      if (Swal.isVisible()) return;

      Swal.fire({
        title: "Required Verification ",
        text: "The mainframe requires your secret key to proceed...",
        input: "password",
        inputAttributes: {
          placeholder: "Type secret code...",
          autocapitalize: "off",
          autocorrect: "off"
        },
        confirmButtonText: "Unlock Codex",
        confirmButtonColor: "#10b981",
        background: "#020617",
        color: "#ffffff",
        backdrop: `rgba(2, 6, 23, 0.9) backdrop-filter blur(15px)`,
        allowOutsideClick: false,
        customClass: {
          popup: 'border border-emerald-500/40 rounded-[2.5rem] shadow-[0_0_60px_rgba(16,185,129,0.2)] p-8',
          title: 'font-black uppercase tracking-tight text-xl text-emerald-400',
          input: 'bg-white/5 border border-white/10 rounded-xl text-white px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm mt-3 tracking-widest text-center',
          confirmButton: 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black uppercase text-xs tracking-widest px-6 py-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all mt-5 w-full'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value === adminPassword) {
            sessionStorage.setItem("isAdmin", "true");
            setIsAuthorized(true);

            toast.dismiss();
            setTimeout(() => {
              toast("Systems Online. Welcome back, Admin!", {
                duration: 4000,
                style: { 
                  borderRadius: '12px', 
                  background: '#020617', 
                  color: '#10b981', 
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  fontWeight: 'bold',
                  fontSize: '13px'
                },
              });
            }, 400);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Breach Detected!',
              text: 'Wrong key! Intruder alert activated !!',
              background: '#020617',
              color: '#ffffff',
              confirmButtonText: 'Try Again',
              customClass: {
                popup: 'border border-red-500/40 rounded-[2.5rem] p-8 shadow-2xl',
                title: 'font-black uppercase tracking-tight text-lg text-red-500',
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-black uppercase text-xs tracking-widest px-6 py-3.5 rounded-xl mt-5 w-full shadow-[0_0_20px_rgba(239,68,68,0.4)]'
              },
              buttonsStyling: false
            });
            setIsAuthorized(false);
          }
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [authUser, isAuthorized, allowedEmail, adminPassword]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentEmail = (authUser?.email || "").toLowerCase().trim();
  return (currentEmail === allowedEmail && isAuthorized) ? children : <Navigate to="/" replace />;
};

export default ProjectRoute;
