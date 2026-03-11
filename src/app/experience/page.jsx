import ExperienceClient from './ExperienceClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Experience',
  description: 'Professional experience and internship work of Oshadha Pathiraja.',
  alternates: { canonical: `${siteUrl}/experience` },
  openGraph: {
    title: 'Experience | Oshadha Pathiraja',
    description: 'Professional experience of Oshadha Pathiraja.',
    url: `${siteUrl}/experience`,
    images: [{ url: '/experience/opengraph-image', width: 1200, height: 630, alt: 'Experience - Oshadha Pathiraja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Oshadha Pathiraja',
    description: 'Professional experience of Oshadha Pathiraja.',
    images: ['/experience/opengraph-image'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Experience', item: `${siteUrl}/experience` },
  ],
};

export default function ExperiencePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ExperienceClient />
    </>
  );
}
