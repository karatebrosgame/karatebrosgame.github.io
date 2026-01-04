/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Enable static export if needed for GitHub Pages
  // output: 'export',
  images: {
    unoptimized: true, // For static export compatibility
  },
  // Environment variables
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

module.exports = nextConfig

