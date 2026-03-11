import { FaGraduationCap, FaSchool } from 'react-icons/fa';

const educationData = [
  {
    Icon: FaGraduationCap,
    institution: 'Sri Lanka Institute of Information Technology',
    location: 'Malabe, Colombo, Sri Lanka',
    degree: 'BSc (Hons) in Information Technology',
    specialization: 'Specializing in Information Technology',
    period: '2022 – Present',
    additionalInfo: 'Successfully completed Higher Diploma in Information Technology (2022–2024)',
  },
  {
    Icon: FaSchool,
    institution: 'Kuliyapitiya Central College',
    location: 'Kuliyapitiya',
    degree: 'G.C.E Advanced Level (A/L) — Physical Science Stream (2018–2020)',
    specialization: null,
    period: '2012 – 2020',
    additionalInfo: 'G.C.E Ordinary Level (O/L) completed in 2017',
  },
];

export default function Education() {
  return (
    <ul className="space-y-4 list-none p-0 m-0">
      {educationData.map((edu, index) => (
        <li key={index} className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0" aria-hidden="true">
              <edu.Icon className="text-xl text-blue-400" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="text-base font-semibold text-white">{edu.institution}</h3>
                  <p className="text-sm text-gray-400">{edu.location}</p>
                </div>
                <span className="text-sm text-blue-400 font-medium whitespace-nowrap">{edu.period}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-300">
                  {edu.degree}
                  {edu.specialization && ` — ${edu.specialization}`}
                </p>
                {edu.additionalInfo && (
                  <p className="text-xs text-gray-400 mt-1">{edu.additionalInfo}</p>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
