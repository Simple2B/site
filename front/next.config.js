/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://app:80/api/:path*', // Proxy to Backend
      },
    ];
  },
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
