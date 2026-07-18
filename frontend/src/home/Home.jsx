import React from 'react'
import Navbar from "../component/Navbar";
import Banner from "../component/Banner";
import Freebook from "../component/Freebook";
import Footer from "../component/Footers"; 

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen"> 
        <Banner />
        <Freebook />
      </div>
      <Footer />
    </>
  )
}

export default Home