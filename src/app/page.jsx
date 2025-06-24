"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* Profile Section - Enhanced with better centering and larger elements */}
      <section className="py-0 bg-gradient-to-r from-gray-900 via-blue-950 to-purple-900 flex-grow flex items-center justify-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6">
          {/* Larger Profile Photo - maintaining circular shape */}
          <motion.div 
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-blue-950 flex items-center justify-center bg-gray-900"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
             <Image 
              src="/images/profile_photo.jpg" 
              width={288} 
              height={288} 
              alt="Profile Photo"
              className="w-full h-full object-cover"
              style={{ borderRadius: '50%' }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/288?text=Profile"
              }}
            /> 
          </motion.div>
          
          {/* Profile Info with enhanced typography */}
          <div className="text-center md:text-left">
            {/* Name with Type Animation - larger font */}
            <TypeAnimation
              sequence={[
                'Oshadha Pathiraja',
                2000,
                'Oshadha Pathiraja',
                2000,
              ]}
              wrapper="h2"
              repeat={Infinity}
              className="text-5xl sm:text-6xl font-semibold mb-4 tracking-tight text-white"
            />
            
            {/* Position with Type Animation - larger font */}
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Software Engineer',
                2000,
                 'Web Developer',
                2000,
              ]}
              wrapper="p"
              repeat={Infinity}
              className="text-2xl sm:text-3xl mb-6 text-gray-100"
            />
            {/* Get My CV Button */}
            <a
              href="/CV_Oshadha_Pathiraja.pdf"
              download
              className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-blue-950 via-purple-900 to-purple-800 text-white font-semibold rounded-lg shadow transition hover:from-purple-900 hover:to-blue-950"
            >
              Donwload My CV
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Using component */}
      <Footer />
    </div>
  );
}