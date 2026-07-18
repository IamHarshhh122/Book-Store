import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Contact from './Contacts/contact'; 
import Courses from './courses/Courses';
import Signup from './component/Signup';
import { Toaster } from 'react-hot-toast'; 
import { useAuth } from "./context/AuthProvider";
import Dashboard from './component/Dashboard';
import Admin from './component/Admin/AdminDashboard';
import ProjectRoute from './component/Admin/ProjectRoute'; 

function App() {
  const { authUser } = useAuth(); 

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-700 ease-in-out min-h-screen">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/Signup" />} />
        <Route path="/contact" element={authUser ? <Contact /> : <Navigate to="/Signup" />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/signup" />} />
        <Route path="/Signup" element={<Signup />} />
        
        <Route 
          path="/Admin" 
          element={
            <ProjectRoute>
              <Admin />
            </ProjectRoute>
          } 
        />
      </Routes>
            <Toaster 
        position="top-center" 
        containerStyle={{ zIndex: 10000000 }}
        toastOptions={{
         
          style: {
            borderRadius: '15px',
            background: '#1e293b',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;