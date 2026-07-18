import React from 'react'
import Navbar from '../Navbar'
import Footers from '../Footers'
import AdminDashboard from '../Admin'

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <AdminDashboard /> 
      </div>
      <Footers />
    </div>
  )
}

export default Admin