import { FaBriefcase } from 'react-icons/fa';
import {
  SiReact, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiNextdotjs, SiJsonwebtokens, SiPostman,
} from 'react-icons/si';

const experienceData = [
  {
    role: 'Software Engineer Intern',
    company: 'NEWNOP PVT LTD',
    location: 'Remote / South Korea',
    period: 'August 2025 – February 2026',
    description: 'Developed responsive full-stack web applications using React.js with TypeScript and Tailwind CSS, built scalable RESTful APIs with Node.js, Express.js, and MongoDB, and gained hands-on experience with Next.js and cloud deployment.',
    techStack: [
      { icon: SiReact,       color: '#61DAFB', label: 'React'        },
      { icon: SiTypescript,  color: '#3178C6', label: 'TypeScript'   },
      { icon: SiNextdotjs,   color: '#a3a3a3', label: 'Next.js'      },
      { icon: SiNodedotjs,   color: '#339933', label: 'Node.js'      },
      { icon: SiExpress,     color: '#9CA3AF', label: 'Express.js'   },
      { icon: SiMongodb,     color: '#47A248', label: 'MongoDB'      },
      { icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind CSS' },
      { icon: SiPostman,     color: '#FF6C37', label: 'Postman'      },
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Difynbest Solution PVT LTD',
    location: 'Remote / Colombo, Sri Lanka',
    period: 'August 2024 – May 2025',
    description: 'Developed responsive front-end interfaces using React.js and Tailwind CSS, and implemented secure user authentication using JWT and other security measures.',
    techStack: [
      { icon: SiReact,         color: '#61DAFB', label: 'React'        },
      { icon: SiTailwindcss,   color: '#06B6D4', label: 'Tailwind CSS' },
      { icon: SiNodedotjs,     color: '#339933', label: 'Node.js'      },
      { icon: SiExpress,       color: '#9CA3AF', label: 'Express.js'   },
      { icon: SiJsonwebtokens, color: '#fb015b', label: 'JWT'          },
      { icon: SiPostman,       color: '#FF6C37', label: 'Postman'      },
    ],
  },
];

export default function Experience() {
  return (
    <ul className="space-y-5 list-none p-0 m-0">
      {experienceData.map((exp, index) => (
        <li key={index} className="bg-gray-800/50 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0" aria-hidden="true">
              <FaBriefcase className="text-xl text-blue-400" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                  <p className="text-sm text-gray-400">{exp.company} &mdash; {exp.location}</p>
                </div>
                <span className="text-sm text-blue-400 font-medium whitespace-nowrap">{exp.period}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {exp.techStack.map(({ icon: Icon, color, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 bg-gray-700/60 rounded-md px-2 py-1 text-xs text-gray-300 border border-gray-600/40"
                  >
                    <Icon size={12} color={color} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
