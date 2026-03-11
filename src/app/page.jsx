"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiTypescript, SiTailwindcss,
  SiMysql, SiPostman, SiHtml5, SiCss3,
} from 'react-icons/si';
import { FaLaptopCode } from 'react-icons/fa';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Project from './components/Project';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

const orbitIcons = [
  { Icon: SiHtml5,       color: '#E34F26' },
  { Icon: SiCss3,        color: '#1572B6' },
  { Icon: SiJavascript,  color: '#F7DF1E' },
  { Icon: SiTypescript,  color: '#3178C6' },
  { Icon: SiReact,       color: '#61DAFB' },
  { Icon: SiTailwindcss, color: '#06B6D4' },
  { Icon: SiNodedotjs,   color: '#339933' },
  { Icon: SiMongodb,     color: '#47A248' },
  { Icon: SiMysql,       color: '#4479A1' },
  { Icon: SiPostman,     color: '#FF6C37' },
  { Icon: FaLaptopCode,  color: '#a78bfa' },
];

function SectionDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-blue-800/50 to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-gray-900 text-white">
      <NavBar />

      {/* ── Home ── */}
      <section
        id="home"
        className="min-h-screen pt-20 bg-gradient-to-r from-gray-900 via-blue-950 to-purple-900 flex items-center justify-center"
      >
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16">

          {/* Orbital icons + profile image */}
          <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0">

            {/* Floating tech icons */}
            {orbitIcons.map(({ Icon, color }, i) => {
              const angle = (i * (360 / orbitIcons.length) * Math.PI) / 180;
              const rx = 43;
              const cx = 50 + rx * Math.sin(angle);
              const cy = 50 - rx * Math.cos(angle);
              return (
                <motion.div
                  key={i}
                  aria-hidden="true"
                  className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800/90 border border-gray-600 flex items-center justify-center shadow-xl z-10"
                  style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -50%)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.9 + i * 0.1 },
                    scale:   { duration: 0.4, delay: 0.9 + i * 0.1 },
                    y: {
                      duration: 2.5 + i * 0.25,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.5 + i * 0.2,
                    },
                  }}
                >
                  <Icon size={17} color={color} />
                </motion.div>
              );
            })}

            {/* Profile image */}
            <motion.div
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden shadow-2xl border-4 border-blue-900 flex items-center justify-center bg-gray-900 z-20 relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/profile_photo.png"
                width={288}
                height={288}
                alt="Oshadha Pathiraja"
                className="w-full h-full object-cover"
                style={{ borderRadius: '50%' }}
                priority
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/288?text=Profile";
                }}
              />
            </motion.div>
          </div>

          {/* Profile text */}
          <div className="text-center lg:text-left whitespace-nowrap">
            <motion.h1
              className="text-3xl sm:text-5xl xl:text-6xl font-semibold mb-4 tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Oshadha Pathiraja
            </motion.h1>

            <TypeAnimation
              sequence={[
                'Full Stack Developer', 2000,
                'Software Engineer',    2000,

              ]}
              wrapper="p"
              repeat={Infinity}
              className="text-2xl sm:text-3xl mb-8 text-blue-300 font-medium"
            />

            {/* <motion.a
              href="/CV_Oshadha_Pathiraja.pdf?v=1"
              download
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:shadow-blue-500/25 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Download CV
            </motion.a> */}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── About ── */}
      <div id="about">
        <About />
      </div>

      <SectionDivider />

      {/* ── Education ── */}
      <section id="education" className="py-14 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My <span className="text-blue-400">Education</span>
          </motion.h2>
          <motion.div
            className="bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Education />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Experience ── */}
      <section id="experience" className="py-14 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My <span className="text-blue-400">Experience</span>
          </motion.h2>
          <motion.div
            className="bg-gray-800 rounded-xl p-4 sm:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Experience />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Projects ── */}
      <div className="bg-gray-900 text-white">
        <Project />
      </div>

      <SectionDivider />

      {/* ── Contact ── */}
      <div id="contact">
        <Contact />
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
