import { NextResponse } from 'next/server';

// Add this line to make it work with static export
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // GitHub username
    const username = 'oshadha2k01'; // Your GitHub username
    
    // Fetch actual repositories from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add authorization if you need to access private repos
        // 'Authorization': 'token YOUR_GITHUB_TOKEN'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter out repositories we don't want to show
    const filteredRepos = repos.filter(repo => 
      repo.name !== 'oshadha2k01' && repo.name !== 'my-portfolio'
    );
    
    // Define specific order for priority repositories
    const priorityOrder = [
      "ITPM-Project",
      "movie-explorer",
      "WanderVibe", 
      "CodeMaster",
      "course-registration-application", 
      "Book-Review-Web", 
      "Project_ITP"
    ];
    
    // Map the response to match your expected format
    const formattedRepos = filteredRepos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || '',
      language: repo.language,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count
    }));
    
    // Custom sort function: priority repos first, then the rest
    formattedRepos.sort((a, b) => {
      const indexA = priorityOrder.indexOf(a.name);
      const indexB = priorityOrder.indexOf(b.name);
      
      // If both repos are in priority list, sort by priority order
      if (indexA >= 0 && indexB >= 0) {
        return indexA - indexB;
      }
      
      // If only a is in priority list, it comes first
      if (indexA >= 0) return -1;
      
      // If only b is in priority list, it comes first
      if (indexB >= 0) return 1;
      
      // Otherwise, keep original order from API (most recently updated)
      return 0;
    });
    
    return NextResponse.json(formattedRepos);
  } catch (error) {
    console.error('Error in GitHub API route:', error);
    
    // Fallback to mock data if GitHub API fails
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
    
    // In production, you might want to return an error instead
    console.warn('Falling back to mock data due to API error');
    return NextResponse.json(mockRepos);
  }
}
