"use client"

import NavBar from '../components/NavBar';
import Project from '../components/Project';
import Footer from '../components/Footer';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* Projects Content */}
      <Project />

      {/* Footer */}
      <Footer />
    </div>
  );
}
