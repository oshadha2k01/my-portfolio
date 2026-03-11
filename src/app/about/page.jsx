import AboutClient from './AboutClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'About',
  description: 'Learn more about Oshadha Pathiraja, skills, technologies, and professional background.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'About | Oshadha Pathiraja',
    description: 'Skills and profile of Oshadha Pathiraja, Full Stack Developer.',
    url: `${siteUrl}/about`,
    images: [{ url: '/about/opengraph-image', width: 1200, height: 630, alt: 'About Oshadha Pathiraja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Oshadha Pathiraja',
    description: 'Skills and profile of Oshadha Pathiraja, Full Stack Developer.',
    images: ['/about/opengraph-image'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
