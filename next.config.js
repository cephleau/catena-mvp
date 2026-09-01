/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure public folder is served
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
