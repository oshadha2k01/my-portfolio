import { Suspense } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';
import Loading from './loading';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Oshadha Pathiraja | Full Stack Developer',
  description: 'IT undergraduate and Full Stack Developer specializing in React, Node.js, MongoDB, and Next.js. Based in Sri Lanka.',
  keywords: ['Full Stack Developer', 'React', 'Node.js', 'Next.js', 'MongoDB', 'Portfolio', 'Oshadha Pathiraja', 'Sri Lanka'],
  authors: [{ name: 'Oshadha Pathiraja' }],
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Oshadha Pathiraja | Full Stack Developer',
    description: 'IT undergraduate and Full Stack Developer specializing in React, Node.js, MongoDB, and Next.js.',
    url: siteUrl,
    siteName: 'Oshadha Pathiraja Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Oshadha Pathiraja Portfolio' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oshadha Pathiraja | Full Stack Developer',
    description: 'IT undergraduate and Full Stack Developer specializing in React, Node.js, MongoDB, and Next.js.',
    creator: '@oshadha_nipun',
    images: ['/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Oshadha Pathiraja',
  jobTitle: 'Full Stack Developer',
  url: siteUrl,
  sameAs: [
    'https://github.com/oshadha2k01',
    'https://www.linkedin.com/in/oshadha-pathiraja-77b08333a/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Malabe',
    addressRegion: 'Western Province',
    addressCountry: 'LK',
  },
  knowsAbout: ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'Full Stack Development'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={<Loading />}>
          {children}
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
