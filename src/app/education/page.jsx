import EducationClient from './EducationClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Education',
  description: 'Education background and academic qualifications of Oshadha Pathiraja.',
  alternates: { canonical: `${siteUrl}/education` },
  openGraph: {
    title: 'Education | Oshadha Pathiraja',
    description: 'Academic background of Oshadha Pathiraja.',
    url: `${siteUrl}/education`,
    images: [{ url: '/education/opengraph-image', width: 1200, height: 630, alt: 'Education - Oshadha Pathiraja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education | Oshadha Pathiraja',
    description: 'Academic background of Oshadha Pathiraja.',
    images: ['/education/opengraph-image'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Education', item: `${siteUrl}/education` },
  ],
};

export default function EducationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EducationClient />
    </>
  );
}