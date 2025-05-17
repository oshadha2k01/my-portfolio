"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  
  // Function to check if a link is active
  const isActive = (path) => {
    return pathname === path ? "text-blue-400" : "hover:text-blue-400";
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 px-10 bg-gray-800 shadow-md">
      <div className="w-full mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold"></h1>
        <nav className="flex space-x-10">
          <Link href="/" prefetch={true} className={`text-md ${isActive('/')}`}>Home</Link>
          <Link href="/about" prefetch={true} className={`text-md ${isActive('/about')}`}>About</Link>
          <Link href="/projects" prefetch={true} className={`text-md ${isActive('/projects')}`}>Projects</Link>
          <Link href="/contact" prefetch={true} className={`text-md ${isActive('/contact')}`}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
