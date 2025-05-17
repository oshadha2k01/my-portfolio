"use client"

import { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = 'service_t7yhycg';
    const templateId = 'template_85qts86';
    const publicKey = 'qwQuMKpZJky2b9yhL';
    
    emailjs.init(publicKey);

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    emailjs.send(serviceId, templateId, templateParams)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);

        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for reaching out! I will get back to you soon.',
          icon: 'success',
          confirmButtonColor: '#3B82F6'
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsSubmitting(false);

        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#3B82F6'
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 flex flex-col">
      <NavBar />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* <h3 className="text-4xl font-bold mb-10 text-center">Get in Touch</h3> */}
          
          {/* Two-column layout container */}
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column - Contact Details */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg lg:w-1/2">
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center shadow-xl border-4 border-blue-400 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 mb-8">
                  <Image 
                    src="/images/profile.jpg"
                    width={224}
                    height={224}
                    alt="Oshadha Pathiraja"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/224?text=Profile";
                    }}
                  />
                </div>
                
                {/* Contact Details */}
                <div className="text-left w-full">
                  <h4 className="text-2xl font-semibold mb-6 text-blue-400">Contact Details</h4>
                  
                  {/* <div className="flex items-center mb-4">
                    <FaEnvelope className="mr-3 text-blue-400 text-xl" />
                    <div>
                      <span className="block font-medium">Email:</span>
                      <a href="mailto:oshadhanipun093@gmail.com" className="hover:text-blue-300 transition">
                        oshadhanipun093@gmail.com
                      </a>
                    </div>
                  </div> */}
                
                  
                  <div className="flex items-center mb-6">
                    <span className="inline-block w-5 mr-3">📍</span>
                    <div>
                      <span className="block font-medium">Location:</span>
                      <span>26, Anukkane, Kuliyapitiya, North Western, Sri Lanka</span>
                    </div>
                  </div>
                  
                  {/* Social Media Links */}
                  <h4 className="text-xl font-semibold mb-4 text-blue-400 mt-8">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="mailto:oshadhanipun093@gmail.com" 
                      className="text-3xl text-gray-300 hover:text-blue-300 transition"
                      aria-label="Email"
                    >
                      <FaEnvelope />
                    </a>
                    <a 
                      href="https://github.com/oshadha2k01" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-3xl text-gray-300 hover:text-white transition"
                      aria-label="GitHub"
                    >
                      <FaGithub />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/oshadha-nipun-77b08333a/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-3xl text-gray-300 hover:text-blue-400 transition"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href="https://www.facebook.com/share/192Tbe3uuA/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-3xl text-gray-300 hover:text-blue-600 transition"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a 
                      href="https://www.instagram.com/oshadha_nipun?igsh=MTNiYjVybTN3MHlzaw==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-3xl text-gray-300 hover:text-pink-500 transition"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a 
                      href="https://wa.me/94766050012" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-3xl text-gray-300 hover:text-green-400 transition"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg lg:w-1/2">
              <h4 className="text-2xl font-semibold mb-6 text-blue-400">Send Me a Message</h4>
              <form ref={form} onSubmit={handleSubmit} className="text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="user_name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="user_email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Your Phone Number (optional)"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    className="w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button 
                    type="submit" 
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-md transition shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
