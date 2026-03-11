"use client"

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['home', 'about', 'education', 'experience', 'projects', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const scrollToSection = (id) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
      setMenuOpen(false);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const isActive = (section) =>
    activeSection === section ? 'text-blue-400' : 'hover:text-blue-400';

  const navLinks = [
    { id: 'home',       label: 'Home'       },
    { id: 'about',      label: 'About'      },
    { id: 'education',  label: 'Education'  },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects'   },
    { id: 'contact',    label: 'Contact'    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 px-4 sm:px-10 bg-gray-800 shadow-md">
      <div className="w-full mx-auto flex justify-between items-center">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold tracking-wider hover:text-blue-400 transition-colors focus-visible:outline-none py-1"
          aria-label="Back to top"
        >
          <span className="text-white cursor-pointer">Oshadha </span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex space-x-8">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-current={activeSection === id ? 'page' : undefined}
              className={`text-base py-1 px-1 bg-transparent border-none cursor-pointer text-white ${isActive(id)}`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-white focus-visible:outline-none p-2 -mr-2"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden mt-3 flex flex-col space-y-3 pb-3 border-t border-gray-700 pt-3">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              aria-current={activeSection === id ? 'page' : undefined}
              className={`text-base py-3 px-3 w-full block bg-transparent border-none cursor-pointer text-white text-left ${isActive(id)}`}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
