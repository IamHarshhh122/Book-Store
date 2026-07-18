import React from 'react'
import Navbar from '../component/Navbar'
import Footers from '../component/Footers'
import Course from '../component/Course' 
function Courses() {
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20"> 
        <Course /> 
      </div>
      <Footers />
    </>
  )
}

export default Courses