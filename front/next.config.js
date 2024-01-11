/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.simple2b.net',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
