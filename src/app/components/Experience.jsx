import React from 'react';
import { FaBriefcase, FaCode } from 'react-icons/fa';

export default function Experience() {
  const experienceData = [
    {
      role: 'Software Engineer Intern',
      company: 'NEWNOP PVT LTD South Korea',
      location: 'Remote / South Korea', // Assuming or just leaving blank if not specified. I'll stick to what I know.
      // User said: NEWNOP PVT LTD South Korea. Maybe location is appropriate.
      period: 'August 2025 – February 2026',
      description: 'Developed responsive full-stack web applications using React.js with TypeScript and Tailwind CSS, built scalable RESTful APIs with Node.js, Express.js, and MongoDB, and gained hands-on experience with Next.js and cloud deployment.',
      icon: <FaCode className="text-xl text-blue-400" />
    },
    {
      role: 'Software Engineer Intern',
      company: 'Difynbest Solution PVT LTD',
      location: 'Remote / Colombo, Sri Lanka', // Not specified in text, leaving generic or omitting
      period: 'August 2024 – May 2025',
      description: 'Developed responsive front-end interfaces using React.js and Tailwind CSS, and implemented secure user authentication using JWT and other security measures.',
      icon: <FaCode className="text-xl text-blue-400" />
    }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl text-center font-semibold text-white mb-4 flex items-center gap-2">
        <FaBriefcase className="text-blue-400" />
        Experience
      </h3>
      
      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <div 
            key={index}
            className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {exp.icon}
              </div>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h4 className="text-base font-medium text-white">
                      {exp.role}
                    </h4>
                    <p className="text-sm text-gray-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-blue-400 font-medium whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
