import React from 'react'
import Navbar from '../component/Navbar' 
import Footers from '../component/Footers' 
import ContactForm from '../component/Contact' 
const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <ContactForm />
      </div>
      <Footers />
    </div>
  )
}

export default ContactPage;