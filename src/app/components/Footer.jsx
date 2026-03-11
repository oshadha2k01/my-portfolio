"use client"

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const navLinks = [
  { label: 'Home',       id: 'home'       },
  { label: 'About',      id: 'about'      },
  { label: 'Education',  id: 'education'  },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Contact',    id: 'contact'    },
];

const socialLinks = [
  { href: 'https://github.com/oshadha2k01',                        icon: FaGithub,   label: 'GitHub',   hover: 'hover:text-white'      },
  { href: 'https://www.linkedin.com/in/oshadha-pathiraja-77b08333a/', icon: FaLinkedin, label: 'LinkedIn', hover: 'hover:text-blue-400'   },
  { href: 'mailto:oshadhanipun093@gmail.com',                       icon: FaEnvelope, label: 'Email',    hover: 'hover:text-blue-300'   },
];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-gray-400 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top row: brand + nav + social */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">

          {/* Brand */}
          <div>
            <p className="text-2xl font-bold text-white mb-1">
              <span className="text-white cursor-pointer">Oshadha </span>
            </p>
            <p className="text-sm max-w-xs">Full Stack Developer based in Sri Lanka.</p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Quick Links</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5 list-none p-0 m-0">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-sm bg-transparent border-none cursor-pointer text-gray-400 hover:text-blue-400 transition-colors py-2 px-0"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Connect</p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, icon: Icon, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className={`p-3 text-xl text-gray-400 ${hover} transition-colors`}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700/60 mb-5" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <p>&copy; {new Date().getFullYear()} Oshadha Pathiraja. All rights reserved.</p>
          <p>Built with <span className="text-blue-400">Next.js</span> &amp; <span className="text-blue-400">Tailwind CSS</span></p>
        </div>

      </div>
    </footer>
  );
}
