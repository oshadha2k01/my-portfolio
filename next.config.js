/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the static export setting for Vercel deployment
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
