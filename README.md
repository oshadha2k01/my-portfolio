# Oshadha Pathiraja Portfolio

Modern portfolio website built with Next.js App Router, focused on strong performance, clean UI/UX, and production-grade SEO.

## Live Demo

Portfolio URL: [https://www.oshadha.dev/](https://www.oshadha.dev/)

## Highlights

- Responsive single-page home with dedicated route pages
- Dynamic GitHub-powered project showcase with custom ordering
- Contact form with client-side validation and EmailJS integration
- Framer Motion animations with reduced-motion support
- Route-level SEO metadata (title, description, canonical, Open Graph, Twitter)
- Structured data (Person, WebSite, BreadcrumbList)
- Route-specific Open Graph image generation
- Sitemap and robots configured for crawling
- API caching/revalidation for project data performance

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
- React Icons
- Vercel Analytics + Speed Insights
- EmailJS (contact workflow)

## Project Structure

```text
src/
   app/
      layout.jsx
      page.jsx
      sitemap.js
      api/
         github/
         github-ordered/
      about/
         page.jsx
         AboutClient.jsx
         opengraph-image.jsx
      projects/
         page.jsx
         opengraph-image.jsx
      contact/
         page.jsx
         opengraph-image.jsx
      education/
         page.jsx
         EducationClient.jsx
         opengraph-image.jsx
      experience/
         page.jsx
         ExperienceClient.jsx
         opengraph-image.jsx
      components/
         NavBar.jsx
         Footer.jsx
         About.jsx
         Education.jsx
         Experience.jsx
         Project.jsx
         Contact.jsx
         ScrollToTop.jsx
public/
   robots.txt
   images/
```

## SEO and Performance Improvements

- Dynamic import strategy for heavy below-the-fold home sections
- Route-specific metadata on About, Projects, Contact, Education, Experience
- Hreflang support via metadata alternates (`en-US`, `x-default`)
- Breadcrumb JSON-LD per internal route
- Dynamic Open Graph images for major pages
- API response caching and ISR-style revalidation for GitHub project data
- Improved semantic/accessibility baseline (skip link, focus styles, better image alt text)

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# GitHub API (server-side)
GITHUB_TOKEN=your_github_personal_access_token

# EmailJS (client-side)
NEXT_PUBLIC_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id
```

Notes:

- `NEXT_PUBLIC_SITE_URL` is used for canonical URLs, metadata base, and sitemap links.
- `GITHUB_TOKEN` is required for the ordered repositories API route.

## Getting Started

1. Clone the repository.
2. Install dependencies.
3. Add `.env.local` values.
4. Run development server.

```bash
git clone https://github.com/oshadha2k01/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build and Run

```bash
npm run build
npm start
```

## CI/CD Pipeline (GitHub Actions)

This project includes a ready-to-use pipeline:

- Workflow file: `.github/workflows/ci-cd.yml`
- CI trigger: pull requests to `main` and pushes to `main`
- CD trigger: push to `main` after CI passes

### What the pipeline does

1. **CI (Build Validation)**
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Runs production build with `npm run build`

2. **CD (Deploy to Vercel Production)**
   - Runs only on pushes to `main`
   - Pulls Vercel project/environment
   - Builds with Vercel
   - Deploys prebuilt artifacts to production

### Required GitHub repository secrets

Add these in **GitHub Repo -> Settings -> Secrets and variables -> Actions**:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### How to connect Vercel values

Run locally once (after `vercel login` and linking project):

```bash
vercel link
```

Then copy values from `.vercel/project.json`:

- `orgId` -> `VERCEL_ORG_ID`
- `projectId` -> `VERCEL_PROJECT_ID`

Create a Vercel token from your Vercel account settings and save it as `VERCEL_TOKEN`.

## Customization

- Update GitHub sorting/priorities in `src/app/api/github-ordered/route.js`
- Update project card descriptions in `src/app/components/Project.jsx`
- Update personal/about content in `src/app/components/About.jsx` and `src/app/about/AboutClient.jsx`
- Update social/profile links in footer and contact components

## Author

- Oshadha Pathiraja
- GitHub: [@oshadha2k01](https://github.com/oshadha2k01)
- LinkedIn: [Oshadha Pathiraja](https://www.linkedin.com/in/oshadha-pathiraja-77b08333a/)
