"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Project() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fixed: Always show 2 projects per slide
  const projectsPerSlide = 2;

  // Calculate max slide index
  const maxSlide = Math.max(0, Math.ceil(repos.length / projectsPerSlide) - 1);

  useEffect(() => {
    async function fetchRepos() {
      try {
        // Changed to use the custom ordered endpoint
        const response = await fetch('/api/github-ordered');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          console.error('API did not return an array:', data);
          setError(data.error || 'Failed to load repositories');
          setRepos([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setError('Failed to load repositories');
        setRepos([]);
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? maxSlide : prev - 1));
  };

  // Enhanced image handling function with better debugging and case sensitivity handling
  const getProjectImage = (repo) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      default: '#6e5494'
    };
    
    const bgColor = repo.language && colors[repo.language] ? colors[repo.language] : colors.default;
    
    // Map repository names to their actual image files
    const imageMap = {
      'ITPM-Project': '/images/repos/ITPM-Project.jpeg',
      'WanderVibe': '/images/repos/WanderVibe.png',
      'movie-explorer': '/images/repos/movie-explorer.png'
    };
    
    return {
      bgColor,
      repoName: repo.name,
      imagePath: imageMap[repo.name] || null,
      fallbackUrl: `https://via.placeholder.com/300x200/${bgColor.replace('#', '')}?text=${encodeURIComponent(repo.name)}`
    };
  };

  return (
    <section id="projects" className="py-16">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12">My Projects</h3>
        {loading ? (
          <p className="text-center">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : repos.length === 0 ? (
          <p className="text-center">No repositories found</p>
        ) : (
          <div className="relative px-4">
            {/* Slider Navigation - Always show if we have more than 2 repos */}
            {repos.length > projectsPerSlide && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
                  aria-label="Previous projects"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
                  aria-label="Next projects"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Project Cards Slider - Modified for 2 projects per slide */}
            <div className="overflow-hidden px-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Group repos into pairs */}
                {Array.from({ length: Math.ceil(repos.length / projectsPerSlide) }).map((_, slideIndex) => {
                  const startIndex = slideIndex * projectsPerSlide;
                  const slideRepos = repos.slice(startIndex, startIndex + projectsPerSlide);
                  
                  return (
                    <div key={slideIndex} className="min-w-full flex gap-6">
                      {slideRepos.map(repo => {
                        const projectImage = getProjectImage(repo);
                        
                        return (
                          <div
                            key={repo.id}
                            className="w-1/2 h-full"
                          >
                            <div className="h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] flex flex-col">
                              {/* Project Image - Using Next.js Image component */}
                              <div className="relative h-48 w-full bg-gray-700">
                                {projectImage.imagePath ? (
                                  <Image
                                    src={projectImage.imagePath}
                                    alt={`${repo.name} preview`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                ) : (
                                  <Image
                                    src={projectImage.fallbackUrl}
                                    alt={`${repo.name} preview`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                )}
                              </div>
                              
                              {/* Project Info */}
                              <div className="p-6 flex-grow flex flex-col">
                                <h4 className="text-2xl font-semibold mb-2 text-white">{repo.name}</h4>
                                <p className="text-gray-300 mb-4 flex-grow">{repo.description || 'No description available'}</p>
                                
                                {/* Stats section */}
                                <div className="flex items-center mb-4 text-sm text-gray-400">
                                  {repo.stargazers_count > 0 && (
                                    <span className="flex items-center mr-4">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                      </svg>
                                      {repo.stargazers_count}
                                    </span>
                                  )}
                                  {repo.forks_count > 0 && (
                                    <span className="flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                      </svg>
                                      {repo.forks_count}
                                    </span>
                                  )}
                                </div>
                                
                                {/* Links */}
                                <div className="flex justify-between">
                                  <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition flex items-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    GitHub
                                  </a>
                                  {repo.homepage && (
                                    <a
                                      href={repo.homepage}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-md text-white"
                                    >
                                      Live Demo
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Slider Pagination */}
            {repos.length > projectsPerSlide && (
              <div className="flex justify-center mt-6">
                {Array.from({ length: Math.ceil(repos.length / projectsPerSlide) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`mx-1 h-2 w-8 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
