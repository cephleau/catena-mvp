/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    disableStaticImages: false,
  },
  // Disable ISR and dynamic routes
  output: 'standalone',
};

module.exports = nextConfig;
