import { NextResponse } from 'next/server';

// Add this line to make it work with static export
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Mock data for your GitHub repositories
    const mockRepos = [
      {
        id: 1,
        name: "ITPM-Project",
        description: "IT Project Management system",
        language: "JavaScript",
        html_url: "https://github.com/oshadha2k01/ITPM-Project",
        homepage: null,
        stargazers_count: 2,
        forks_count: 1
      },
      {
        id: 2,
        name: "movie-explorer",
        description: "Web application for browsing movies",
        language: "JavaScript",
        html_url: "https://github.com/oshadha2k01/movie-explorer",
        homepage: null,
        stargazers_count: 3,
        forks_count: 0
      },
      {
        id: 3,
        name: "WanderVibe",
        description: "Travel recommendation app",
        language: "JavaScript",
        html_url: "https://github.com/oshadha2k01/WanderVibe",
        homepage: null,
        stargazers_count: 5,
        forks_count: 2
      },
      {
        id: 4,
        name: "CodeMaster",
        description: "Coding challenge platform",
        language: "JavaScript",
        html_url: "https://github.com/oshadha2k01/CodeMaster",
        homepage: null,
        stargazers_count: 4,
        forks_count: 1
      },
      {
        id: 5,
        name: "course-registration-application",
        description: "Application for course registration",
        language: "JavaScript",
        html_url: "https://github.com/oshadha2k01/course-registration-application",
        homepage: null,
        stargazers_count: 3,
        forks_count: 0
      },
      {
        id: 6,
        name: "Book-Review-Web",
        description: "Web application for book reviews",
        language: "JavaScript",
        html_url: "https://github.com/oshadha2k01/Book-Review-Web",
        homepage: null,
        stargazers_count: 2,
        forks_count: 1
      },
      {
        id: 7,
        name: "Project_ITP",
        description: "IT Project for university",
        language: "JavaScript", 
        html_url: "https://github.com/oshadha2k01/Project_ITP",
        homepage: null,
        stargazers_count: 0,
        forks_count: 0
      }
    ];
    
    return NextResponse.json(mockRepos);
  } catch (error) {
    console.error('Error in GitHub API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories: ' + error.message },
      { status: 500 }
    );
  }
}
