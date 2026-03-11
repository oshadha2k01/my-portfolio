import NavBar from '../components/NavBar';
import Project from '../components/Project';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Projects',
  description: 'Portfolio projects by Oshadha Pathiraja featuring full-stack apps, APIs, and UI engineering work.',
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: 'Projects | Oshadha Pathiraja',
    description: 'Explore software projects built with React, Next.js, Node.js, and more.',
    url: `${siteUrl}/projects`,
    images: [{ url: '/projects/opengraph-image', width: 1200, height: 630, alt: 'Projects by Oshadha Pathiraja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Oshadha Pathiraja',
    description: 'Explore software projects built with React, Next.js, Node.js, and more.',
    images: ['/projects/opengraph-image'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-gray-900 text-white pt-16 flex flex-col">
        {/* Navigation Bar */}
        <NavBar />

        {/* Projects Content */}
        <Project />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
