/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  // Static export for GitHub Pages — no server runtime
  output: 'export',
  // Required for GitHub Pages: index.html files need trailing slash to resolve correctly
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // next/image optimization requires a server; disabled for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.simple2b.de',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
