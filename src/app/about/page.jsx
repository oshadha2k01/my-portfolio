"use client"

import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// Import programming language icons
import { 
  SiJavascript, SiReact, SiNodedotjs, SiHtml5, SiCss3, SiMongodb,
  SiMysql, SiTailwindcss, SiC, SiCplusplus, SiPhp, SiBootstrap, SiFigma
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export default function About() {
  // Define programming languages with skill levels
  const programmingLanguages = [
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", proficiency: 90 },
    { name: "React", icon: SiReact, color: "#61DAFB", proficiency: 90 },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", proficiency: 88 },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", proficiency: 98 },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", proficiency: 98 },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", proficiency: 90 },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", proficiency: 85 },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", proficiency: 85 },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", proficiency: 90 },
    { name: "Figma", icon: SiFigma, color: "#F24E1E", proficiency: 80 },
    { name: "C", icon: SiC, color: "#A8B9CC", proficiency: 60 },
    { name: "C++", icon: SiCplusplus, color: "#00599C", proficiency: 50 },
    { name: "PHP", icon: SiPhp, color: "#777BB4", proficiency: 80 },
    { name: "Java", icon: FaJava, color: "#007396", proficiency: 70 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* About Section - Enhanced with increased width */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Two-column layout with increased width */}
          <div className="flex flex-col lg:flex-row gap-10 mb-8">
            {/* Who Am I Section - Adjusted width and padding */}
            <motion.div 
              className="bg-gray-800 rounded-xl p-6 shadow-lg lg:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
              <p className="text-lg mb-6">
                I'm a motivated Information Technology undergraduate with a solid foundation in software development
                and a passion for creating efficient, user-friendly solutions. Currently pursuing a BSc (Hons) in 
                Information Technology at Sri Lanka Institute of Information Technology, I specialize in full-stack 
                web development with proficiency in modern programming languages, frameworks, and tools.
              </p>
              <p className="text-lg">
                I'm dedicated to writing clean, maintainable code and solving real-world challenges through innovative 
                approaches. My experience as a Full Stack Developer Intern at Difynbest Solution has equipped me with 
                practical skills in the MERN stack and collaborative development practices.
              </p>
            </motion.div>

            {/* My Skills Section - Adjusted width and padding */}
            <motion.div 
              className="bg-gray-800 rounded-xl p-6 shadow-lg lg:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4">My Skills</h2>
              {/* Programming Language Stats - Two column layout */}
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {programmingLanguages.map((lang, index) => (
                    <motion.div 
                      key={lang.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="mb-3"
                    >
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 mr-2 flex-shrink-0 flex items-center justify-center">
                          <lang.icon size={20} color={lang.color} />
                        </div>
                        <span className="font-medium text-sm">{lang.name}</span>
                        <span className="ml-auto text-sm">{lang.proficiency}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.proficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                          style={{ backgroundColor: lang.color }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
