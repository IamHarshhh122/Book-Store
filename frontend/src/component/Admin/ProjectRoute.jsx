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

  // Hardcoded fallback lagaya hai agar env load na ho raha ho
  const allowedEmail = (import.meta.env.VITE_ADMIN_EMAIL || "harshbhatta5@gmail.com").toLowerCase().trim();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "harsh@7140";

  useEffect(() => {
    // Debugging ke liye console lagaya hai, inspect karke console check karna bro
    console.log("Current LoggedIn User:", authUser);
    console.log("Target Admin Email:", allowedEmail);

    if (!authUser) {
      setLoading(false);
      return;
    }

    // Dono emails ko trim aur lowercase karke compare kar rahe hain safely
    const currentEmail = (authUser?.email || "").toLowerCase().trim();

    if (currentEmail !== allowedEmail) {
      toast.error("Access Denied! Only Boss Allowed 😎", { id: "no-boss" });
      setLoading(false);
      return;
    }

    if (!isAuthorized) {
      if (Swal.isVisible()) return;

      Swal.fire({
        title: "🛡️ Admin Access",
        text: "Identifying Boss... Enter Secret Key.",
        input: "password",
        confirmButtonColor: "#db2777",
        background: "#0f172a",
        color: "#f8fafc",
        backdrop: `rgba(15, 23, 42, 0.9) blur(10px)`,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value === adminPassword) {
            sessionStorage.setItem("isAdmin", "true");
            setIsAuthorized(true);

            toast.dismiss();
            setTimeout(() => {
              toast("Welcome Boss! I'm waiting for you. 👑", {
                duration: 5000,
                style: {
                  borderRadius: '15px',
                  background: '#1e293b',
                  color: '#fff',
                  border: '2px solid #db2777',
                  padding: '16px',
                  fontWeight: 'bold',
                },
              });
            }, 600);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Wrong Key!',
              text: 'Users Do not Enter in Restricted area!!!',
              background: '#0f172a',
              color: '#fff',
              confirmButtonColor: '#db2777'
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

  if (loading) return null;

  const currentEmail = (authUser?.email || "").toLowerCase().trim();
  return (currentEmail === allowedEmail && isAuthorized) ? children : <Navigate to="/" replace />;
};

export default ProjectRoute;