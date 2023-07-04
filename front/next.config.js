/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simple2b-site-static.s3.eu-north-1.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
