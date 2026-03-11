import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Contact',
  description: 'Contact Oshadha Pathiraja for full-stack development opportunities, collaborations, or freelance work.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contact | Oshadha Pathiraja',
    description: 'Get in touch with Oshadha Pathiraja.',
    url: `${siteUrl}/contact`,
    images: [{ url: '/contact/opengraph-image', width: 1200, height: 630, alt: 'Contact Oshadha Pathiraja' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Oshadha Pathiraja',
    description: 'Get in touch with Oshadha Pathiraja.',
    images: ['/contact/opengraph-image'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-gray-900 text-white pt-16 flex flex-col">
        <NavBar />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
