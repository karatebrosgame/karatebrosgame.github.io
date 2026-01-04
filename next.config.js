/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for GitHub Pages
  output: 'export',
  // Base path for GitHub Pages
  // Empty for root domain deployment (karatebrosgame.github.io)
  basePath: '',
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Environment variables
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

module.exports = nextConfig

