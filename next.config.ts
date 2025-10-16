import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable static export for Netlify
  output: 'export',
  // Optimize for static export
  trailingSlash: true,
  // Disable image optimization for static hosting
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack's hot module replacement
      config.watchOptions = {
        ignored: ['**/*'], // Ignore all file changes
      };
    }
    return config;
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
